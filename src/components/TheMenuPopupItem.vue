<template>
    <div class="the-menu-popup-item-container">
        <div class="img-container">
            <img :src="`http://localhost:3000/api/public/images/${item.image}`" alt="" class="img-fluid">
        </div>
        <div class="item-options-outer">
            <div class="item-title">
                <h5>{{item.title}}</h5>
            </div>
            <div class="item-options">
                <p class="m-0">{{item.price}}€</p>
                <div class="item-options-controls">
                    <button class="btn minus" @click="changeAmount(-1)"></button>
                    <input type="number" class="amount" v-model.lazy="item.amount" disabled>
                    <button class="btn plus" @click="changeAmount(1)"></button>
                    <button class="delete" @click="removeItem">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheMenuPopupItem',
        props: {
            item: {
                type: Object
            }
        },
        methods: {
            changeAmount(amount) {
                this.$emit('changeAmount', {
                    id: this.item.id,
                    amount: amount
                })
            },
            removeItem() {
                this.$emit('removeItem', this.item.id)
            }
        },
        emits: ['changeAmount', 'removeItem']
    }
</script>

<style scoped>
    .the-menu-popup-item-container {
        width: 100%;
        padding: 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .img-container {
        width: 165px;
        height: auto;
    }

    .item-options-outer {
        padding: 0 1rem;
        width: 100%;
    }


    .item-options {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .item-options-controls {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }


    .btn {
        position: relative;
        background: #F54748;
        width: 22px;
        height: 22px;
        border: none;
        border-radius: 50%;
        transition: 1s box-shadow;
    }

    .minus::before,
    .plus::before,
    .plus::after {
        content: '';
        width: 15px;
        height: 2px;
        display: block;
        background: #fff;
        position: absolute;
        z-index: 1000;
    }

    .minus::before,
    .plus::before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 3px;
    }

    .plus::after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(90deg);
    }

    input.amount {
        width: 42px;
        height: 20px;
        font-size: 18px;
        border: none;
        outline: none;
        margin: 0 0.3rem;
        padding: 0;
        text-align: center;
        font-weight: 600;
    }

    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .delete {
        background: none;
        border: none;
        font-size: 18px;
        font-weight: 600;
    }

    @media screen and (max-width: 480px) {
        .the-menu-popup-item-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .item-title h5{
            margin: 0.5rem 0 !important;
        }

        .item-options-outer{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
        }
    }
</style>