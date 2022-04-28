<template>
    <div class="zone p-0 m-0">
        <div class="zone-img-container">
            <img :src="require(`@/assets/svgs/${t('main.zones.components['+data+'].img')}`)" class="zone-img" alt="">
        </div>
        <div class="zone-text-container">
            <h5 v-t="{path: `main.zones.components[${data}].title`}"></h5>
            <ul>
                <li v-for="(item, key) in data_text" :key="key" v-t="{path: `main.zones.components[${data}].text[${item-1}]`}"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        defineComponent
    } from 'vue'
    import {
        useI18n
    } from 'vue-i18n'
    export default defineComponent({
        props: {
            data: {
                type: Number
            },
            data_text: {
                type: Number
            }
        },
        setup(){
            const { t }= useI18n({
                locale: getLang,
                useScope: 'global'
            })
            return { t }

        }
    })
</script>

<style scoped>
    .zone {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0.5rem 0 0 0;
    }

    .zone:nth-child(0) {
        margin: 0;
    }

    .zone-img-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .zone-img {
        width: 146px;
        height: 86px;
    }

    .zone-text-container {
        width: 400px;
    }

    .zone-text-container h5 {
        margin: 1.5rem 0;
    }

    @media screen and (max-width: 992px) {
        .zone {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
    }

    @media screen and (max-width: 480px) {
        .zone {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .zone-img-container {
            justify-content: center;
            padding: 0 0 12px 0;
        }

        .zone-text-container h6 {
            text-align: center;
        }

        .zone-text-container p {
            text-align: justify;
        }

        .zone-text-container {
            width: 100%;
        }
    }
</style>