<template>
    <v-card>
        <v-row justify="center">
            <v-col cols="12" sm="6">
                <v-textarea
                    label="学工号"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    v-model="num"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="6">
                <v-btn @click="handle()">重置为666666</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import {rePWD} from '@/api/user'
export default {
    name: "rePWD",
    data: () => ({
        num: "",
    }),
    methods:{
        handle(){
            rePWD({userNumber:this.num}).then(res=>{
                this.$message.success(res.message)
            })
        }
    }
};
</script>

<style>
</style>