<template>
  <mcv-navbar />

  <router-view />
</template>

<script>
import McvNavbar from '@/components/Navbar.vue';
export default {
  name: 'McvApp',
  components: {
    McvNavbar,
  },
};
</script>
