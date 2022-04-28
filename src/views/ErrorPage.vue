<template>
    <TheLogo />
    <div class="error-message-container">
        <h1>Error occured!</h1>
        <p>We offer our deepest apologies, but there was a error. Please follow some steps below.</p>
        <ul>
            <li><strong>If you are a client:</strong>
                <ul>
                    <li>
                        Try to check all the data, you have entered or reload the page.
                    </li>
                    <li>
                        Make a purchase by phone.
                    </li>
                </ul>
            </li>
            <li><strong>If you are our emploee:</strong>
                <ul>
                    <li>Please, contact the administaration and tell, what caused this error.</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import TheLogo from '@/components/TheLogo.vue'
    export default {
        name: 'ErrorPage',
        components: {
            TheLogo
        }
    }
</script>

<style scoped>
    ul {
        padding: 0 0 0 2rem;
    }

    ul li {
        list-style-type: disc;
    }

    ul li>ul li {
        list-style-type: decimal;
    }

    .error-message-container{
        padding: 0 1rem;
    }
</style>