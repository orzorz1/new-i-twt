<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title class="text-center py-6">
                疫情填报
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-tabs
                v-model="tab"
                class="px-4"
                background-color="transparent"
                color="#00A0E8"
                grow
            >
                <v-tab
                    v-for="item in items"
                    :key="item"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card
                        color="basil"
                        flat
                    >
                        <v-card-text>123</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card
                        color="basil"
                        flat
                    >
                        <v-card-text>234</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "report",
    data: () => ({
        tab: null,
        items: [
            '信息填报', '填报记录',
        ],
    }),
}
</script>

<style scoped lang="scss">

</style>