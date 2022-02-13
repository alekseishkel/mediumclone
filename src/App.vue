<template>
  <mcv-navbar />

  <router-view />
</template>

<script>
import McvNavbar from '@/components/Navbar.vue';
import { actionsTypes } from '@/store/modules/auth';

export default {
  name: 'McvApp',
  components: {
    McvNavbar,
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getCurrentUser);
  },
};
</script>
