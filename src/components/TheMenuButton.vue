<template>
    <div class="menu-btn p-0 m-0"
         @click="openModal">
        <div class="menu-btn-inner">
            <div class="amount">
                {{generalamount}}
            </div>
            <div class="pt-2">
                <div class="menu-btn-img-container">
                    <img :src="require('@/assets/svgs/cart.svg')" alt="" class="img-fluid w">
                    <img :src="require('@/assets/svgs/black-cart.svg')" alt="" class="img-fluid b">
                </div>
                <div class="total-price">
                    {{total}}€
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['total', 'generalamount'],
        data() {
            return {
                offset: ''
            }
        },
        methods: {
            openModal() {
                this.$emit('openModal')
            }
        }
    }
</script>

<style scoped>
    .menu-btn {
        width: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 75px;
        position: absolute;
        border-radius: 37px;
        bottom: 1%;
        z-index: 8888;
        left: calc(100vw - (100vw - 1440px)/2 - 170px);
    }

    .menu-btn:hover {
        box-shadow: 0 0 7px #F54748;
    }

    .menu-btn-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        width: 160px;
        height: 75px;
        border-radius: 37px;
        background: #F54748;
        cursor: pointer;
    }

    .amount {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #F54748;
        position: absolute;
        top: 0;
        right: 0;
    }

    .menu-btn-img-container {
        width: 44px;
        height: 36px;
        position: relative;
        margin: 0 auto;
        padding: 0.5rem 0 0 0;
    }

    .b {
        display: none;
    }

    .total-price {
        text-align: center;
        padding: 0.7rem 0 0 0;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
    }
    @media screen and (max-width: 1440px){
        .menu-btn{
            left: calc(100vw - 170px);
        }
    }

    @media screen and (max-width: 480px) {
        .menu-btn {
            width: 120px;
            height: 60px;
            left: calc(100vw - 130px);
        }

        .menu-btn-inner {
            width: 120px;
            height: 60px;
            background: #fff;
            cursor: pointer;
            border: 1px solid #000;
        }

        .menu-btn-img-container {
            width: 30px;
            height: 25px;
        }

        .total-price {
            font-size: 14px;
            font-weight: 500;
            color: #000;
        }

        .b {
            display: block;
        }

        .w {
            display: none;
        }
    }
</style>