<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="pass(selected)"
                >
                    通过选中
                </v-btn>
                <v-btn
                    color="red"
                    dark
                    class="mb-2 ml-4"
                    @click="reject(selected)"
                >
                    拒绝选中
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    @keyup.enter="searchChanged"
                    @click:append="searchChanged"
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field
            ></v-card-title>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="filterData"
                class="elevation-1"
                :items-per-page="15"
                show-select
            >
                <template v-slot:item.option="{ item }">
                    <v-icon small class="mr-2" @click="pass([item])">
                        mdi-checkbox-marked-circle
                    </v-icon>
                    <v-icon small class="mr-2" @click="reject([item])">
                        mdi-cancel
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { getApplicaton, motifiedApplicaton} from "@/api/user.js";
export default {
    name: "majorManage",
    data: () => ({
        data: [],
        headers: [
            { text: "学工号", value: "userNumber", sortable: false },
            { text: "姓名", value: "username", sortable: false },
            {
                text: "转出学院",
                value: "sourceDepartment.name",
                sortable: false,
            },
            { text: "转出专业", value: "sourceMajor.name", sortable: false },
            { text: "转入学院", value: "destDepartment.name", sortable: false },
            { text: "转入专业", value: "destMajor.name", sortable: false },
            { text: "操作", value: "option", sortable: false },
        ],
        search: "",
        selected: [],
        filterData:[],
        
    }),
    computed: {
    },
    mounted() {
        this.getData();
    },
    methods: {
        searchChanged(){
            if (this.search == "") {
                this.filterData=this.data;
                console.log(123123)
            }
            else
                this.filterData= this.data.filter((ele) => {
                    return ele.userNumber.indexOf(this.search)!=-1||ele.username.indexOf(this.search)!=-1
                });
        },
        getData() {
            getApplicaton().then((res) => {
                this.data = res.result;
                this.filterData=res.result;
                this.search=''
            });
        },
        pass(e) {
            let data = { list: [], status: 1 };
            e.forEach((ele) => {
                let temp = {
                    destDepartmentId: ele.destDepartment.id,
                    destMajorId: ele.destMajor.id,
                    userNumber: ele.userNumber,
                };
                data.list.push(temp);
            });
            motifiedApplicaton(data).then((res) => {
                this.$message.success(res.message);
                this.getData();
            });
        },
        reject(e) {
            let data = { list: [], status: 2 };
            e.forEach((ele) => {
                let temp = {
                    destDepartmentId: ele.destDepartment.id,
                    destMajorId: ele.destMajor.id,
                    userNumber: ele.userNumber,
                };
                data.list.push(temp);
            });
            motifiedApplicaton(data).then((res) => {
                this.$message.success(res.message);
                this.getData();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
</style>