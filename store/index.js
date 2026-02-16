export const state = () => ({
  alert: {
    message: '',
    type: '',
  },
  info: {
    email: '',
    phone: '',
    phoneAt: '',
    fbUrl: '',
    instaUrl: '',
    tiktokUrl: '',
    imServiceProviderName: '',
    imHeadquarters: '',
    imPhoneEmail: '',
    imPhoneNumber: '',
    imRegistrationNumber: '',
    imTaxNumber: '',
    imRegistrationAuthority: '',
    imHostingProvider: '',
    imHostingProviderHeadquarters: '',
    imHostingProviderEmail: '',
  }
})

export const getters = {
  info: state => {
    return state.info;
  },
}

export const mutations = {
  showMessage(state, payload) {
    state.alert.message = payload.message
    state.alert.type = payload.type
  },
  fetchInfo(state, payload) {
    state.info.email = payload.email;
    state.info.phone = payload.phone;
    state.info.phoneAt = payload.phoneAt;
    state.info.fbUrl = payload.fbUrl;
    state.info.instaUrl = payload.instaUrl;
    state.info.tiktokUrl = payload.tiktokUrl;
    state.info.imServiceProviderName = payload.imServiceProviderName;
    state.info.imHeadquarters = payload.imHeadquarters;
    state.info.imPhoneEmail = payload.imPhoneEmail;
    state.info.imPhoneNumber = payload.imPhoneNumber;
    state.info.imRegistrationNumber = payload.imRegistrationNumber;
    state.info.imTaxNumber = payload.imTaxNumber;
    state.info.imRegistrationAuthority = payload.imRegistrationAuthority;
    state.info.imHostingProvider = payload.imHostingProvider;
    state.info.imHostingProviderHeadquarters = payload.imHostingProviderHeadquarters;
    state.info.imHostingProviderEmail = payload.imHostingProviderEmail;
  }
}

export const actions = {
  async fetchInfo({ commit }) {
    await this.$axios.get('/info')
      .then((res) => {
        if (res.status === 200) {
          commit('fetchInfo', res.data)
        }
      })
  },
}

