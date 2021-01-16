<template>
  <v-card flat class="container">
    <div class="user-card">
      <div class="leftmain"></div>
      <div class="rightmain"></div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "home",
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  margin: auto;
  background-color: rgb(250, 250, 250);
  border-radius: 10px;
  width: 1024px;
  height: 470px;
  overflow: hidden;
  padding: 0;
  .user-card {
    display: flex;
    width: 100%;
    height: 100%;
    .leftmain {
      width: 360px;
      height: 100%;
      background: brown;
    }
    .rightmain {
      width: auto;
      height: 100%;
    }
  }
}
</style>
