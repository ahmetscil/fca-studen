import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import MyPage from './views/MyPage'
import Live from './views/Live'
import Auth from './auth/Auth'
import Upload from './components/Upload'
import ForgotPassword from './auth/ForgotPassword'
import ChangePassword from './auth/ChangePassword'
import ChangeTempPassword from './auth/ChangeTempPassword'
import Settings from './views/Settings'

import Lecture from './views/Lectures/Index'
import CourseList from './views/Courses/Index' // lectures in courses list
import CourseDetail from './views/Courses/Show' // course detail and lectures

import store from './store'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/auth', component: Auth, name: 'Auth' },
    { path: '/upload', component: Upload, name: 'Upload' },
    { path: '/ForgotPassword', component: ForgotPassword, name: 'ForgotPassword' },
    { path: '/ChangePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/ChangeTempPassword', component: ChangeTempPassword, name: 'ChangeTempPassword' },
    {
      path: '/Settings',
      component: Settings,
      name: 'Settings',
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/auth')
        }
      }
    },
    {
      path: '/MyPage',
      component: MyPage,
      name: 'MyPage',
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/auth')
        }
      }
    },
    {
      path: '/Live/:url',
      component: Live,
      name: 'Live',
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/auth')
        }
      }
    },
    {
      path: '/Lecture/:url',
      component: Lecture,
      name: 'Lecture',
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/auth')
        }
      }
    },
    {
      path: '/Course',
      component: CourseList,
      name: 'CourseList',
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/auth')
        }
      }
    },
    {
      path: '/Course/:url',
      component: CourseDetail,
      name: 'CourseDetail',
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next()
        } else {
          next('/auth')
        }
      }
    }
  ],
  mode: 'history'
})
