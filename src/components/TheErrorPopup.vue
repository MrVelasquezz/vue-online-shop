<template>  
    <div class="error-modal" :class="[errorModalShow ? 'error-modal-show' : 'error-modal-hide']" @click="closeErrorModal">
        <div class="error-container">
            <div class="error-title">
                <h2>Error</h2>
            </div>
            <div class="error-content" v-for="(item, key) in errorList" :key="key">
                <p> 
                    <strong>Field: {{item.field}}.</strong>
                    {{item.hint}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ErrorPage",
    props:{
        errorList:{
            type: Array
        },
        errorModalShow: {
            type: Boolean
        }
    },
    methods: {
        closeErrorModal(){
            this.$emit('closeErrorModal')
        }
    }
}
</script>

<style scoped>
    .error-modal{
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

    .error-modal-show{
        display: flex;
    }

    .error-modal-hide{
        display: none;
    }

    .error-container{
        width: 350px;
        max-height: max-content;
        border-radius: 42px;
        background: #fff;
        padding: 0 1rem;
    }
</style>