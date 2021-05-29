<template>
  <v-footer app absolute height="72px" color="#333333" class="twt-footer">
    <div class="twt-copyright">
      <span style="cursor:pointer;" @click="$router.push({path:'/about'})"><strong>@</strong>天外天工作室</span>/
      {{ thisYearcopy }}
      <a href="http://www.miibeian.gov.cn/" ref="nofollow"
        >津ICP备05004358号-12</a
      >
      / 津教备0767号
    </div>
    <!-- <img
      src="../../assets/logo.png"
      alt="twt-footer-logo"
      class="twt-footer-logo"
    /> -->
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    thisYearcopy: "© 2000-" + new Date().getFullYear() + " TwT Studio",
  }),
};
</script>

<style lang="scss" scoped>
.twt-footer {
  padding: 0;
  margin: 0;
  font-size: 1rem;
}
.twt-copyright {
  position: absolute;
  left: 50%;
  line-height: 40px;
  //  height: 50px;
  width: 100%;
  transform: translate(-50%);
  text-align: center;
}
.twt-copyright{
  color: #666666;
  margin-bottom: 0;
}
.twt-copyright a {
  color: #666666;
  text-decoration: none;
}
.twt-footer-logo {
  position: absolute;
  top: 40px;
  left: 50%;
  /* height: 40px; */
  width: 40px;
  transform: translate(-50%);
}
</style>
