<template>
    <div class="password-container">
        <a @click="back">&lt;--Back</a>
        <h5>
            Enter your password
        </h5>
        <p>Username:</p>
        <p>{{login}}</p>
        <form>
            <label>Enter your password in field below:</label>
            <input type="password" id="password" autofocus required
                v-model.trim="password">
            <div class="validate-message" v-show="validateMessage">
                {{validateMessageText}}
            </div>
        </form>
        <button class="btn mt-4" @click="next">Continue</button>
    </div>
</template>

<script>
import { serverDefaults } from '@/scripts/connect.js'
    export default {
        name: 'Password',
        props: {
            login: {
                type: String
            }
        },
        data() {
            return {
                password: '',
                validateMessage: false,
                validateMessageText: ''
            }
        },
        methods: {
            async next() {
                if (this.password.length >= 8 && this.password.length <= 32 && this.password.match(/^[A-z0-9]+$/)) {
                    this.validateMessageText = ''
                    const login = await serverDefaults.post('/signin', {
                        login: encodeURI(this.login),
                        password: encodeURI(this.password)
                    })
                    this.validateMessageText = login.data.data
                    this.validateMessage = true
                    if(login.data.status == 'OK' || login.data.status == 'AUTHENTICATED'){
                        console.log(1)
                        this.$router.push({name: 'Work'})
                    }
                    else if(login.data.status == 'AUTH_FAILED'){
                        console.log(2)
                        return 0
                    }
                } else {
                    if (this.password.length < 8) {
                        this.validateMessageText = 'Password is too short.'
                    } else if (this.password.length > 32) {
                        this.validateMessageText = 'Password is too long.'
                    } else if(!this.password.match(/^[A-z0-9]+$/)){
                        this.validateMessageText = 'Username must contain only numbers ans english letters.'
                    }
                    this.validateMessage = true
                }
            },
            back(){
                this.$emit('back')
            }
        }
    }
</script>
