<template>
    <span id="logo-container">
        <img :src="require('@/assets/svgs/logo.svg')" id="logo" class="img-fluid"  alt="Logo">
    </span>
</template>

<style scoped>
    #logo-container{
        width: 200px;
        height: 200px;
    }

    @media screen and (max-width: 768px) {
        #logo-container{
            margin: 5vh 0 0 0;
            width: 200px;
            height: 200px;
        }
    }

    @media screen and (max-width: 480px) {
        #logo-container{
            margin: 10vh 0 0 0;
            width: 120px;
            height: 120px;
        }
    }

    @media screen and (max-width: 360px){
        #logo-container{
            margin: 8vh 0 0 0;
            width: 120px;
        }
    }

</style>