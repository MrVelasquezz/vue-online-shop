<template>
    <div class="menu-section">
        <div class="menu-container container-fluid d-flex flex-column align-items-center justify-content-center">
            <a name="menu"></a>
            <h2 v-t="{path: 'main.menu.title'}"></h2>
            <TheMenuButton :total="total" :generalamount="generalamount" @openModal="openModal" />
            <div class="container-fluid categories p-0">
                <button class="btn" @click="sortOption = 'sides'" v-t="{path: 'main.menu.categories.sides'}"></button>
                <button class="btn" @click="sortOption = 'soups'" v-t="{path: 'main.menu.categories.soups'}"></button>
                <button class="btn" @click="sortOption = 'salads'" v-t="{path: 'main.menu.categories.salads'}"></button>
                <button class="btn" @click="sortOption = 'drinks'" v-t="{path: 'main.menu.categories.drinks'}"></button>
                <button class="btn" @click="sortOption = 'deserts'" v-t="{path: 'main.menu.categories.deserts'}"></button>
                <button class="btn" @click="sortOption = ''" v-t="{path: 'main.menu.categories.all'}"></button>
            </div>
            <TheMenu @addItemToCart="addItemToCart" :sortOption="sortOption" :loadMore = "loadMore" @resetSortOption = "sortOption = '', loadMore = 1"/>
            <keep-alive>
                <TheMenuPopup :total="total" :items="items" :show="showModal" @closeModal="closeModal"
                @changeAmount="changeAmount" @removeItem="removeItem"/>
            </keep-alive>
            
        </div>
        <div class="show-more-container">
            <button class="show-more btn d-flex align-items-center justify-content-center" @click="loadMore++" v-t="{path: 'main.menu.show_more_btn'}"></button>
        </div>
    </div>
</template>

<script>
    import TheMenu from '@/components/TheMenu.vue'
    import TheMenuButton from '@/components/TheMenuButton.vue'
    import TheMenuPopup from '@/components/TheMenuPopup.vue'
    export default {
        name: "Menu",
        components: {
            TheMenu,
            TheMenuButton,
            TheMenuPopup
        },
        data() {
            return {
                total: 0,
                generalamount: 0,
                showModal: false,
                items: [],
                itemsAmount: 0,
                sortOption: '',
                loadMore: 0
            }
        },
        methods: {
            openModal() {
                this.showModal = true
            },
            closeModal(param) {
                this.showModal = false
            },
            addItemToCart(data) {
                if (this.items.length != 0) {
                    let itemVersion = 0;
                    this.items.forEach(item => {
                        if (data.id == item.id) {
                            item.amount++
                            const totalPrice = parseFloat(item.totalPrice) + parseFloat(item.price)
                            item.totalPrice = totalPrice.toFixed(2)
                            itemVersion = 1
                        }
                    })
                    if (itemVersion != 1) {
                        this.items.push(data)
                    }
                } else {
                    this.items.push(data)
                }
            },
            changeAmount(options) {
                this.items.forEach(item => {
                    if (item.id == options.id) {
                        item.amount = item.amount + options.amount
                        item.totalPrice = parseFloat(item.totalPrice) + (parseFloat(item.price) * parseInt(options.amount))
                        if(item.amount <= 0){
                            this.removeItem(item.id)
                        }
                    }
                })
            },
            removeItem(id){
                const item = this.items.findIndex(item => item.id == id)
                this.items.splice(item, 1)
            }
        },
        watch: {
            items: {
                deep: true,
                handler(val) {
                    this.generalamount = 0
                    this.total = 0
                    this.items.forEach(item => {
                        this.generalamount += parseInt(item.amount)
                        let total = this.total
                        total = parseFloat(total) + parseFloat(item.totalPrice)
                        this.total = total.toFixed(2)
                    })
                },
                immediate: true
            }
        }
    }
</script>

<style scoped>
    .menu-section {
        padding: 0 3rem;
    }

    button.btn {
        border-radius: 50px;
        background: #fff;
        box-shadow: 0 0 7px rgba(178, 190, 195, 0.6);
        border: none;
        font-size: 18px;
        font-weight: 700;
        padding: 18px 48px;
    }

    button.show-more {
        background: none;
        border: 1px solid #0E204B;
        font-size: 24px;
        margin: 3rem 0;
    }

    button {
        transition: 1s box-shadow;
    }

    button:hover {
        box-shadow: 0 0 10px #000;
    }

    .show-more-container {
        display: flex;
        justify-content: center;
    }

    .categories button {
        margin: .3rem .5rem .5rem 0;
    }

    .categories {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 3rem 0 1rem 0;
    }

    @media screen and (max-width: 480px) {
        .menu-section {
            padding: 0;
        }

        button.show-more {
            font-size: 14px;
            width: 260px;
            height: 50px;
        }

        .categories {
            width: 100vw;
            margin: 0 auto;
            flex-wrap: nowrap;
            overflow: scroll;
        }

        .categories button {
            margin: .3rem .5rem .5rem .3rem;
        }
    }
</style>