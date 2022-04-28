<template>
    <div class="login-container">
        <h5 class="my-5">
            Sign in
        </h5>
        <form @submit.prevent @keyup.enter="next">
            <label>Enter your username in field below:</label>
            <input type="text" id="username" autofocus autocomplete="username" required
                v-model.trim="username">
            <div class="validate-message" v-show="validateMessage">
                {{validateMessageText}}
            </div>
        </form>
        <button class="btn" @click="next">Continue</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                validateMessage: false,
                validateMessageText: ''
            }
        },
        methods: {
            next() {
                if (this.username.length >= 4 && this.username.length <= 24 && this.username.match(/^[A-z0-9]+$/)) {
                    this.validateMessageText = ''
                    this.$emit('getLogin', this.username)
                } else {
                    if (this.username.length < 4) {
                        this.validateMessageText = 'Username is too short.'
                    } else if (this.username.length > 24) {
                        this.validateMessageText = 'Username is too long.'
                    }
                    else if(!this.username.match(/^[A-z0-9]+$/)){
                        this.validateMessageText = 'Username must contain only numbers and english letters.'
                    }
                    this.validateMessage = true
                }
            }
        },
        created(){
            if(this.login){
                this.username = this.login
            }
        }
    }
</script>