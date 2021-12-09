<template>
  <v-dialog
    v-model="show"
    transition="scroll-y-reverse-transition"
    content-class="certainDialog"
    max-width="100%"
    width="500px"
    overlay-color="#E5E5E5"
    overlay-opacity="0.6"
    persistent
  >
    <div style="background-color: white; padding: 24px; transition: all 1s">
      <slot name="body"></slot>
      <div class="actions-class mt-3">
        <v-btn
          small
          :color="cancelBtnColor"
          dark
          v-if="hasCancelBtn"
          class="elevation-0"
          :loading="cancelLoading"
          @click="toCancel"
        >
          <slot name="leftBtn"></slot>
        </v-btn>
        <v-btn
          small
          color="#1976D2"
          dark
          class="elevation-0"
          :loading="confirmLoading"
          @click="toConfirm"
        >
          <slot name="rightBtn"></slot>
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      cancelLoading: false,
      confirmLoading: false,
    };
  },
  props: {
    hasCancelBtn: {
      type: Boolean,
      default: true,
    },
    cancelBtnColor: {
      type: String,
      default: "#D22F19",
    },
  },
  methods: {
    openDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
    toCancel() {
      this.cancelLoading = true;
      this.$emit("toCancel");
    },
    toConfirm() {
      this.confirmLoading = true;
      this.$emit("toConfirm");
    },
    clearLoading() {
      this.cancelLoading = false;
      this.confirmLoading = false;
    },
  },
};
</script>

<style scoped>
.actions-class {
  display: flex;
  justify-content: space-around;
}
</style>
<style>
.actions-class .v-btn {
  width: 35%;
  border-radius: 8px;
  font-weight: 900;
  color: #ffffff;
  font-size: 13px;
}
.certainDialog {
  box-shadow: none !important;
}
</style>