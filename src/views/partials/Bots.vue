<template>
    <div class="bots-container">
        <div class="bot-info-bar">
            <div class="bot-name">Nick</div>
            <div class="bot-start-work">
                <button class="btn-start m-0">Start</button>
            </div>
            <div class="bot-logout">
                <button class="btn-log-out m-0">Log Out</button>
            </div>
        </div>
        <div class="purchase-list-container">

        </div>
        <div class="bots-category-buttons">
            <button class="bot-btn">All</button>
            <button class="bot-btn">Ongoing</button>
            <button class="bot-btn">Done</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Bots'
}
</script>

<style scoped>
    *{
        color: #000
    }

.bot-container{
    width: 100vw;
    height: 100vh;
}
.bots-category-buttons{

}

    button.bot-btn{
        width: 33.7vw;
        border: 0.5px solid #000;
        height: 45px;
    }

    .purchase-list-container{
        height: calc(100vh - 90px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .bot-info-bar{
        height: 45px;
        display: flex;
        flex-direction: row;
        padding: 0 0.3rem;
    }
    .bot-info-bar *{
        color:#fff !important;
    }

    .bot-name{
        display: flex;
        font-size: 24px;
        justify-content: flex-start;
        align-items: center;
    }

    .bot-info-bar div{
        width: 33vw;
    }

    .bot-info-bar button{
        height: 35px;
        width: 100px;
        border: none;
        outline: none;
        border-radius: 5px;
    }

    .bot-info-bar button.btn-start{
        background: #00b894;
    }

    .bot-info-bar button.btn-log-out{
        background: #d63031;
    }

    .bot-logout{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .bot-start-work{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
