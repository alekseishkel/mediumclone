<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand ng-binding" :to="{ name: 'home' }">
        MediumClone
      </router-link>

      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'home' }"
            active-class="active"
            exact
          >
            Home
          </router-link>
        </li>

        <template v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'login' }"
              active-class="active"
              exact
            >
              Sign in
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              active-class="active"
              exact
            >
              Sign up
            </router-link>
          </li>
        </template>

        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'home' }"
              active-class="active"
              exact
            >
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'home' }"
              active-class="active"
              exact
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link ng-binding"
              :to="{ name: 'home', params: { slug: currentUser.username } }"
              active-class="active"
              exact
            >
              <img class="user-pic" :src="currentUser.image" />
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'McvNavbar',
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.isLoggedIn,
      currentUser: (state) => state.auth.currentUser,
    }),
  },
};
</script>
