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
                        ></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "account",
    data: () => ({
      WeChat:false
    }),
};
</script>

<style>
</style>