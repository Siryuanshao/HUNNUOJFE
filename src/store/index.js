import Vue from 'vue'
import Vuex from 'vuex'

import { USER_TYPE, MODAL_TYPE, STORAGE_KEY } from 'Utils/constants'
import storage from 'Utils/storage'
import api from '@oj/apis/apis'


Vue.use(Vuex)

const stores = {
  state: {
    modalStatus: MODAL_TYPE.OFFLINE,
    profile: {
      userId : null,
      userName : null,
      userType : null,
      avatar: null,
      email: null
    }
  },
  getters : {
    isAdminRole: function (state) {
      return state.profile.userType === USER_TYPE.ADMIN || state.profile.userType === USER_TYPE.SUPER_ADMIN
    },
    isSuperAdminRole: function (state) {
      return state.profile.userType === USER_TYPE.SUPER_ADMIN
    }
  },
  mutations: {
    setProfile (state, payload) {
      state.profile = payload
      state.modalStatus = MODAL_TYPE.ONLINE
      storage.set(STORAGE_KEY.AUTHENTICATE, true)
    },
    clearProfile (state) {
      storage.set(STORAGE_KEY.AUTHENTICATE, false)
      state.modalStatus = MODAL_TYPE.OFFLINE
      state.profile = {
        userId : null,
        userName : null,
        userType : null,
        avatar: null,
        email: null
      }
    }
  },
  actions: {
    getProfile (context) {
      api.getInfo().then(res => {
        context.commit('setProfile', res.data.data)
      }).catch(_ => {
        context.commit('clearProfile')
      })
    }
  },
  modules: {
  }
}

const store = new Vuex.Store(stores)

Vue.prototype.$store = store

export default store
