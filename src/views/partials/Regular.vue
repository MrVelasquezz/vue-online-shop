<template>
<TheLogo />
<div class="status-container">
    <h1>Your status has not yet been confirmed.</h1>
    <p>Be patient. The administration will soon confirm your status.</p>
    <p><strong>Do not forget to reload this page, when the interview has ended. <router-link :to="{name:'Work'}">Reload</router-link></strong></p>
    <p><strong>If the interview is over long ago, and you still see this page, please contact the administration.</strong></p>
</div>
    
</template>

<script>
import TheLogo from '@/components/TheLogo.vue'
export default {
    name: 'Regular',
    components: {
        TheLogo
    }
}
</script>

<style scoped>
.router-link-active{
    color:crimson;
}

.status-container{
    padding: 0 1rem;
}
</style>