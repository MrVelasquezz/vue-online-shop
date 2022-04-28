<template>
    <div class="modal-menu" :class="[show ? 'menu-popup-show' : 'menu-popup-hide']" @click="closeModal(1)">
        <div class="menu-popup-container" @click="closeModal(0)">
            <div class="purchased-items">
                <h2 class="m-0 p-0 the-menu-popup-title">
                    Your order
                </h2>
                <div class="purchased-items-list">
                    <div v-for="(item, key) in items" :key="key">
                        <TheMenuPopupItem :item="item" @changeAmount="changeAmount" @removeItem="removeItem" />
                    </div>
                    <div class="empty-cart" v-if="items.length == 0">
                        <h5>
                            You have not choose any items yet.
                        </h5>
                    </div>
                </div>
                <h2 class="m-0 p-0 the-menu-popup-total">
                    Sub-total: <span class="totla-price">{{total}}€</span>
                </h2>
                <h6 class="m-0 p-0 delivery-costs">Delivery costs: <span class="totla-price">{{deliveryCosts}}€</span>
                </h6>
            </div>
            <div class="purchase-form">
                <form @submit.prevent>
                    <div class="rows p-0">
                        <span>
                            <label for="firstname">Name:*</label>
                            <input type="text" name="firstname" id="firstname" v-model.trim="firstname">
                        </span>
                        <span>
                            <label for="secondname">Surname:*</label>
                            <input type="text" name="secondname" id="secondname" v-model.trim="secondname">
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="mail">Email:*</label>
                            <input type="email" id="mail" name="mail" v-model.trim="mail">
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="phone">Phone number:*</label>
                            <input type="tel" name="phone" id="phone" v-model.trim="phone">
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="street">Street:*</label>
                            <input type="text" name="street" id="street" v-model.trim="street" @blur="checkAdr">
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="house">House:*</label>
                            <input type="text" name="house" id="house" maxlength="6" v-model.trim="house"
                                @blur="checkAdr">
                        </span>
                        <span>
                            <label for="ent">Enterance:</label>
                            <input type="text" name="ent" id="ent" maxlength="2" v-model.trim="ent">
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="floor">Floor:</label>
                            <input type="number" name="floor" id="floor" v-model.trim="floor">
                        </span>
                        <span>
                            <label for="apartment">Apartment:</label>
                            <input type="number" name="apartment" id="apartment" v-model.trim="apartment">
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="delivery-time">Time of delivery:*</label>
                            <select name="delivery-time" id="delivery-time" v-model="time" @click="getTime">
                                <option value="" disabled>Select delivery time</option>
                                <option v-for="(item, key) in aviable_purchase_time" :key="key" :value="item">{{item}}
                                </option>
                            </select>
                        </span>
                    </div>
                    <div class="rows">
                        <span>
                            <label for="comment">Add comment:</label>
                            <textarea name="comment" id="comment" max-length="254" v-model.trim="comment"></textarea>
                        </span>
                    </div>
                    <div class="rows radio-outer-container">
                        <label>
                            <input type="radio" class="payment-option" name="payment-option" value="paypal"
                                @change="makePurchase('p')" :checked="checked">
                            PayPal or Card
                        </label>
                        <label>
                            <input type="radio" class="payment-option" name="payment-option" value="alternate"
                                @change="makePurchase('a')" :checked="checked">
                            Cash
                        </label>
                    </div>
                    <div class="rows">
                        <div id="empty-payment-buttons" v-show="empty_payment_buttons">
                            Here will be the payment buttons. <br>
                            But before choosing a payment method, fill out the form above
                        </div>
                        <div id="paypal-button-container" v-show="show_pay_pal_btns"></div>
                        <div id="alternate-button-container" v-show="show_alternative_btn">
                            <button class="btn" @click="makePurchase('b')" :disabled="disable_btn">Order</button>
                        </div>
                    </div>
                </form>
            </div>
            <TheErrorPopup :errorList="errors" :errorModalShow="errorModalShow" @closeErrorModal="closeErrorModal" />
            <TheAdressSubmitPopup :adressData="adressData" :adressModalShow="adressModalShow"
                @closeAdressModal="closeAdressModal" />
        </div>
    </div>
</template>

