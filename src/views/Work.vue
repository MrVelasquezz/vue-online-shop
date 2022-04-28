<template>
    <section>
        <div class="main work">
            <router-view />
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Work'
    }
</script>

<style scoped>
    .work *{
        color: #fff;
    }

    section {
        width: 100vw;
        height: 100vh;
        background: #0E204B;
    }

    .main {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .btn {
        background: #FC5455;
        color: #fff;
        width: 180px;
        height: 40px;
        font-weight: 600;
        font-size: 18px;
        border: none;
        border-radius: 50px;
        margin: 2rem 0 0 auto;
    }

    @media screen and (max-width: 480px){
        .main{
            justify-content: start;
        }
    }
</style>