<template>
  <v-container>
    <v-row class="mt-3" justify="center">
      <v-col cols="11">
        <v-expand-x-transition>
          <div
            class="success-class mx-auto mb-8"
            v-show="pageStatue === -1"
            @click="tempDo"
          >
            <div>
              <img src="../../assets/success.png" />
              <span>无需操作</span>
            </div>
            <p>您不用参加此次评价，感谢您对辅导员工作的关注！</p>
          </div>
        </v-expand-x-transition>
        <v-expand-x-transition>
          <div class="success-class mx-auto mb-8" v-show="pageStatue === 0">
            <div>
              <img src="../../assets/success.png" />
              <span>提交成功</span>
            </div>
            <p>感谢您对辅导员工作做出的评价，相信我们会做的越来越好！</p>
          </div>
        </v-expand-x-transition>
        <v-expand-transition>
          <div v-show="subPageStatue === 1">
            <div class="item-class" v-for="(item, i) in nameList" :key="i">
              <p>
                您当前正在评价辅导员：<span>{{ item.name }}</span>
              </p>
              <div class="content-class">
                <p class="title-class">2021学年辅导员年终评价</p>
                <div
                  class="question-class"
                  v-for="(question, j) in questionList"
                  :key="j"
                >
                  <p>
                    <span>{{ `${j + 1}. ` }}</span
                    >{{ question }}
                  </p>
                  <v-radio-group v-model="item.options[j]" row required
                    ><div class="options-class">
                      <v-radio
                        v-for="k in 5"
                        :key="k"
                        :label="optionsList[5 - k]"
                        :value="6 - k"
                        :ripple="false"
                      ></v-radio></div
                  ></v-radio-group>
                  <v-divider
                    v-if="j < questionList.length - 1"
                    class="mb-8"
                  ></v-divider>
                </div>
              </div>
            </div>
            <div style="text-align: center" class="mb-4">
              <v-btn
                color="#1976D2"
                dark
                class="postBtn elevation-0"
                :loading="postLoading"
                @click="toPost"
                >提交问卷</v-btn
              >
            </div>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
    <custom-dialog
      ref="dialog"
      @toCancel="toCancel"
      @toConfirm="toConfirm"
      :hasCancelBtn="hasCancelBtn"
    >
      <template #body
        ><div class="body-class">
          <p>
            <span class="mr-1">{{ info.realname }}</span
            >您好，您的基本信息如下：
          </p>
          <p class="no-gutter-class">
            学号 <span class="ml-1">{{ info.userNumber }}</span>
          </p>
          <p class="no-gutter-class">
            学院 <span class="ml-1">{{ info.department }}</span>
          </p>
          <p class="no-gutter-class">
            专业 <span class="ml-1">{{ info.major }}</span>
          </p>
          <p>
            您的辅导员姓名为 <span>{{ info.name }}</span>
          </p>
          <p>评价结果的统计形式为匿名，以上信息仅用作统计是否完成评价。</p>
          <p>确认信息无误后，就可以开始对辅导员这一年的工作进行评价啦!</p>
          <v-expand-transition>
            <div v-show="dialogStatue" class="feedback-class">
              <p class="bold-class mt-2 mb-2">意见反馈</p>
              <v-textarea solo class="elevation-0" :rows="3" v-model="feedback">
              </v-textarea>
            </div>
          </v-expand-transition>
        </div>
      </template>
      <template #leftBtn
        ><span>{{ dialogStatue ? "取消反馈" : "信息有误" }}</span></template
      >
      <template #rightBtn
        ><span>{{ dialogStatue ? "提交" : "开始评价" }}</span></template
      >
    </custom-dialog>
  </v-container>
</template>

