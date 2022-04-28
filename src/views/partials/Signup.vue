<template>
    <TheLogo class="m-0 p-0" />
    <h2>Sign Up</h2>
    <div class="form-container">
        <form>
            <div class="rows">
                <span>
                    <label for="firstname">First name:</label>
                    <input type="text" id="firstname" name="firstname" v-model.trim="firstname">
                </span>
                <span>
                    <label for="secondname">Second name:</label>
                    <input type="text" id="secondname" name="secondname" v-model.trim="secondname">
                </span>
            </div>
            <div class="rows">
                <span>
                    <label for="password">Enter your password:</label>
                    <input type="password" name="password" id="password" v-model.trim="password">
                </span>
                <span>
                    <label for="rpassword">Repeat your password:</label>
                    <input type="password" name="rpassword" id="rpassword" v-model.trim="rpassword">
                </span>
            </div>
            <div class="rows">
                <span>
                    <label for="email">Enter your E-Mail:</label>
                    <input type="email" name="email" id="email" v-model.trim="email">
                </span>
                <span>
                    <label for="phone">Enter your phone number:</label>
                    <input type="phone" name="phone" id="phone" v-model.number="phone" maxlength="12">
                </span>
            </div>
            <div class="rows">
                <span>
                    <label for="nickname">Enter your nickname(login):</label>
                    <input type="text" name="nickname" id="nickname" v-model.trim="nickname">
                </span>
            </div>
            <div class="rows">
                <span>
                    <label for="role">Who will you be in our organisation?:</label>
                    <select v-model="role">
                        <option disabled value="">Your role</option>
                        <option value="cook">Cook</option>
                        <option value="bot">Velobot</option>
                    </select>
                </span>
            </div>
            <div class="rows">
                <span>
                    <label for="adress">Enter your adress <br> (PLZ - Street - House number - Enterance - Floor - Door
                        number):</label>
                    <input type="text" name="adress" id="adress" v-model.trim="adress">
                </span>
            </div>
        </form>
        <button class="btn">
            Continue
        </button>
    </div>
</template>

<script>
    import TheLogo from '@/components/TheLogo.vue'

    export default {
        name: 'Signup',
        components: {
            TheLogo
        }
    }
</script>

<style>
    * {
        color: #fff;
    }

    .btn {
        background: #FC5455;
        color: #fff;
        width: 180px;
        height: 40px;
        font-weight: 600;
        font-size: 18px;
        border: none;
        border-radius: 20px;
        margin: 20px 0 0 auto;
    }

    form,
    .form-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 650px;
    }

    select, select *{
        background: #0E204B;
    }

    select{
        margin: 0.5rem 0 0 0;
    }

    .rows {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: inherit;
        padding: 15px 0 0 0;
    }

    .rows span {
        display: flex;
        flex-direction: column;
    }

    .rows span span {
        display: flex;
        flex-direction: row;
    }

    input {
        width: 300px;
        height: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        background: none;
        outline: none;
    }

    input#adress {
        width: 650px;
    }

    @media screen and (max-width: 480px) {
        .btn {
            width: 220px;
            height: 60px;
            margin: 0 auto;
        }
    }
</style>