<template>
    <header id="snow-animation-container">
        <div class="header-section">
            <TheNavigation />
            <div class="heading">
                <h1 v-t="{path: 'main.header.title'}"></h1>
                <p v-t="{path: 'main.header.slogan'}"></p>
                <div class="order-button-container">
                    <a href="#menu" id="order-button" v-t="{path: 'main.header.order_now_btn'}"></a>
                </div>
                <h2><span v-t="{path: 'main.header.work_days', args: {start_day: work_days[0], end_day: work_days[1]}}"></span>
                    <br>
                    <span v-t="{path: 'main.header.work_time', args: {start_time: work_time[0], end_time: work_time[1]}}"></span>
                </h2>
            </div>
        </div>
    </header>
</template>

<script>
    import { documentReady } from '@/scripts/createSnow.js'
    import TheNavigation from '@/components/TheNavigation.vue'
    import { work_time, work_days } from '@/stores/data.json'
    export default {
        name: 'Header',
        components: {
            TheNavigation
        },
        data(){
            return{
                work_time: '',
                work_days: ''
            }
        },
        created(){
            this.work_time = work_time
            this.work_days = work_days
        },
        mounted(){
            $(document).ready(documentReady())
        }
    }
</script>
<style>
    header {
        height: 800px;
        background-image: url('../../assets/background.png');
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        overflow: hidden;
    }

    .header-section {
        padding: 0 60px;
        max-height: max-content;
        overflow-x: hidden;
    }


    .heading {
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px auto 0 auto;
    }
    
    .heading p{
        margin: 20px 0 10px 0;
        text-align: center;
    }

    .order-button-container {
        margin: 60px 0px;
    }

    #order-button {
        color: #000;
        background: #fff;
        text-decoration: none;
        padding: 20px 70px;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 50px;
        font-weight: 700;
        font-size: 20px;
        margin: 40px 0 20px 0;
        transition: 1s box-shadow;
    }

    #order-button:hover {
        box-shadow: 0 0 10px #fff;
    }

    @media screen and (max-width: 1440px) {
        h1 {
            margin: 100px auto 0 auto;
        }
        .heading {
            margin: auto;
            width: 90vw;
        }

        .header-section {
            padding: 0 20px;
        }
    }

    @media screen and (max-width: 768px){
        .heading h2{
            display: none;
        }

        .header-section{
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        .heading p{
            margin: 20px 30px;
        }

        h1 {
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 480px){
        header {
        height: 100vh;
        }

        .heading{
            margin: 15vh 0 0 0;
        }

        .order-button-container {
        margin: 20px 0px;
    }

        .header-section{
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
    }

    @media screen and (max-width: 360px){
        .heading{
            margin: 0 auto;
        }

        .order-button-container {
            margin: 20px 0px;
        }
    }
</style>