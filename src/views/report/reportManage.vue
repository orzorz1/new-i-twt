<template>
    <div class="my-class">
        <v-card>
            <v-card-title>
                2021-8-29 120/150人已填报
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
                :search="search"
                v-model="selected"
                :headers="headers"
                :items="filterData"
                class="elevation-0 mx-2"
                :items-per-page="15"

            >
                <template v-slot:top>
                    <v-row>
                        <v-col cols="12" sm="4" md="2">
                            <v-text-field
                                v-model="search"
                                prepend-icon="mdi-magnify"
                                label="搜索"
                                single-line
                                hide-details
                            ></v-text-field
                            >
                        </v-col>
                        <v-col cols="12" sm="4" md="2">
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
                                    v-model="date"
                                    @input="datePickerMenu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="4" md="2">
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
                </template>
                <template v-slot:item.option="{ item }">
                    <v-btn outlined color="#00A0E8" @click="seeDetail(item)">查看健康码</v-btn>
                </template>
            </v-data-table>
            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
                <v-card>
                    <v-card-title>
                        健康码/行程码
                    </v-card-title>
                    <v-divider class="mx-2"></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-img
                                    src="https://picsum.photos/510/300?random"
                                    aspect-ratio="1.7"
                                ></v-img>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-img
                                    src="https://picsum.photos/510/300?random"
                                    aspect-ratio="1.7"
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            关闭
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "reportManage",
    data: () => ({
        selectStatus: '未填报',
        items: ['已填报', '未填报', '全部'],
        dialog: false,
        datePickerMenu: false,
        date: '',
        data: [],
        headers: [
            {text: "学工号", value: "userNumber", sortable: false},
            {text: "姓名", value: "username", sortable: false},
            {text: "填报状态", value: "status", sortable: false, filterable: false,},
            {text: "体温", value: "temperature", sortable: false},
            {text: "定位", value: "location", sortable: false},
            {text: "操作", value: "option", sortable: false},
        ],
        search: "",
        selected: [],
        rawData: [
            {
                userNumber: '3019244360',
                username: '高树韬',
                status: '已填报',
                temperature: '38℃',
                location: '天津市津南区海河教育园区天津大学北洋园校区平园25斋B'
            },
            {
                userNumber: '3019244361',
                username: '高树韬',
                status: '已填报',
                temperature: '38℃'
            },
            {
                userNumber: '3019244360',
                username: '高树韬',
                status: '已填报',
                temperature: '37℃'
            },
            {
                userNumber: '3019244360',
                username: '高树韬',
                status: '已填报',
                temperature: '37℃'
            },
            {
                userNumber: '3019244360',
                username: '高树韬',
                status: '未填报',
                temperature: '37℃'
            }
        ],

    }),
    computed: {
        filterData: function () {
            if (this.selectStatus === '全部') {
                return this.rawData
            } else {
                return this.rawData.filter((item) => {
                    return item.status === this.selectStatus
                })
            }
        }
    },
    mounted() {
        let nowDate = new Date()
        this.date = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1}-${nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()}`
    },
    methods: {
        seeDetail(data) {
            console.log(data)
            this.dialog = true
        }
    },
};
</script>

<style lang="scss" scoped>
.my-class ::v-deep .v-data-table__mobile-row__header {
    min-width: 44px !important;
}

.my-class ::v-deep .v-data-footer__pagination {
    margin: 8px !important;
}

.report-status-select{
    margin-top:22px;
    :v-deep .v-icon{
        font-size:38px !important;
    }
}

.report-status-select .v-icon{
    font-size:38px !important;
}

</style>
