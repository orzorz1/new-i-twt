<template>
    <div class="my-class">
        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="bigImg"></big-img>
        <v-card>
            <v-card-title class="my-card-title">
                <v-row>
                    <v-col cols="12" class="ml-1">
                        {{ date }} {{ reportCount }}/{{ allCount }}人已填报
                        <v-spacer></v-spacer>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="4" md="3">
                        <v-text-field
                            v-model="search"
                            prepend-icon="mdi-magnify"
                            label="搜索"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="3">
                        <v-menu
                            v-model="datePickerMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="0"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="查询日期"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                :allowed-dates="allowedDates"
                                v-model="date"
                                @input="datePickerMenu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4" md="3">
                        <v-select
                            class="report-status-select"
                            v-model="selectStatus"
                            prepend-icon="mdi-playlist-check"
                            :items="items"
                            label="填报状态"
                            dense
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-data-table
                style="min-height: 400px"
                v-if="!isPhone"
                v-model="selected"
                :headers="headers"
                :items="filterData"
                class="elevation-0 mx-3"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
            >
                <template v-slot:item.address="{ item }">
                    {{ item.address || "无" }}
                </template>
                <template v-slot:item.temperature="{ item }">
                    {{ item.temperature || "无" }}
                </template>
                <template v-slot:item.option="{ item }">
                    <v-btn
                        color="#50AD56"
                        style="color: white"
                        @click="seeDetail(item)"
                        :disabled="item.reportStatus === '未填报'"
                    >码
                    </v-btn
                    >
                </template>
            </v-data-table>
            <v-simple-table v-else min-height="300px">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th
                            v-for="(item, index) in mobileHeaders"
                            :key="index"
                            class="text-left"
                        >
                            {{ item.text }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item, index) in filterData.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              )"
                        :key="index"
                        v-ripple
                    >
                        <td>{{ item.userNumber }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.reportStatus }}</td>
                        <td>
                            <v-btn
                                outlined
                                color="#00A0E8"
                                dark
                                @click="seeMobileDetail(item)"
                                style="width: 20px; font-size: 12px"
                            >详细信息
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-row justify="center">
                <v-col style="text-align: center" v-if="this.filterData.length === 0"
                >No data available.
                </v-col
                >
            </v-row>
            <v-pagination
                class="pb-3"
                :total-visible="12"
                v-model="page"
                :length="pageCount"
            ></v-pagination>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title> 健康码/行程码</v-card-title>
                    <v-divider class="mx-2"></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-img
                                    style="cursor: pointer"
                                    @click="viewImg('https://api.twt.edu.cn' + PCData.healthCodeUrl)"
                                    :src="'https://api.twt.edu.cn' + PCData.healthCodeUrl"
                                    aspect-ratio="1"
                                    height="600"
                                    contain
                                ></v-img>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-img
                                    style="cursor: pointer"
                                    @click="viewImg('https://api.twt.edu.cn' + PCData.travelCodeUrl)"
                                    :src="'https://api.twt.edu.cn' + PCData.travelCodeUrl"
                                    aspect-ratio="1"
                                    height="600"
                                    contain
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            关闭
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="mobileDialog"
                      scrollable
                      max-width="500px">
                <v-card>
                    <v-card-title> 详细信息</v-card-title>
                    <v-divider class="mx-2"></v-divider>
                    <v-card-text v-if="mobileShowItem.reportStatus === '已填报'">
                        <v-row justify="center">
                            <v-col cols="3" class="font-weight-black">体温：</v-col>
                            <v-col cols="9">{{ mobileShowItem.temperature + "℃" }}</v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="3" class="font-weight-black">定位：</v-col>
                            <v-col cols="9">{{ mobileShowItem.address }}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4" class="font-weight-black">健康码：</v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-img
                                    @click="viewImg('https://api.twt.edu.cn' + mobileShowItem.healthCodeUrl)"
                                    :src="'https://api.twt.edu.cn' + mobileShowItem.healthCodeUrl"
                                    height="600"
                                    aspect-ratio="1.7"
                                ></v-img>
                            </v-col>
                            <v-col cols="4" class="font-weight-black">行程码：</v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-img
                                    @click="viewImg('https://api.twt.edu.cn' + mobileShowItem.travelCodeUrl)"
                                    :src="'https://api.twt.edu.cn' + mobileShowItem.travelCodeUrl"
                                    height="600"
                                    aspect-ratio="1.7"
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-text v-else> 还未填报，无数据</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="mobileDialog = false">
                            关闭
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </v-card>
    </div>
