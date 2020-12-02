<template>
  <v-app>
    <Header @naviOpen="drawer=true"/>
    <Navigation :drawer="drawer" @naviClose="drawer=false" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/header/header.vue';
import Navigation from '@/components/navigation/navagation'

export default {
  name: 'App',

  components: {
    Header,
    Navigation,
  },

  data: () => ({
    drawer:false
  })
};
</script>

