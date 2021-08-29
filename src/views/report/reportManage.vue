<template>
    <div class="my-class">
        <v-card>
            <v-card-title class="my-card-title">
                <v-row>
                    <v-col cols="12" class="ml-1">
                        {{ date }} 120/150人已填报
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
                        ></v-text-field
                        >
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
                style="min-height: 400px;"
                v-if="!isPhone"
                v-model="selected"
                :headers="headers"
                :items="filterData"
                class="elevation-0 mx-3"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
            >
                <template v-slot:top>

                </template>
                <template v-slot:item.option="{ item }">
                    <v-btn color="#50AD56" dark @click="seeDetail(item)">码</v-btn>
                </template>
            </v-data-table>
            <v-simple-table v-else height="300px">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th v-for="(item,index) in mobileHeaders" :key="index" class="text-left">
                            {{ item.text }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item,index) in filterData.slice((page-1)*itemsPerPage,page*itemsPerPage)"
                        :key="index"
                    >
                        <td>{{ item.userNumber }}</td>
                        <td>{{ item.username }}</td>
                        <td><v-btn color="#50AD56" dark @click="seeDetail(item)">详细信息</v-btn></td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-pagination
                class="pb-3"
                v-model="page"
                :length="pageCount"
            ></v-pagination>
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
        page:1,
        itemsPerPage: 2,
        toDates: '',
        fullWidth: document.documentElement.clientWidth,
        selectStatus: '未填报',
        items: ['已填报', '未填报', '全部'],
        dialog: false,
        datePickerMenu: false,
        date: '',
        data: [],
        mobileHeaders: [
            {text: "学号", value: "userNumber", sortable: false},
            {text: "姓名", value: "username", sortable: false},
            {text: "", value: "option", sortable: false},
        ],
        headers: [
            {text: "学号", value: "userNumber", sortable: false},
            {text: "姓名", value: "username", sortable: false},
            {text: "填报状态", value: "status", sortable: false, filterable: false,},
            {text: "体温", value: "temperature", sortable: false},
            {text: "定位", value: "location", sortable: false},
            {text: "", value: "option", sortable: false},
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
                userNumber: '3019244362',
                username: '高树韬',
                status: '已填报',
                temperature: '37℃'
            },
            {
                userNumber: '3019244363',
                username: '高树韬',
                status: '已填报',
                temperature: '37℃'
            },
            {
                userNumber: '3019244364',
                username: '高树韬',
                status: '未填报',
                temperature: '37℃'
            }
        ],

    }),
    watch:{
        filterData:{
            handler:function(){
                this.page=1
            }
        }
    },
    computed: {
        pageCount: function() {
            return Math.ceil(this.filterData.length/this.itemsPerPage)
        },
        filterData: function () {
            let tempData=this.rawData.filter((item) => {
                return item.username.indexOf(this.search)!==-1 || item.userNumber.indexOf(this.search)!==-1
            })
            if (this.selectStatus === '全部') {
                return tempData
            } else {
                return tempData.filter((item) => {
                    return item.status === this.selectStatus
                })
            }
        },
        isPhone: function () {
            return this.fullWidth <= 600
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
        let nowDate = new Date()
        this.date = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1}-${nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()}`
        this.toDate = this.date
    },
    methods: {
        seeDetail(data) {
            console.log(data)
            this.dialog = true
        },
        handleResize() {
            this.fullWidth = document.documentElement.clientWidth
        },
        allowedDates(val) {
            let vaArr = val.split('-')
            let toArr = this.toDate.split('-')
            let flag = true
            for (let i = 0; i < 3; i++) {
                if (parseInt(vaArr[i]) > parseInt(toArr[i])) {
                    flag = false
                }
            }
            return flag
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

.report-status-select {
    margin-top: 22px;
}

.report-status-select .v-icon {
    font-size: 38px !important;
}

.my-card-title{
    display: flex;
    flex-direction: column;
    align-items:start;
    padding-bottom:0px;
}

</style>
