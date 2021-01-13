<template>
  <v-app>
    <Header @naviOpen="drawer = true"  :hasNavi="true"/>
    <Navigation :drawer="drawer" @naviClose="drawer = false" />
    <Footer @naviOpen="drawer = true" />
    <v-main class="blue-grey lighten-5">
      <v-container style="padding: 0">
        <v-row justify="center" no-gutters>
          <v-col xl="9" lg="10" md="12" sm="12" xs="12">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Footer from "@/components/footer/footer.vue";
import Header from "@/components/header/header.vue";
import Navigation from "@/components/navigation/navagation";

export default {
  name: "Main",

  components: {
    Footer,
    Header,
    Navigation,
  },

  data: () => ({
    drawer: false,
  }),
};
</script>