<script>
import customDialog from "../../components/customDialog/index.vue";
import {
  getEvaluateInfo,
  postEvaluateInfo,
  postEvaluateFeedback,
} from "../../api/user";
export default {
  name: "evaluate",
  components: {
    customDialog,
  },
  data() {
    return {
      info: {
        userNumber: "获取中……",
        realname: "亲爱的用户",
        department: "获取中……",
        major: "获取中……",
        name: "获取中……",
      },
      feedback: "",
      postLoading: false,
      pageStatue: -2,
      subPageStatue: -2,
      hasCancelBtn: true,
      dialogStatue: false,
      nameList: [],
      optionsList: ["不满意", "一般", "基本满意", "比较满意", "非常满意"],
      questionList: [
        "指导学生党支部和班委会建设，做好学生骨干培养工作，以班级为基础，以学生为主体，帮助学生树立正确的世界观、人生观、价值观。",
        "培养学生养成良好的道德品质，引导学生养成良好的心理品质和自尊、自爱、自律、自强的优良品格，增强学生克服困难、经受考验、承受挫折的能力。",
        "能够深入学生，了解学生情况，经常与学生进行比较深入的谈心；针对学生关心的热点、焦点问题，及时进行教育和引导，化解矛盾冲突，参与有关突发事件（突然发生、严重且紧急的、危及学生身体或心理安全的事件）处理，维护好校园安全和稳定。",
        "公平、公正、公开的做好学生的评奖评优工作，帮助学生树立正确的荣誉观、成才观；宣传、落实国家资助政策，做好家庭经济困难学生认定、助学金评定、勤工助学等工作，积极促进家庭经济困难学生顺利完成学业、能力素质提升。",
        "定期进行宿舍安全主题宣传教育，切实提高学生安全防火、防盗、防骗意识；经常深入学生宿舍，严格依照学生宿舍相关管理规定排查和整改安全隐患以及杜绝不文明住宿现象；注重对学生宿舍文化建设，丰富宿舍文化生活，营造宿舍良好文化氛围。",
        "要掌握学生思想、学习、家庭、生活的基本状况，以服务学生可持续发展为目标，有针对性地为学生提供学习、择业、交友、生活等方面的咨询服务。",
        "能够引导学生形成科学的学习方法和良好的学习习惯，提升精神境界和生活品味；能够为学生提供高效优质的就业指导和信息服务，帮助学生树立正确的择业观念。",
        "定期召开学生座谈会和年级工作会，分析学生思想状况和学习情况，积极加强教学研究，主动承担心理健康教育讲座、党课、团课，力争使讲座和课程生动、内容丰富，贴近学生的需求和社会的需要。",
        "能够及时将学校布置的工作传达到学生，积极组织学生开展各项思想教育类、科技创新类、文体类等活动；积极帮助和关心学生，学生遇到问题能够及时找到辅导员老师。",
        "对辅导员德、能、勤、绩的整体评价。",
      ],
    };
  },
  methods: {
    tempDo() {
      this.pageStatue = 1;
      setTimeout(() => {
        this.subPageStatue = 1;
        setTimeout(() => {
          this.$refs.dialog.openDialog();
        }, 500);
      }, 500);
    },
    objectToFormData(obj) {
      let formData = new FormData();
      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
          obj[key].forEach((item) => {
            formData.append(key, item);
          });
          return;
        }
        formData.append(key, obj[key]);
      });
      return formData;
    },
    toCancel() {
      this.feedback = "";
      this.dialogStatue = !this.dialogStatue;
      this.$refs.dialog.clearLoading();
    },
    toConfirm() {
      if (!this.dialogStatue) {
        setTimeout(() => {
          this.$refs.dialog.clearLoading();
          this.$refs.dialog.closeDialog();
          this.pageStatue = 1;
        }, 500);
      } else {
        if (!this.feedback) {
          this.$message.warning(
            "如果信息有误的话请填写好情况说明再提交哦~我们将第一时间为您核实修正！"
          );
          this.$refs.dialog.clearLoading();
          return;
        } else {
          postEvaluateFeedback(
            this.objectToFormData({
              student_id: this.info.userNumber,
              context: this.feedback,
            })
          ).then(({ msg: msg }) => {
            if (msg === "succeed!") {
              this.$message.success("反馈成功，我们会尽快处理！");
              this.$refs.dialog.clearLoading();
              this.$refs.dialog.closeDialog();
            } else {
              this.$message.error("非常抱歉，反馈失败，请重试！");
              this.$refs.dialog.clearLoading();
            }
          });
        }
      }
    },
    checkout() {
      let theOptions = {};
      for (let i = 0; i < this.nameList.length; i++) {
        if (this.nameList[i].name) {
          for (let j = 0; j < this.nameList[i].options.length; j++) {
            if (this.nameList[i].options[j] === 0) {
              this.$message.warning("好像还有未完成的题目哦~仔细检查一下吧！");
              return false;
            } else {
              theOptions["a" + (j + 1)] = this.nameList[i].options[j];
            }
          }
        } else {
          this.$message.error("非常抱歉，辅导员信息获取失败，请刷新后重试哦！");
          return false;
        }
      }
      return theOptions;
    },
    toPost() {
      let temp = this.checkout();
      if (temp) {
        this.postLoading = true;
        postEvaluateInfo(
          this.objectToFormData({
            student_id: this.info.userNumber,
            ...temp,
            feedback: "",
          })
        ).then(({ msg: msg }) => {
          if (msg === "succeed!") {
            this.postLoading = false;
            this.subPageStatue = 0;
            setTimeout(() => {
              this.pageStatue = 0;
            }, 500);
          } else {
            this.$message.error("非常抱歉，评价失败，请重试！");
            this.postLoading = false;
          }
        });
      }
    },
  },
  created() {
    this.info = JSON.parse(sessionStorage.getItem("basicInfo"));
    this.info.name = "获取中……";
    getEvaluateInfo({ student_id: this.info.userNumber }).then(
      ({ valid: code, name: name }) => {
        if (code === 1) {
          this.info.name = name;
          this.nameList = [
            { name: name, options: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
          ];
          this.subPageStatue = 1;
          setTimeout(() => {
            this.$refs.dialog.openDialog();
          }, 500);
        } else {
          this.pageStatue = -1;
        }
      }
    );
  },
};
</script>

