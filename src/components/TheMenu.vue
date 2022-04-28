<template>
    <div class="container-fluid the-menu-outter-container">
        <div v-if="apiStatus != 'OK'" class="api-statuses">
            <div v-if="apiStatus=='NULL'">
                <h2>Loading...</h2>
                <svg class="spinner" viewBox="0 0 50 50">
                    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
            </div>
            <div v-else-if="apiStatus=='ERROR'">
                <h2>
                    Sorry, but server is under maintaince
                </h2>
            </div>
            <div v-else-if="apiStatus == 'NOITEM'">
                <h2>Comming soon<br>
                    We have any products yet
                </h2>
            </div>
            <div v-else-if="apiStatus == 'NOITEMCAT'">
                <h2>Sorry, but we have any items of this category</h2>
            </div>
        </div>
        <div v-else class="container-fluid the-menu-container p-0 m-0">
            <TheMenuCard v-for="(item, key) in data" :key="key" :data="item" :admin="isAdmin"
                @addItemToCart="addItemToCart" />
        </div>
    </div>
</template>

<script>
    import TheMenuCard from '@/components/TheMenuCard.vue'

    import {
        serverDefaults
    } from '@/scripts/connect.js'

    async function getMenuRequests(param, more) {
        try {
            let query = '/getMenu'
            if (typeof more != 'undefined' && !isNaN(more)) {
                query = query + '/more/' + more
            } else if (typeof param != 'undefined' || param != '' && typeof param == 'string') {
                query = query + '/' + param
            }
            const getMenu = await serverDefaults.get(query)
            if (getMenu.data.status == 'NOITEM') {
                return 'NOITEM'
            } else if (getMenu.data.status == 'NOITEMCAT') {
                return 'NOITEMCAT'
            } else {
                return getMenu.data.data
            }
        } catch (e) {
            return 'ERROR'
        }
    }

    export default {
        name: "TheMenu",
        components: {
            TheMenuCard
        },
        props: {
            sortOption: {
                type: String
            },
            loadMore: {
                type: Number
            }
        },
        data() {
            return {
                data: [],
                apiStatusVar: '',
                isAdmin: false,
                loadMoreVal: 0
            }
        },
        methods: {
            addItemToCart(data) {
                this.$emit('addItemToCart', data)
            }
        },
        emits: ['addItemToCart', 'resetSortOption', 'hideShowMoreButton'],
        computed: {
            apiStatus() {
                if (this.apiStatusVar == 'ERROR') {
                    return 'ERROR'
                } else if (this.data.length == 0) {
                    return 'NULL'
                } else if (this.apiStatusVar == 'NOITEM') {
                    return 'NOITEM'
                } else if (this.apiStatusVar == 'NOITEMCAT') {
                    return 'NOITEMCAT'
                } else if (this.data.length > 0 || this.apiStatusVar == 'OK') {
                    return 'OK'
                }
            }
        },
        watch: {
            sortOption: {
                async handler(val, oldVal) {
                    if (val == '') {
                        this.apiStatusVar = 'OK'
                        this.data = await getMenuRequests()
                        this.loadMoreVal = 0
                        this.loadMoreVal++
                    } else if (val != oldVal) {
                        if (typeof val != 'undefined' && typeof val == 'string' && val.length > 0) {
                            const data = await getMenuRequests(val)
                            if (typeof data == 'string') {
                                this.apiStatusVar = data
                            } else {
                                this.apiStatusVar = 'OK'
                                this.data = data
                            }
                        }
                    }
                }
            },
            loadMore: {
                async handler(val, oldVal) {
                    if (val != false && val != 0 && val != oldVal) {
                        if (this.sortOption != '') {
                            this.$emit('resetSortOption')
                            return
                        }
                        if (this.loadMoreVal == 0) {
                            this.apiStatusVar = 'OK'
                            this.data = await getMenuRequests()
                            this.loadMoreVal = 0
                            this.loadMoreVal++
                        }
                        const data = await getMenuRequests('', this.loadMoreVal)
                        if (typeof data != 'string' && typeof data != 'undefined' && data.length > 0) {
                            data.forEach(item => {
                                this.data.push(item)
                            })
                            this.loadMoreVal++
                        }
                    }
                }
            }
        },
        async created() {
            const data = await getMenuRequests()
            if (typeof data == 'object' || typeof data == 'array') {
                this.data = data
                this.loadMoreVal = 0
                this.loadMoreVal++
            } else {
                this.apiStatusVar = data
            }
        }
    }
</script>

<style scoped>
    .the-menu-outter-container {
        margin: 1rem 0 0 0;
        display: flex;
        justify-content: center;
    }

    .the-menu-container {
        min-height: max-content;
        max-height: max-content;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 315px));
        grid-gap: 20px;
        justify-content: center;
    }

    .api-statuses h2 {
        color: rgba(99, 110, 114, 1.0);
    }

    .api-statuses div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 1024px) {
        .the-menu-container {
            grid-template-columns: repeat(auto-fill, minmax(250px, 265px));
        }
    }

    @media screen and (max-width: 768px) {
        .the-menu-container {
            grid-template-columns: repeat(auto-fill, minmax(180px, 200px));
        }
    }

    @media screen and (max-width: 480px) {
        .the-menu-container {
            width: 100vw !important;
            grid-template-columns: repeat(auto-fill, minmax(116px, 120px));
        }
    }

    .spinner {
        animation: rotate 2s linear infinite;
        z-index: 2;
        margin: -25px 0 0 -25px;
        width: 50px;
        height: 50px;
    }

    .path {
        stroke: rgb(235, 115, 36);
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
            stroke: rgba(225, 112, 85, 1.0);
        }

        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
            stroke: rgba(255, 118, 117, 1.0);
        }

        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
            stroke: rgba(250, 177, 160, 1.0);
        }
    }
</style>