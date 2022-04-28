<template>
    <div id="nav">
        <TheLogo />
        <TheNavigationLinks />
    </div>
</template>

<script>
    import TheLogo from '@/components/TheLogo.vue'
    import TheNavigationLinks from '@/components/TheNavigationLinks.vue'
    export default {
        components: {
            TheLogo,
            TheNavigationLinks
        }
    }
</script>

<style scoped>
    #nav {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

    @media screen and (max-width: 768px){
        #nav{
            flex-direction: column-reverse;
            flex-wrap: nowrap;
            align-items: center;
        }
    }
</style>