<template>
    <button class="menu-card-add-button edit me-1 d-flex align-items-center justify-content-center">
        <img src="@/assets/svgs/edit.svg" alt="" class="img-fluid">
    </button>
    <button class="menu-card-add-button delete d-flex align-items-center justify-content-center">
        <img src="@/assets/svgs/delete.svg" alt="" class="img-fluid">
    </button>
</template>

<style scoped>
    .menu-card-add-button {
        position: relative;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        transition: 1s box-shadow;
    }

    .delete img {
        width: 25px;
        height: 25px;
    }

    .edit img {
        width: 30px;
        height: 30px;
    }

    .edit {
        background: #0E204B;
    }

    .delete {
        background: #F54748;
    }

    .edit:hover {
        box-shadow: 0px 0px 7px #0E204B;
    }

    .delete:hover {
        box-shadow: 0px 0px 7px #F54748;
    }
</style>