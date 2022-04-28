<template>
    <button class="menu-card-add-button" @click="addItem"></button>
</template>

<script>
export default {
    name: 'ClientButtons',
    methods: {
        addItem(){
            this.$emit('addItem')
        }
    },
    emits: ['addItem']
}
</script>

<style scoped>
    .menu-card-add-button {
        position: relative;
        background: #F54748;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        transition: 1s box-shadow;
    }

    .menu-card-add-button::before,
    .menu-card-add-button::after {
        content: '';
        width: 25px;
        height: 2px;
        display: block;
        background: #fff;
        position: absolute;
        z-index: 1000;
    }

    .menu-card-add-button::before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .menu-card-add-button::after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(90deg)
    }

    .menu-card-add-button:hover {
        box-shadow: 0px 0px 7px #F54748;
    }

    @media screen and (max-width: 480px) {
        .menu-card-add-button {
            position: relative;
            background: #F54748;
            margin: 0 0 0 25px;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            transition: 1s box-shadow;
        }
    }
</style>