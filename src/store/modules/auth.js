import authApi from "@/api/auth";
import { setItem } from "@/helpers/localStorage";

const state = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null
}

export const mutationsTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",
}

export const actionsTypes = {
  register: "[auth] register",
  login: "[auth] login"
}

export const gettersTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous"
}

const getters = {
  [gettersTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [gettersTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn)

  },
  [gettersTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false
  },

}

const mutations = {
  [mutationsTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationsTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  }
}

const actions = {
  [actionsTypes.register](context, credentials) {
    return new Promise(resolve => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationsTypes.registerSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(mutationsTypes.registerFailure, result.response.data.errors);
        })
    })
  },

  [actionsTypes.login](context, credentials) {
    return new Promise(resolve => {
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationsTypes.loginSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(mutationsTypes.loginFailure, result.response.data.errors);
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}