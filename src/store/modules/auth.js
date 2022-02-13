import authApi from "@/api/auth";
import { setItem } from "@/helpers/localStorage";

const state = {
  isSubmitting: false,
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null
}

export const mutationsTypes = {
  registerStart: "[auth] Register Start",
  registerSuccess: "[auth] Register Success",
  registerFailure: "[auth] Register Failure",

  loginStart: "[auth] Login Start",
  loginSuccess: "[auth] Login Success",
  loginFailure: "[auth] Login Failure",

  getCurrentUserStart: "[auth] Get current user start",
  getCurrentUserSuccess: "[auth] Get current user success",
  getCurrentUserFailure: "[auth] Get current user failure",
}

export const actionsTypes = {
  register: "[auth] Register",
  login: "[auth] Login",
  getCurrentUser: "[auth] Get current user",
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
  },

  [mutationsTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.isLoggedIn = true
    state.currentUser = payload
  },
  [mutationsTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null

  }
}

const actions = {
  [actionsTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.registerStart)
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
      context.commit(mutationsTypes.loginStart)
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
  },

  [actionsTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(mutationsTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationsTypes.getCurrentUserFailure);
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