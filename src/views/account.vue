<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title>账号关联</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <v-row justify="space-between">
                    <v-col cols="auto" align-self="center">
                        <div class="subtitle-1">微信</div>
                    </v-col>
                    <v-col cols="auto">
                        <v-switch
                            v-model="WeChat"
                            disabled
                        ></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-title color="text-red">账号注销</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12" align-self="center">
                        <v-btn
                            block
                            color="error"
                            dark
                            @click="showDeleteDialog=true"
                        >
                            注销账号
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="showDeleteDialog"
            width="500"
        >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    注销账号须知
                </v-card-title>
                <v-card-text>
                    请注意！！！！本功能为注销账号，账号相关数据将会被全部清除，无法恢复，请慎重注销账号！如无必要请勿使用本功能。
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error"
                        text
                        @click="handleDelete()"
                    >
                        注销账号
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="showDeleteDialog = false"
                    >
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {logOff} from '@/api/user'
import {removeToken} from '@/utils/auth'

export default {
    name: "account",
    data: () => ({
        WeChat: false,
        showDeleteDialog: false
    }),
    methods: {
        handleDelete() {
            logOff().then(
                () => {
                    removeToken()
                    this.$router.push({path: '/login'})
                }
            ).catch(res => {
                    this.$message.error(res.message)
                }
            )
        }
    }
}
;
</script>
