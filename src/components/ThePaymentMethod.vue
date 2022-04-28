<template>
    <div class="payment-method">
        <div class="payment-method-img">
            <img :src="require(`@/assets/svgs/${t('main.payments.components['+data+'].img')}`)" alt="" class="img-fluid">
        </div>
        <h5 v-t="{path: `main.payments.components[${data}].title`}"></h5>
        <p v-t="{path: `main.payments.components[${data}].text`}"></p>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
    import { useI18n } from 'vue-i18n'
export default defineComponent({
    props: {
        data: {
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
.payment-method{
    width: 25%;
    margin: 3rem 0;
}
.payment-method-img{
    width: 75px;
    height: 75px;
    margin: 0 auto;
}

.payment-method h5, 
.payment-method p{
    text-align: center;
}

@media screen and (max-width: 768px){
    .payment-method{
        margin: 1rem 0;
        width: 100%;
}
}
</style>