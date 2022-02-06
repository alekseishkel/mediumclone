<template>
  <div class="auth-page ng-scope">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center ng-binding">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'home' }"> Have an account? </router-link>
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form
            class="ng-pristine ng-valid ng-valid-email"
            @submit.prevent="onSubmit"
          >
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>

            <button
              class="btn btn-lg btn-primary pull-xs-right ng-binding"
              type="submit"
              :disabled="isSubmitting"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors.vue';
import { actionsTypes } from '@/store/modules/auth.js';

export default {
  name: 'AppRegister',
  components: {
    McvValidationErrors,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    },
  },
  methods: {
    onSubmit() {
      // this.$store.commit(mutationsTypes.registerStart);
      this.$store
        .dispatch(actionsTypes.register, {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'home' });
        });
    },
  },
};
</script>