<style scoped>
.success-class {
  background-color: white;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.success-class img {
  width: 26px;
  height: 32px;
  vertical-align: middle;
  margin-right: 10px;
}
.success-class span {
  font-weight: 900;
  font-size: 22px;
  line-height: 75px;
  vertical-align: middle;
  color: #1976d2;
}
.success-class p {
  margin: 24px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
}
.body-class {
  color: #4d4d4d;
  font-size: 16px;
  margin: 10px 0 30px 0;
}
.body-class span {
  color: #1976d2;
}
.no-gutter-class {
  margin-bottom: 0;
}
.bold-class {
  font-size: 16px;
  font-weight: 900;
  color: #000;
}
.feedback-class {
  transition: all 1s;
  overflow: hidden;
}
.feedback-class .v-input {
  margin: 2px;
  box-shadow: none !important;
}
.feedback-class >>> .v-input__slot {
  box-shadow: none !important;
  border: 2px solid #e5e5e5;
}
.feedback-class >>> .v-text-field__details {
  display: none;
}
.item-class p {
  font-size: 15px;
}
.item-class p span {
  color: #1976d2;
}
.content-class {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin: 10px 0 30px 0;
}
.content-class .title-class {
  font-weight: 900;
  font-size: 19px;
  text-align: center;
  color: #000;
}
.content-class p {
  font-size: 13px;
  color: #000;
}
.options-class {
  padding-left: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.options-class >>> .v-label {
  font-size: 13px;
  color: #000;
}
.options-class >>> .v-input--selection-controls__input {
  width: 16px;
  height: 16px;
}
.postBtn {
  width: 180px;
  font-size: 15px;
  font-weight: 900;
  border-radius: 8px;
  margin: 0 auto;
}
</style>