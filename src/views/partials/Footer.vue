<template>
    <footer class="container-fluid">
        <div class="adresses">
            <p>{{info.adress_line1}}<br>
                {{info.adress_line2}}</p>
            <p class="privacy-policy">Privacy Policy</p>
        </div>
        <div class="sozial-webs">
            <!--<div class="sozial-web m-3">
                <a href="">
                    <img :src="require('@/assets/svgs/sozial-webs/tik-tok-logo.svg')" alt="">
                </a>
            </div>-->
            <div class="sozial-web m-3">
                <a href="">
                    <img :src="require('@/assets/svgs/sozial-webs/instagram-logo.svg')" alt="">
                </a>
            </div>
            <div class="sozial-web m-3">
                <a href="">
                    <img :src="require('@/assets/svgs/sozial-webs/facebook-logo.svg')" alt="">
                </a>
            </div>
        </div>
        <div class="another-info">
            <p>
                <span v-t="{path: 'main.header.work_days', args: {start_day: info.work_days[0], end_day: info.work_days[1]}}"></span>
                    <br>
                <span v-t="{path: 'main.header.work_time', args: {start_time: info.work_time[0], end_time: info.work_time[1]}}"></span>
            </p>
            <p>
                {{info.phone}}<br>
                {{info.email}}
            </p>
        </div>
    </footer>
</template>

<script>
import info from "@/stores/data.json"
export default {
    name: "Footer",
    data(){
        return{
            info: {}
        }
    },
    created(){
        this.info = info
    }
}
</script>

<style>
    footer {
        background: #000;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 3rem 3rem 1rem 3rem;
    }

    .adresses p,
    .another-info p {
        color: #fff;
    }

    .privacy-policy{
        margin: 1.5rem 0 0 0;
    }

    .sozial-webs{
        display: flex;
        flex-direction: row;
    }

    .sozial-web {
        width: 75px;
        height: 75px;
        margin: 1.5rem;
    }

    @media screen and (max-width: 480px) {

        .adresses,
        .another-info {
            display: none;
        }

        footer {
            justify-content: center;
            padding: 1rem 0;
        }
    }
</style>