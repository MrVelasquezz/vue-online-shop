<template>
    <div class="adress-modal" :class="[adressModalShow ? 'adress-modal-show' : 'adress-modal-hide']" @click="closeAdressModal">
        <div class="adress-container">
            <h2>Sorry, but something went wrong.</h2>
            <p>We are delivering only in <strong>5 km</strong> radius.</p>
            <p>If here is a mistake, please contact us per phone <strong>{{phone}}</strong> or email <strong>{{email}}</strong>.</p>
            <h6>Given by You adress: <span v-for="(item, key) in adressData.dist_answer" :key="key">
                <span>{{item}}</span>
            </span></h6>
            <p>Distance to You: {{adressData.dist/1000}}km</p>
        </div>
    </div>
</template>

<script>
import { phone, email } from '@/stores/data.json'
export default {
    props: ['adressData', 'adressModalShow'],
    data(){
        return{
            phone: phone,
            email: email
        }
    },
    methods: {
        closeAdressModal(){
            this.$emit('closeAdressModal')
        }
    }
}
</script>

<style scoped>
.adress-modal{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background: rgba(45, 52, 54, 0.3);
        overflow: hidden;
        z-index: 11111;
    }

    .adress-modal-show{
        display: flex;
    }

    .adress-modal-hide{
        display: none;
    }

    .adress-container{
        width: 350px;
        max-height: max-content;
        border-radius: 42px;
        background: #fff;
        padding: 0 1rem;
    }

    .adress-container p, h6{
        text-align: center;
    }
</style>