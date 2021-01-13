<template>
  <v-container>
    <v-card tile flat style="width: 80%; position: relative; margin: 0 auto">
      <v-card-title>账号升级</v-card-title>
      <div v-if="agree">
        <v-form v-if="getOptions" ref="form">
          <v-select
            :items="options"
            item-text="name"
            item-value="id"
            v-model="select"
            label="目标账号类型"
            outlined
          ></v-select>
          <v-col cols="10" offset="1" sm="4" offset-sm="4">
            <v-btn block color="primary" @click="submit"> 更新信息 </v-btn>
          </v-col>
        </v-form>
        <div class="alert" v-else>
          <div class="alert-icon">
            <v-icon aria-hidden="false"> mdi-alert-circle-outline </v-icon>
          </div>
          <div class="alert-text">您的账号无法升级</div>
        </div>
      </div>
      <div class="func" v-else>
        <v-btn class="btn" depressed color="primary" @click="getOption">
          升级账号
        </v-btn>
        <div class="tip">
          <v-icon>mdi-alert</v-icon>
          这是一个不可逆操作
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { upgrade, upgradeOption } from "@/api/user";
import Message from "@/components/message";

export default {
  name: "upgrade",
  data: () => ({
    options: null,
    getOptions: false,
    select: null,
    agree: false,
  }),
  methods: {
    submit() {
      console.log(this.select);
      let data = { typeId: this.select };
      upgrade(data).then(() => {
        Message.success("升级成功");
      });
    },
    getOption() {
      this.agree = true;
      upgradeOption().then((value) => {
        console.log(value);
        this.options = value.result;
        if (this.options.length > 0) {
          this.getOptions = true;
        }
      });
    },
  },
  mounted: () => {},
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
.func {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .btn {
    margin: 0 auto;
  }
  .tip {
    color: #aaaaaa;
    text-align: center;
    padding: 20px 0;
  }
}
</style>