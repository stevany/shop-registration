import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    shop: {
      type: '',
      name: '',
      address: '',
      openingTimes: [
        {
          day: 'Sunday',
          time: '00:00:00',
          close: false
        },
        {
          day: 'Monday',
          time: '00:00:00',
          close: false
        },
        {
          day: 'Tuesday',
          time: '00:00:00',
          close: false
        },
        {
          day: 'Wednesday',
          time: '00:00:00',
          close: false
        },
        {
          day: 'Thursday',
          time: '00:00:00',
          close: false
        },
        {
          day: 'Friday',
          time: '00:00:00',
          close: false
        },
        {
          day: 'Saturday',
          time: '00:00:00',
          close: false
        }
      ]
    }
  },
  mutations: {
    [mutations.SET_SHOP] (state, data) {
      state.shop = data
    }
  },
  actions: {
    save ({commit}, data) {
      commit(mutations.SET_SHOP, data)
    }
  },
  getters: {
    getShop: state => state.shop
  }
}
