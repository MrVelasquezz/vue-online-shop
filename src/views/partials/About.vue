<template>
    <div class="container-fluid about-section">
        <a name="delivery"></a>
        <div class="delivery-and-pay">
            <h2 v-t="{path: 'main.zones.title'}"></h2>
        </div>
        <div class="container-fluid delivery-container p-0 m-0">
            <div class="about-zones-container container-fluid p-0 m-0">
                <TheZone v-for="(item, key) in zones" :key="key" :data="item-1" :data_text="zones_text" />
            </div>
            <div class="map-container container-fluid">
                <h5>Google map</h5>
                <div id="map">
                    <!--map goes here-->
                </div>
            </div>
        </div>
        <div class="our-payment-methods">
            <h2 class="p-0 m-0" v-t="{path: 'main.payments.title'}"></h2>
            <div class="payment-methods container-fluid p-0">
                <ThePaymentMethod v-for="(item, key) in payments" :key="key" :data="item-1" />
            </div>
        </div>
        <div class="our-benefits pt-0">
            <h2 v-t="{path: 'main.benefits.title'}"></h2>
            <div class="benefits-container container-fluid p-0">
                <TheBenefits v-for="(item, key) in benefits" :key="key" :data="item-1" />
            </div>
        </div>
    </div>
</template>

<script>
    import TheZone from '@/components/TheZone.vue'
    import ThePaymentMethod from '@/components/ThePaymentMethod.vue'
    import TheBenefits from '@/components/TheBenefits.vue'
    import {
        Loader
    } from "@googlemaps/js-api-loader"

    const coordinates = {
        lat: 47.0657982666386,
        lng: 15.437485307260905
    }

    export default {
        name: "About",
        components: {
            TheZone,
            ThePaymentMethod,
            TheBenefits
        },
        data() {
            return {
                zones: '',
                payments: '',
                benefits: '',
                zones_text: ''
            }
        },
        async created() {
            const loader = new Loader({
                apiKey: 'AIzaSyC8tW_AZQJQLRCmefUwh88Hd-jdzg79Ffo',
                version: 'weekly'
            })
            loader.load().then(() => {
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: coordinates,
                    zoom: 18,
                    mapId: '44652d35bf31462e',
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    disableDoubleClickZoom: true,
                    gestureHandling: 'cooperative'
                })
                const infoWindow = new google.maps.InfoWindow({
                    content: "",
                    disableAutoPan: true,
                });
                const marker = new google.maps.Marker({
                    position: coordinates,
                    map: map
                })
            });
            try{
                import(`@/locales/${getLang || 'de'}.json`).then((data)=>{
                    this.benefits = data.default.main.benefits.components.length
                    this.zones = data.default.main.zones.components.length
                    this.zones_text = data.default.main.zones.components[0].text.length
                    this.payments = data.default.main.payments.components.length
            })
            }
            catch(e){

            }
        }
    }
</script>
<style>
.about-section{
    padding: 0 3rem;
}

.delivery-and-pay{
    text-align: center;
    margin: 0 0 2rem 0;
}
    .about-zones-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 3rem 0 0;
    }

    .delivery-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .map-container {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0 0 0 24px;
    }

    .our-payment-methods {
        padding: 3rem 3rem 0;
    }

    .payment-methods {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 3rem;
    }

    .our-benefits {
        padding: 0 3rem 3rem;
    }

    .our-benefits h2{
        padding: 0 0 2rem 0;
    }

    .benefits-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #map {
        height: 100%;
        width: 100%;
    }

    @media screen and (max-width: 992px) {
        .about-zones-container {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .delivery-container {
            display: flex;
            flex-direction: column-reverse;
            justify-content: center;
        }

        .map-container {
            padding: 24px 0 0 0;
            margin: 0;
        }

        .benefits-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #map {
            width: 100%;
            height: 100vw;
        }

    }

    @media screen and (max-width: 768px) {
        .payment-methods {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin: 0 0 3rem 0;
        }

        .map-container h5{
            display: none;
        }
        .map-container {
            padding: 12px 0 0 0;
        }

        .about-zones-container{
            margin: 1.5rem 0 0 0 !important;
        }
    }

    @media screen and (max-width: 480px) {
        .our-payment-methods {
            padding: 3rem 0 0 0;
        }

        .payment-methods {
            padding: 0;
        }

        .our-benefits {
            padding: 0;
        }

        .map-container {
            padding:  0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #map {
            height: 100vw;
            width: 100vw;
        }
    }
</style>