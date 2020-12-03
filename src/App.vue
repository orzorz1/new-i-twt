<template>
  <v-app>
    <Header @naviOpen="drawer=true"/>
    <Navigation :drawer="drawer" @naviClose="drawer=false" />
    <Footer @naviOpen="drawer=true"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Footer from '@/components/footer/footer.vue';
import Header from '@/components/header/header.vue';
import Navigation from '@/components/navigation/navagation'

export default {
  name: 'App',

  components: {
    Footer,
    Header,
    Navigation,
  },

  data: () => ({
    drawer:false
  })
};
</script>

