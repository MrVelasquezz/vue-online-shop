<template>
<span v-show="linksVisibility">
<div class="links-container">
        <!--<router-link :to="{name:'Work'}" v-t="{path: 'main.header.nav_links.work'}"></router-link>
        <a href="#about" v-t="{path: 'main.header.nav_links.about'}"></a>-->
        <a href="#menu" v-t="{path: 'main.header.nav_links.menu'}"></a>
        <a href="#delivery" v-t="{path: 'main.header.nav_links.delivery'}"></a>
    </div>
    <div class="contacts-container me-5">
        <div id="contacts">
            <span id="number">{{phone}}</span>
            <span id="email">{{email}}</span>
        </div>
    </div>
</span>

</template>

<script>
    export default {
        name: "TheLinks",
        props: {
            linksVisibility: {
                type: Boolean
            },
            email:{
                type: String
            },
            phone: {
                type: String
            }
        }
    }
</script>

<style scoped>
    span {
        margin: 0;
        display: flex;
        flex-direction: row;
    }

    .links-container{
        display: flex;
        flex-direction: row;
    }

    .links-container a, .contacts-container{
        padding: 0 2rem 0 0;
    }

    @media screen and (max-width: 768px){
        .links-container{
            display: none;
        }
    }
</style>