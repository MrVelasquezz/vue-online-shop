<template>
    <TheLogo class="m-0 p-0" />
    <div class="container input-fields">
        <keep-alive>
            <TheLogin v-if="showLogin" @getLogin="getLogin" />
            <ThePassword v-else :login="login" @back="showLogin=true"/>
        </keep-alive>
    </div>
</template>

<script>
    import TheLogo from '@/components/TheLogo.vue'
    import TheLogin from '@/components/TheLogin.vue'
    import ThePassword from '@/components/ThePassword.vue'

    export default {
        name: 'Signin',
        components: {
            TheLogo,
            TheLogin,
            ThePassword
        },
        data() {
            return {
                login: '',
                showLogin: true
            }
        },
        methods: {
            getLogin(login) {
                if (login) {
                    this.login = login
                    this.showLogin = false
                }
            },
            back(login){
                this.login = login
            }
        },
        created(){
            if(this.login.length == 0){
                this.showLogin = true
            }
        }

    }
</script>

<style>
    * {
        color: #fff;
    }

    .input-fields {
        max-width: 520px;
        padding: 0 2rem;
    }

    #username, #password {
        background: 0;
        color: #fff;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
    }

    .login-container,
    .password-container{
        display: flex;
        flex-direction: column;
        width: inherit;
    }

    .validate-message{
        color: #FC5455;
    }
    
    p{
        margin: 0.5rem 0;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    input {
        width: 300px;
        height: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        background: none;
        outline: none;
        margin: 1rem 0 0 0;
    }

    @media screen and (max-width: 480px){
        .btn{
            width: 220px;
            height: 60px;
            margin: 2rem auto;
        }
    }
</style>