import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  workerDefaults,
  serverDefaults
} from '../scripts/connect.js'

import Main from '../views/Main.vue'

async function check(){
  try{
    const checkUser = await workerDefaults.post('/checkUser')
    if(checkUser.data.status == 'OK'){
      return {status: 'OK', role: checkUser.data.data.role, accepted: checkUser.data.data.accepted}
    }
    else if(checkUser.data.status == 'NOAUTH'){
      return {status: 'NOAUTH'}
    }
  }
  catch(e){
    console.log(e)
  }
}

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/work',
    name: 'Work',
    redirect: {name: 'Controller'},
    component: () => import( /* webpackChunkName: "Work" */ '../views/Work.vue'),
    children: [
      {
        path: '/controller',
        name: 'Controller',
        async beforeEnter(){
          try{
            const checkInfo = await check()
          if(checkInfo.status == 'OK'){
            return {name: 'WorkPage'}
          }
          else{
            return {name: 'Signin'}
          }
          }
          catch(e){
            return {name: 'ErrorPage'}
          }
          
        },
        component: () => import( /* webpackChunkName: "Controller" */ '../views/partials/Controller.vue')
      },
      {
        path: 'signin',
        name: 'Signin',
        async beforeEnter(){
          try{
            const checkInfo = await check()
          if(checkInfo.status == 'OK'){
            return {name: 'WorkPage'}
          }
          }
          catch(e){
            return {name: 'ErrorPage'}
          }
        },
        component: () => import( /* webpackChunkName: "Signin" */ '../views/partials/Signin.vue')
      },
      {
        path: 'signup',
        name: 'Signup',
        async beforeEnter(){
          try{
            const enabled = await serverDefaults.get('/signupStatus')
            const checkInfo = await check()
            if(enabled.data.status != 'OK' || checkInfo.status != 'NOAUTH'){
              return {name: 'Signin'}
            }
          }
          catch(e){
            console.log(e)
            return {name: 'ErrorPage'}
          }
        },
        component: () => import( /* webpackChunkName: "Signup" */ '../views/partials/Signup.vue')
      },
      {
        path: 'workpage',
        name: 'WorkPage',
        async beforeEnter(to, from){
          try{
            const checkInfo = await check()
          if(checkInfo.status == 'NOAUTH'){
            return {name: 'Signin'}
          }
          }
          catch(e){
            return {name: 'ErrorPage'}
          }
          
        },
        redirect: {name: 'WorkPagesController'},
        component: () => import( /* webpackChunkName: "WorkPage" */ '../views/partials/WorkPage.vue'),
        children: [
          {
            path: '/workpagecontroller',
            name: 'WorkPagesController',
            async beforeEnter(){
              try{
                const checkInfo = await check()
              if(checkInfo.accepted == false){
                return {name: 'Regular'}
              }
              else if(checkInfo.accepted == true){
                if(checkInfo.role == 0){
                  return {name: 'Bots'}
                }
                else if(checkInfo.role == 1){
                  return {name: 'Cooks'}
                }
              }
              }
              catch(e){
                return {name: 'ErrorPage'}
              }
              
            },
            component: () => import( /* webpackChunkName: "Controller" */ '../views/partials/Controller.vue')
          },
          {
            path: 'bots',
            name: 'Bots',
            async beforeEnter(){
              try{
                const checkInfo = await check()
              if(checkInfo.role != 0 || checkInfo.accepted == false){
                return {name: 'WorkPage'}
              }
              }
              catch(e){
                return {name: 'ErrorPage'}
              }
              
            },
            component: () => import( /* webpackChunkName: "Bots" */ '../views/partials/Bots.vue')
          },
          {
            path: 'cooks',
            name: 'Cooks',
            async beforeEnter(){
              try{
                const checkInfo = await check()
              if(checkInfo.role != 1 || checkInfo.accepted == false){
                return {name: 'WorkPage'}
              }
              }
              catch(e){
                return {name: 'ErrorPage'}
              }
              
            },
            component: () => import( /* webpackChunkName: "Cooks" */ '../views/partials/Cooks.vue')
          },
          {
            path: '/regular',
            name: 'Regular',
            async beforeEnter(){
              try{
                const checkInfo = await check()
                if (checkInfo.accepted == true) {
                  return {
                    name: 'WorkPage'
                  }
                }
              }
              catch(e){
                return {name: 'ErrorPage'}
              }
            },
            component: () => import( /* webpackChunkName: "Regular" */ '../views/partials/Regular.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: () => import( /* webpackChunkName: "Error" */ '../views/ErrorPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Main'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router