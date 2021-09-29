<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title class="text-center py-6">
                健康填报
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
                        <v-card-text>
                            <v-row justify="center">
                                <v-col cols="8" sm="4" md="3" class="left body-1">
                                    <v-text-field
                                        prepend-icon="mdi-thermometer-low"
                                        dense
                                        label="体温"
                                        autocomplete="off"
                                        v-model="healthData.temperature"
                                        append-icon="mdi-temperature-celsius"
                                        :rules="[(v) => !!v || '不能为空',
                                        (v) => /((^3[4-9])(\.\d+)?|^(4[0-4])(\.0+)?)$/.test(v) || '格式错误']"
                                        ref="temperature"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="8"
                                       sm="4"
                                       md="3"
                                       offset-md="3"
                                       offset-sm="2"
                                       class="left body-1">
                                    <v-select
                                        prepend-icon="mdi-map-outline"
                                        dense
                                        :items="locationStatus"
                                        v-model="curStatus"
                                        label="当前状态"
                                        :rules="[(v) => !!v || '不能为空']"
                                        ref="locationStatus"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="8" sm="4" md="3" class="left body-1">
                                    <v-file-input
                                        dense
                                        accept="image/*"
                                        label="上传健康码"
                                        :rules="[(v) => !!v || '不能为空']"
                                        v-model="healthData.healthPic"
                                        ref="healthPic"
                                    ></v-file-input>
                                </v-col>
                                <v-col cols="8"
                                       sm="4"
                                       md="3"
                                       offset-md="3"
                                       offset-sm="2"
                                       class="left body-1">
                                    <v-file-input
                                        dense
                                        hight="20px"
                                        accept="image/*"
                                        v-model="healthData.pathPic"
                                        :rules="[(v) => !!v || '不能为空']"
                                        label="上传行程码"
                                        ref="pathPic"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="8" sm="4" md="3" class="left body-1">
                                    <v-btn color="#00A0E8" class="mt-2" @click="getLocation" :loading="getLocationLoading" outlined block>
                                        <v-icon class="mr-1">mdi-map-marker-radius</v-icon>
                                        添加定位
                                    </v-btn>
                                </v-col>
                                <v-col cols="8"
                                       sm="4"
                                       md="3"
                                       offset-md="3"
                                       offset-sm="2"
                                       class="left body-1">
                                    <v-textarea
                                        v-show="addressFlag"
                                        :disabled="locationEdit"
                                        auto-grow
                                        rows="1"
                                        label="定位地址"
                                        autocomplete="off"
                                        v-model="address"
                                        :rules="[(v) => !!v || '不能为空']"
                                        ref="address"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row justify="center">
                                <v-col cols="10" sm="4">
                                    <v-btn block color="primary" :loading="submitLoading" @click="submit">
                                        确认提交信息
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card
                        class="ma-4"
                        v-for="(result,index) in historyData"
                        :key="index"
                    >
                        <v-card-text>
                            <div>
                                {{ result.uploadAt.split('T')[0] + '  ' + locationStatus[result.curStatus] + ' ' + result.temperature + '℃' }}
                            </div>
                            <p class="text-h7 text--primary">
                                {{ result.address }}
                            </p>
                            <div class="two-status">
                                <div class="green-pill">健康码</div>
                                <div class="green-pill mr-1">行程码</div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <div id="map-container" style="display: none"></div>
    </v-container>
</template>

<script>
import {postHealthInfo, getHealthInfo} from '@/api/user.js'

export default {
    name: "report",
    data: () => ({
        addressFlag:false,
        locationEdit:true,
        getLocationLoading:false,
        submitLoading:false,
        tab: null,
        curStatus: '',
        items: [
            '信息填报', '填报记录',
        ],
        locationStatus: ["在家", "在校", "在游"],
        address: '',
        healthData: {
            temperature: '',
            healthPic: null,
            pathPic: null,

        },
        historyData: []
    }),
    mounted() {
        this.getHistoryData()
    },
    methods: {
        getHistoryData() {
            getHealthInfo().then((res) => {
                this.historyData = res.result
            })
        },
        submit() {
            let flag = true
            for (let ref in this.$refs) {
                flag &&= this.$refs[ref].validate(true)
            }
            if (flag) {
                this.submitLoading=true
                let formData = new FormData()
                formData.append('provinceName', this.healthData.provinceName)
                formData.append('cityName', this.healthData.cityName)
                formData.append('regionName', this.healthData.regionName)
                formData.append('address', this.healthData.address)
                formData.append('longitude', this.healthData.longitude)
                formData.append('latitude', this.healthData.latitude)
                formData.append('healthCodeScreenshot', this.healthData.healthPic)
                formData.append('travelCodeScreenshot', this.healthData.pathPic)
                formData.append('curStatus', this.locationStatus.indexOf(this.curStatus))
                formData.append('temperature', this.healthData.temperature)
                postHealthInfo(formData).then(() => {
                    this.submitLoading=false
                    this.$message.success('填报成功')
                    this.getHistoryData()
                    this.tab=1
                })
            } else {
                this.$message.error('请填写全部信息')
            }
        },
        getLocation() {
            this.getLocationLoading=true
            const self = this
            var AMap = window.AMap
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                })
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete);
                AMap.event.addListener(geolocation, 'error', onError);
                function onComplete(data) {
                    self.getLocationLoading=false
                    if (data.formattedAddress) {
                        self.healthData.provinceName = data.addressComponent.province
                        self.healthData.cityName = data.addressComponent.city
                        self.healthData.regionName = data.addressComponent.district
                        self.healthData.longitude = data.position.lng
                        self.healthData.latitude = data.position.lat
                        self.healthData.address = data.formattedAddress
                        self.address = data.formattedAddress
                        self.addressFlag=true
                    } else {
                        self.$message.error('定位失败，无法获取详细定位,请手动填写')
                        self.addressFlag=true
                        self.locationEdit=false
                    }
                }

                function onError() {
                    self.addressFlag=true
                    self.getLocationLoading=false
                    self.$message.error('定位失败错误,请开启浏览器定位权限,或者请手动填写')
                }
            })
        },

    }
}
</script>

<style scoped lang="scss">
.left {
    text-align: left;
}

.two-status {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.green-pill {
    height: 32px;
    line-height: 32px;
    width: 64px;
    text-align: center;
    color: white;
    background-color: #7A975F;
    border-radius: 16px;
}
</style>
