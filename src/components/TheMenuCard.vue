<template>
    <div class="menu-card">
        <div class="menu-card-container">
            <div class="menu-card-img">
                <img :src="`http://localhost:3000/api/public/images/${data.image}`" class="img-fluid" alt="">
            </div>
            <div class="container-fluid menu-card-data p-0 m-0">
                <div class="container p-0 m-0">
                    <div class="menu-card-title">
                        {{data.title}}
                    </div>
                    <div class="menu-card-price">
                        {{data.price}}€
                    </div>
                </div>
                <div class="menu-card-buttons">
                    <TheClientButtons v-if="!admin" @addItem="addItem" />
                    <TheAdminButtons v-else />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import TheClientButtons from '@/components/TheClientButtons.vue'
    import TheAdminButtons from '@/components/TheAdminButtons.vue'

    export default {
        components: {
            TheClientButtons,
            TheAdminButtons
        },
        props: {
            data: {
                type: Object
            },
            admin: {
                type: Boolean
            }
        },
        methods: {
            addItem(){
                this.$emit('addItemToCart', {
                    id: this.data.id,
                    title: this.data.title,
                    price: this.data.price,
                    totalPrice: this.data.price,
                    image: this.data.image,
                    amount: 1
                })
            }
        },
    }
</script>

<style scoped>
    .menu-card {
        width: 315px;
        height: 320px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 20px;
        background: #fff;
        box-shadow: 0 5px 20px rgba(223, 228, 234, 1.0);
    }

    .menu-card-container {
        width: 225px;
        margin: 0 auto;
    }

    .menu-card-img {
        width: 225px;
        height: 220px;
    }

    .menu-card-data {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .menu-card-title {
        padding: .5rem 0 0 0;
    }

    .menu-card-title,
    .menu-card-price {
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: flex-start;
    }

    .menu-card-price {
        padding: 0.5rem 0 0 0;
    }

    .menu-card-buttons{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 0 0 0;
    }

    @media screen and (max-width: 1024px) {
        .menu-card {
            width: 265px;
            height: 270px;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0 5px 20px rgba(223, 228, 234, 1.0);
        }

        .menu-card-container {
            width: 175px;
        }

        .menu-card-img {
            width: 175px;
            height: 170px;
        }
    }

    @media screen and (max-width: 768px) {
        .menu-card {
            width: 200px;
            height: 205px;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0 5px 20px rgba(223, 228, 234, 1.0);
        }

        .menu-card-container {
            width: 155px;
        }

        .menu-card-img {
            margin: auto;
            width: 135px;
            height: 130px;
        }

        .menu-card-title {
            padding: .5rem 0 0 0;
            font-weight: 500;
            font-size: 16px;
        }

        .menu-card-price {
            font-size: 20px;
            font-weight: 700;
        }
    }

    @media screen and (max-width: 480px) {
        .menu-card {
            width: 116px;
            height: 120px;
            border-radius: 20px;
            background: #fff;
            box-shadow: 0 5px 10px rgba(223, 228, 234, 1.0);
        }

        .menu-card-container {
            width: 75px;
        }

        .menu-card-img {
            margin: auto;
            width: 75px;
            height: 70px;
        }

        .menu-card-title,
        .menu-card-price {
            font-size: 14px;
        }
    }
</style>