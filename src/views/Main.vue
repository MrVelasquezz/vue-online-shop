<template>
    <div class="main">
        <Header />
        <Menu />
        <About />
        <Footer />
    </div>

</template>

<script>
    import Header from '@/views/partials/Header.vue'
    import Menu from '@/views/partials/Menu.vue'
    import About from '@/views/partials/About.vue'
    import Footer from '@/views/partials/Footer.vue'
    export default {
        name: 'Main',
        components: {
            Header,
            Menu,
            About,
            Footer
        }
    }
</script>