</template>

<script>
import {getReportInfo} from "@/api/admin";
import BigImg from '@/components/bigImg/BigImg.vue';
export default {
    name: "reportManage",
    components: { 'big-img':BigImg},
    data: () => ({
        bigImg:'',
        showImg:false,
        PCData: {},
        overlay: false,
        mobileShowItem: {},
        mobileDialog: false,
        page: 1,
        itemsPerPage: 10,
        toDates: "",
        fullWidth: document.documentElement.clientWidth,
        selectStatus: "未填报",
        items: ["已填报", "未填报", "全部"],
        dialog: false,
        datePickerMenu: false,
        date: "",
        data: [],
        mobileHeaders: [
            {text: "学号", value: "userNumber", sortable: false},
            {text: "姓名", value: "name", sortable: false},
            {
                text: "填报状态",
                value: "reportStatus",
                sortable: false,
                filterable: false
            },
            {text: "", value: "option", sortable: false}
        ],
        headers: [
            {text: "学号", value: "userNumber", sortable: false},
            {text: "姓名", value: "name", sortable: false},
            {
                text: "填报状态",
                value: "reportStatus",
                sortable: false,
                filterable: false
            },
            {text: "体温", value: "temperature", sortable: false},
            {text: "定位", value: "address", sortable: false},
            {text: "", value: "option", sortable: false}
        ],
        search: "",
        selected: [],
        rawData: []
    }),
    watch: {
        filterData: {
            handler: function () {
                this.page = 1;
            }
        },
        date: {
            handler: function () {
                this.getRawInfoByDate();
            }
        },
    },
    computed: {
        allCount: function () {
            return this.rawData.length;
        },
        reportCount: function () {
            let x = 0;
            for (let i = 0; i < this.rawData.length; i++) {
                if (this.rawData[i].reportStatus === "已填报") {
                    x++;
                }
            }
            return x;
        },
        pageCount: function () {
            return Math.ceil(this.filterData.length / this.itemsPerPage);
        },
        filterData: function () {
            let tempData = this.rawData.filter(item => {
                if (item.name != null && item.userNumber != null) {
                    return (
                        item.name.indexOf(this.search) !== -1 ||
                        item.userNumber.indexOf(this.search) !== -1
                    );
                } else {
                    return false;
                }
            });
            if (this.selectStatus === "全部") {
                return tempData;
            } else {
                return tempData.filter(item => {
                    return item.reportStatus === this.selectStatus;
                });
            }
        },
        isPhone: function () {
            return this.fullWidth <= 600;
        }
    },
    created() {
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy: function () {
        window.removeEventListener("resize", this.handleResize);
    },
    mounted() {
        let nowDate = new Date();
        this.date = `${nowDate.getFullYear()}-${
            nowDate.getMonth() + 1 < 10
                ? "0" + (nowDate.getMonth() + 1)
                : nowDate.getMonth() + 1
        }-${nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()}`;
        this.toDate = this.date;
    },
    methods: {
        getRawInfoByDate() {
            this.overlay = true;
            getReportInfo({date: this.date})
                .then(res => {
                    this.rawData = res.result;
                    this.overlay = false;
                })
                .catch(() => {
                    this.$message.error("获取数据失败");
                    this.overlay = false;
                });
        },
        seeMobileDetail(data) {
            this.mobileShowItem = data;
            this.mobileDialog = true;
        },
        seeDetail(data) {
            this.PCData = data;
            this.dialog = true;
        },
        handleResize() {
            this.fullWidth = document.documentElement.clientWidth;
        },
        allowedDates(val) {
            let vaArr = val.split("-");
            let toArr = this.toDate.split("-");
            let flag = true;
            for (let i = 0; i < 3; i++) {
                if (parseInt(vaArr[i]) > parseInt(toArr[i])) {
                    flag = false;
                }
            }
            return flag;
        },
        viewImg(url){
            this.bigImg=url;
            this.showImg = !this.showImg;
        },
    }
};
</script>

<style lang="scss" scoped>
.my-class ::v-deep .v-data-table__mobile-row__header {
    min-width: 44px !important;
}

.my-class ::v-deep .v-data-footer__pagination {
    margin: 8px !important;
}

.report-status-select {
    margin-top: 22px;
}

.report-status-select .v-icon {
    font-size: 38px !important;
}

.my-card-title {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-bottom: 0;
}
</style>
