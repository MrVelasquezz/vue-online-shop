<template>
    <div class="benefit-container">
        <div class="benefit-image-container">
            <img :src="require(`@/assets/svgs/${t('main.benefits.components['+data+'].img')}`)" alt=""
                class="img-fluid">
        </div>
        <h5 v-t="{path: `main.benefits.components[${data}].title`}"></h5>
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
            }
        },
        setup() {
            const {
                t
            } = useI18n({
                locale: getLang,
                useScope: 'global'
            })
            return {
                t
            }

        }
    })
</script>
<style scoped>
    .benefit-container {
        width: 25%;
    }

    .benefit-container h5 {
        margin-top: 16px;
        text-align: center;
    }

    .benefit-image-container {
        width: 250px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    @media screen and (max-width: 1024px) {
        .benefit-image-container {
            width: 140px;
            height: 140px;
        }
    }

    @media screen and (max-width: 768px) {
        .benefit-container {
            width: 100%;
        }

        .benefit-container h5 {
            margin-top: 12px;
            margin-bottom: 32px;
        }

        .benefit-image-container {
            width: 140px;
            height: max-content;
            display: flex;
            justify-content: center;
            align-items: flex-end;
        }
    }
</style>