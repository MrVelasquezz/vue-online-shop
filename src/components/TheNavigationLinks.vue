<template>
    <div class="links">
        <div class="link-group" v-show="menuVisibility">
            <img src="@/assets/svgs/close.svg" class="close" alt="" @click="openMenu">
            <TheLinks :linksVisibility="linksVisibility[0]" :email = "email" :phone= "phone" />
            <div class="work-time">
                <p class="m-0">
                    <span v-t="{path: 'main.header.work_days', args: {start_day: work_days[0], end_day: work_days[1]}}"></span>
                    <br>
                    <span v-t="{path: 'main.header.work_time', args: {start_time: work_time[0], end_time: work_time[1]}}"></span>
                </p>
            </div>
            <!--<router-link :to="{name: 'Work'}">Work</router-link>-->
        </div>
        <TheLinks :linksVisibility="linksVisibility[1]" :email = "email" :phone= "phone" />
        <div id="location">
            <img src="@/assets/svgs/marker.svg" alt="">
            Graz
        </div>
        <div id="langs">
            <a class="lang" href="#" @click="changeLang('en')">EN</a>
            <hr class="m-0">
            <a class="lang" href="#" @click="changeLang('de')">DE</a>
            <hr class="m-0">
            <a class="lang" href="#" @click="changeLang('ru')">RU</a>
        </div>
        <a class="lang mobile" href="#" @click="changeLang('en')">EN</a>
        <a class="lang mobile" href="#" @click="changeLang('de')">DE</a>
        <a class="lang mobile" href="#" @click="changeLang('ru')">RU</a>
        <div class="mobile-menu-icon" @click="openMenu">
            <img src="@/assets/svgs/bars-solid.svg" alt="Bars">
        </div>
    </div>
</template>

<script>
    import TheLinks from '@/components/TheLinks.vue'
    import { work_time, work_days, email, phone } from '@/stores/data.json'
    export default {
        components: {
            TheLinks
        },
        data() {
            return {
                menuVisibility: false,
                linksVisibility: [],
                work_time: '',
                work_days: '',
                email: '',
                phone: ''
            }
        },
        methods: {
            openMenu() {
                if (this.menuVisibility == false) {
                    this.menuVisibility = true
                } else {
                    this.menuVisibility = false
                }
            },
            changeLang(param){
                document.cookie = `lang=${param}; path: '/'; max-age = 360000`
                document.location = '/'
            }
        },
        created() {
            this.work_time = work_time
            this.work_days = work_days
            this.email = email
            this.phone = phone

            try {
                if (window.outerWidth >= 769) {
                    this.linksVisibility = [false, true]
                } else if (window.outerWidth <= 768) {
                    this.linksVisibility = [true, false]
                }
                window.onresize = () => {
                    if (window.outerWidth >= 769) {
                        this.linksVisibility = [false, true]
                    } else if (window.outerWidth <= 768) {
                        this.linksVisibility = [true, false]
                    }
                }

            } catch (e) {
                console.log('Somthig went wrong')
            }
        }
    }
</script>

<style>
    a,
    #contacts,
    #location,
    .lang,
    .work-time {
        color: #fff;
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
    }

    .links {
        margin: 1.5rem 0 0 0;
        display: flex;
        flex-direction: row;
    }

    .link-group {
        margin: 0;
        display: flex;
        flex-direction: row;
    }

    .work-time {
        display: none;
    }

    .links-container {
        display: flex;
        flex-direction: row;
    }

    .links-container a {
        height: 20px;
    }


    #contacts {
        display: flex;
        flex-direction: column;
    }

    #email {
        padding: 5px 0 0 0;
    }

    #location {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        margin: 0 3rem 0 0;
    }

    #location img {
        margin-top: -3px;
    }

    .mobile-menu-icon {
        display: none;
    }

    .mobile {
        display: none;
    }

    #langs {
        display: flex;
        flex-direction: column;
    }

    #langs hr {
        height: 1px;
        background: #fff;
        opacity: 1;
    }

    @media screen and (max-width: 768px) {
        .links {
            width: 100%;
            margin: 0.5rem 0 0 0;
            display: grid;
            grid-template-columns: repeat(5, 50px);
            grid-row: 1fr;
            justify-content: space-between;
            align-items: center;
        }

        .link-group {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99998;
            width: 100vw;
            height: max-content;
            background: #0E204B;
            padding: 44px 18px;
        }

        .close {
            width: 35px;
            height: 35px;
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 99999;
        }

        .links-container {
            display: none;
        }

        #number,
        #email {
            font-size: 24px;
            padding: 0;
        }

        .work-time {
            display: block;
            padding: .7rem 0 .7rem 0;
        }

        .mobile-menu-icon {
            display: block;
            text-align: end;
        }

        .mobile {
            display: inline;
        }

        .mobile-menu-icon img {
            width: 35px;
            height: 35px;
        }

        #location {
            margin: 0;
        }

        #langs {
            display: none;
        }

        .lang {
            text-align: center;
        }

        a,
        div#contacts,
        div#location,
        div.lang {
            color: #fff;
            font-size: 16px;
        }
    }
</style>