<script>
    import TheMenuPopupItem from '@/components/TheMenuPopupItem.vue'
    import TheErrorPopup from '@/components/TheErrorPopup.vue'
    import TheAdressSubmitPopup from '@/components/TheAdressSubmitPopup.vue'
    import {
        serverDefaults
    } from '@/scripts/connect'

    let computed_request = {}
    export default {
        name: 'TheMenuPopup',
        components: {
            TheMenuPopupItem,
            TheErrorPopup,
            TheAdressSubmitPopup
        },
        props: {
            show: {
                type: Boolean
            },
            total: {
                type: [String, Number]
            },
            items: {
                type: Array
            }
        },
        data() {
            return {
                closeModalVar: '',
                errors: [],
                computed_server_items: [],
                errorModalShow: false,
                firstname: '',
                secondname: '',
                mail: '',
                phone: '',
                street: '',
                house: '',
                ent: '',
                floor: '',
                apartment: '',
                time: '',
                comment: '',
                payment_method: '',
                deliveryCosts: 0,
                disable_btn: true,
                adressData: {},
                adressModalShow: false,
                show_pay_pal_btns: false,
                show_alternative_btn: false,
                empty_payment_buttons: true,
                inner_computed_request: {},
                checked: false,
                aviable_purchase_time: []
            }
        },
        methods: {
            getTime() {
                let date = new Date()
                let dateArr = []
                let hour = date.getHours()
                while (hour <= 21) {
                    dateArr.push(`${hour}:30`)
                    dateArr.push(`${hour++}:00`)
                }
                this.aviable_purchase_time = dateArr.sort()
                if (date.getMinutes() > 5 || date.getMinutes() > 35) {
                    this.aviable_purchase_time.splice(0, 1)
                }
                this.aviable_purchase_time.splice(0, 1)
                //this.aviable_purchase_time.splice(dateArr.length - 1, 1)
            },
            closeModal(param) {
                if (param == 0) {
                    this.closeModalVar = '0'
                } else if (param == 1 && this.closeModalVar == '0') {
                    this.closeModalVar = ''
                } else {
                    this.$emit('closeModal', param)
                }
            },
            changeAmount(options) {
                this.$emit('changeAmount', options)
            },
            removeItem(id) {
                this.$emit('removeItem', id)
            },
            async makePurchase(arg) {
                /*console.log(!this.street.match(/^[\u00C0-\u017FA-Za-z]*$/), !this.house.match(
                    /^[\u00C0-\u017FA-Za-z0-9]*$/))*/
                if (this.firstname.length < 2 || this.firstname.length > 24) {
                    this.errors.push({
                        field: 'Firstname',
                        hint: 'Firstname must be from 2 to 24 letters long.'
                    })
                }
                if (this.secondname.length < 2 || this.secondname.length > 24) {
                    this.errors.push({
                        field: 'Secondname',
                        hint: 'Secondname must be from 2 to 24 letters long.'
                    })
                }
                if (this.mail.length < 8 || this.mail.length > 64 || !/@/.test(this.mail)) {
                    this.errors.push({
                        field: 'Email',
                        hint: 'Email must be from 8 to 64 letters long. Must contain "@".'
                    })
                }
                if (this.phone.length < 11 || this.phone.length > 14 && !this.phone.match(/^\d*$/)) {
                    this.errors.push({
                        field: 'Phone',
                        hint: 'Phone must contain only numbers.'
                    })
                }
                if (this.street.length < 4 || this.street.length > 48 || !this.street.match(
                        /^[\u00C0-\u017FA-Za-z]*$/)) {
                    this.errors.push({
                        field: 'Street',
                        hint: 'Street must be from 4 to 48 letters long.'
                    })
                }
                if (this.house.length < 1 || this.house.length > 6 || !this.house.match(
                        /^[\u00C0-\u017FA-Za-z0-9]*$/)) {
                    this.errors.push({
                        field: 'House',
                        hint: 'House must contain only letters and numbers. For axample: 1A'
                    })
                }
                if (this.ent.length && this.ent.length < 1) {
                    this.errors.push({
                        field: 'Enterance',
                        hint: 'Enterance must contain only letters and numbers. For axample: 2D'
                    })
                }
                if (this.floor.length && this.floor.length < 1) {
                    this.errors.push({
                        field: 'Floor',
                        hint: 'Floor must contain only numbers.'
                    })
                }
                if (this.apartment && this.apartment.length < 1) {
                    this.errors.push({
                        field: 'Apartment',
                        hint: 'Apartment must contain only numbers.'
                    })
                }
                if (!this.time) {
                    this.errors.push({
                        field: 'Time of delivery',
                        hint: 'Please choose aviable time for delivery.'
                    })
                }
                if (this.comment && this.comment.length > 254) {
                    this.errors.push({
                        field: 'Apartment',
                        hint: 'Comments must be not longer, then 254 symbols.'
                    })
                }
                this.computed_server_items = []
                this.items.forEach(item => {
                    if (item.id > 0 && item.amount > 0) {
                        this.computed_server_items.push({
                            id: item.id,
                            amount: item.amount
                        })
                    }
                })

                if (this.errors.length == 0 && this.computed_server_items.length == this.items.length) {
                    if (typeof this.adressData != 'undefined' && this.adressData.status != 'TOO_FAR' && this
                        .adressData.status != 'ERROR') {
                        if (arg == 'p') {
                            this.show_pay_pal_btns = true
                            this.show_alternative_btn = false
                            this.empty_payment_buttons = false

                            this.inner_computed_request = {
                                contact_info: {
                                    firstname: this.firstname,
                                    secondname: this.secondname,
                                    email: this.mail,
                                    phone: this.phone,
                                    payment_method: 1
                                },
                                adress: {
                                    street: this.street,
                                    house: this.house,
                                    ent: this.ent,
                                    floor: this.floor,
                                    apartment: this.apartment
                                },
                                additional_info: {
                                    time: this.time,
                                    comment: this.comment,
                                },
                                purchase: {
                                    items: this.computed_server_items
                                }
                            }
                            computed_request = this.inner_computed_request
                        } else if (arg == 'a') {
                            this.show_pay_pal_btns = false
                            this.show_alternative_btn = true
                            this.empty_payment_buttons = false
                        } else if (arg == "b") {
                            const makePurchase = await serverDefaults.post('/purchase', {
                                contact_info: {
                                    firstname: this.firstname,
                                    secondname: this.secondname,
                                    email: this.mail,
                                    phone: this.phone,
                                    payment_method: this.payment_method
                                },
                                adress: {
                                    street: this.street,
                                    house: this.house,
                                    ent: this.ent,
                                    floor: this.floor,
                                    apartment: this.apartment
                                },
                                additional_info: {
                                    time: this.time,
                                    comment: this.comment,
                                },
                                purchase: {
                                    items: this.computed_server_items
                                }
                            })
                        } else {
                            this.checked = false
                            return
                        }
                    } else {
                        this.adressModalShow = true
                    }

                } else if (this.errors.length > 0) {
                    this.errorModalShow = true
                    this.empty_payment_buttons = true
                }
            },
            async checkAdr() {
                let adrCheck = 0
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
                console.log(11)
                if (this.street.length < 4 || this.street.length > 48 || !this.street.match(
                        /^[\u00C0-\u017FA-Za-z-' ']*$/)) {
                    adrCheck++
                }
                if (this.house.length < 1 || this.house.length > 6 || !this.house.match(
                        /^[\u00C0-\u017FA-Za-z0-9-' ']*$/)) {
                    adrCheck++
                }
                if (adrCheck == 0) {
                    try {
                        const checkAdr = await serverDefaults.post('/adressCheck', {
                            street: this.street,
                            house: this.house
                        })

                        const checkAdrAnsw = checkAdr.data.data

                        if (typeof checkAdrAnsw != 'undefined') {
                            this.deliveryCosts = checkAdrAnsw.cost
                            this.adressData = checkAdrAnsw
                        }
                    } catch (e) {

                    }
                }
            },
            closeErrorModal() {
                this.errorModalShow = false
                this.errors = []
            },
            closeAdressModal() {
                this.adressModalShow = false
            }
        },
        emits: ['closeModal', 'changeAmount', 'removeItem'],
        watch: {
            items: {
                handler(val, oldVal) {
                    if (val.length > 0) {
                        this.disable_btn = false
                    } else {
                        this.disable_btn = true
                    }
                    if (val != oldVal) {
                        this.checked = false
                        this.show_pay_pal_btns = false
                        this.show_alternative_btn = false
                        this.empty_payment_buttons = true
                    }
                },
                deep: true,
                immediate: true
            },
            firstname(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            secondname(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            mail(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            phone(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            street(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            house(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            ent(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            floor(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            apartment(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            time(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            },
            comment(val) {
                this.checked = false
                this.show_pay_pal_btns = false
                this.show_alternative_btn = false
                this.empty_payment_buttons = true
            }
        },
        mounted() {
            paypal.Buttons({

                // Call your server to set up the transaction
                createOrder: function () {
                    return fetch('http://localhost:3000/api/customers/purchase', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(computed_request)
                    }).then(function (res) {
                        return res.json()
                    }).then((data) => {
                        return data.orderID
                    })
                },
                onApprove: function (data) {
                    return fetch('http://localhost:3000/api/customers/approve-purchase', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    }).then(function (res) {
                        try {
                            return res.json();
                        } catch (e) {
                            alert('Error ocured. Please contact us by phone or email.')
                        }
                    }).then(function (details) {
                        alert('Thanks for Your order.')
                    })
                }

            }).render('#paypal-button-container');
        }
    }
</script>

<style scoped>
    .modal-menu {
        width: 100vw;
        height: 100vh;
        position: absolute;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        overflow: hidden;
        background: rgba(45, 52, 54, 0.3);
        z-index: 9998;
    }

    .btn {
        background: #FC5455;
        color: #fff;
        width: 220px;
        height: 60px;
        font-weight: 600;
        font-size: 26px;
        border: none;
        border-radius: 50px;
        margin: 0 auto;
    }

    .btn:disabled {
        background: rgba(99, 110, 114, 1.0);
    }

    .menu-popup-container {
        width: 1080px;
        height: 780px;
        position: relative;
        background: #fff;
        border-radius: 42px;
        z-index: 9999;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        overflow: hidden;
    }

    #empty-payment-buttons {
        text-align: center;
        margin: 1rem 0;
    }

    .empty-cart {
        text-align: center;
        color: rgba(99, 110, 114, 1.0);
    }

    .purchased-items {
        padding: 1.5rem 1rem;
        width: 100%;
    }

    .purchased-items h2.the-menu-popup-total {
        text-align: start !important;
    }

    .purchased-items h6 {
        color: #F54748;
        font-size: 12px !important;
    }

    .purchased-items-list {
        overflow-y: scroll;
        height: 600px;
        width: 100%;
    }

    .purchase-form {
        min-width: 380px;
        height: 740px;
        box-shadow: 0 0 7px rgba(178, 190, 195, 0.8);
        border-radius: 20px;
        padding: 1rem;
    }

    .rows {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: inherit;
        padding: 10px 0 0 0;
        width: 100%;
    }

    .rows span {
        display: flex;
        flex-direction: column;
        margin: 0 1rem 0 0;
        width: 100%;
    }

    form label {
        font-size: 18px;
        font-weight: 700;
        padding: 0 0 0 5px;
    }


    .radio-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .radio-outer-container {
        padding: 10px 1rem 0 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    form input[type="radio"] {
        height: 18px;
        width: 18px;
    }

    form input[type="radio"]:active,
    form input[type="radio"]:focus {
        outline: none;
        box-shadow: none;
    }

    form textarea {
        height: 70px !important;
        overflow-y: scroll;
    }

    form textarea::-webkit-scrollbar {
        display: none;
    }

    form input,
    form select,
    form textarea {
        width: 100%;
        height: 30px;
        border: 1px solid #F54748;
        border-radius: 20px;
        padding: 0 8px;
        font-size: 18px;
        transition: 1s box-shadow;
    }

    form input:active,
    form input:focus,
    form textarea:focus,
    form textarea:active,
    form select:focus,
    form select:active {
        outline: none;
        box-shadow: 0 0 7px #F54748;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .menu-popup-show {
        display: flex;
    }

    .menu-popup-hide {
        display: none;
    }

    #paypal-button-container {
        width: 100%;
        height: 100%;
    }

    #alternate-button-container {
        width: 100%;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 768px) {
        .modal-menu {
            justify-content: center;
            align-items: flex-start;
            overflow-y: scroll;
        }

        .menu-popup-container {
            width: 98vw;
            height: auto;
            flex-direction: column;
            margin: 0.5rem 0;
        }

        h2.the-menu-popup-title {
            text-align: center !important;
        }

        .purchased-items h6 {
            color: #F54748;
            font-size: 12px !important;
        }

        .purchased-items-list {
            height: max-content;
            padding: 0 0 1rem 0;
        }

        .purchase-form {
            min-width: calc(100vw - 2rem);
            height: 700px;
        }
    }
</style>