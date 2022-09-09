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
    <v-card tile flat style="width: 80%; position: relative; margin: 10px auto">
      <v-card-title>功能说明</v-card-title>
      <v-card-subtitle>
        账号当前状态为：<b>{{ showStatus() }}</b>
      </v-card-subtitle>
      <v-card-text>
        使用场景：同学A本科毕业后同校读研，学号发生了变化，此时需要“账号升级”
        <br />据此类推，此功能使用于同校本升硕、硕升博</v-card-text
      >
    </v-card>
    <v-card tile flat style="width: 80%; position: relative; margin: 0 auto">
      <v-card-title>求实论坛升级</v-card-title>
      <div class="func">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="btn"
              depressed
              color="primary"
              @click="forumUpgrade"
              v-bind="attrs"
              v-on="on"
            >
              点此升级
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">请输入您的学号</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="原学号"
                      v-model="oldNumber"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="新学号"
                      v-model="newNumber"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="sureUpgrade"
                :loading="upgradeLoading"
              >
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="tip">
          <v-icon>mdi-alert</v-icon>
          这是一个不可逆操作
        </div>
      </div>
      <v-card-text>
        备注：适用于已经升级过的研究生账号，升级账号操作已经附带求是论坛迁移功能</v-card-text
      >
    </v-card>
  </v-container>
</template>

<script>
import {
  upgrade,
  upgradeOption,
  updateForumToken,
  upgradeForum,
} from "@/api/user";
import Message from "@/components/message";

export default {
  name: "upgrade",
  data: () => ({
    options: null,
    getOptions: false,
    select: null,
    agree: false,
    dialog: false,
    upgradeLoading: false,
    oldNumber: "",
    newNumber: "",
  }),
  methods: {
    submit() {
      let data = { typeId: this.select };
      upgrade(data).then(() => {
        Message.success("升级成功");
      });
    },
    showStatus() {
      let info = JSON.parse(sessionStorage.getItem("basicInfo"));
      return info.stuType;
    },
    getOption() {
      this.agree = true;
      upgradeOption().then((value) => {
        this.options = value.result;
        if (this.options.length > 0) {
          this.getOptions = true;
        }
      });
    },
    forumUpgrade() {
      this.oldNumber = "";
      this.newNumber = JSON.parse(
        sessionStorage.getItem("basicInfo")
      ).userNumber;
      this.dialog = true;
    },
    async sureUpgrade() {
      if (this.oldNumber === "") {
        Message.warning("请输入您的原学号");
        return;
      }
      if (this.newNumber === "") {
        Message.warning("请输入您的新学号");
        return;
      }
      this.upgradeLoading = true;
      let newToken = await updateForumToken();
      if (newToken) {
        let formData = new FormData();
        formData.append("old", this.oldNumber);
        formData.append("new", this.newNumber);
        upgradeForum(formData, newToken.data.token).then(
          ({ data: { data: res } }) => {
            if (res) {
              Message.error(res.error);
              this.upgradeLoading = false;
            } else {
              Message.success("账号升级成功");
              this.upgradeLoading = false;
              this.dialog = false;
            }
          }
        );
      } else {
        this.upgradeLoading = false;
      }
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
