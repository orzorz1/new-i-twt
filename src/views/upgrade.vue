<template>
  <v-container>
    <v-card tile flat style="width: 80%; position: relative; margin: 0 auto">
      <v-card-title>账号升级</v-card-title>
      <v-form v-if="options.length > 0" ref="form" v-model="valid">
        <v-select
          :items="items"
          v-model="select"
          label="目标账号类型"
          outlined
        ></v-select>
      </v-form>
      <dir class="alert" v-else>
        <div class="alert-icon">
          <v-icon aria-hidden="false"> mdi-alert-circle-outline </v-icon>
        </div>
        <div class="alert-text">您的账号无法升级</div>
      </dir>
    </v-card>
  </v-container>
</template>

<script>
import { upgrade, upgradeOption } from "@/api/user";
import Message from "@/components/message";

export default {
  name: "upgrade",
  data: () => ({
    options: [],
    select: "",
  }),
  methods: {
    submit() {
      let data = { typeId: this.select.id };
      upgrade(data).then(() => {
        Message.success("升级成功");
      });
    },
  },
  created: () => {
    upgradeOption().then((value) => {
      console.log(value);
      this.options = value.result;
    });
  },
};
</script>

<style lang="scss" scoped>
.alert {
  display: flex;
  flex-direction: column;
  padding: 16px;
  .alert-icon {
    font-size: 32px;
    text-align: center;
  }
  .alert-text {
    font-size: 16px;
    text-align: center;
  }
}
</style>