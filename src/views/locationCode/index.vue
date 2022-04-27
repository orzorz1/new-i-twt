<template>
    <div class="container" style="background-color: white;">
        <div
            class="container"
            :style="`background-image: linear-gradient(${mainColor[info.area]},rgba(0,0,0,0))`"
        >
            <v-btn
                color="white"
                @click="$router.push('/home')"
                elevation="0"
                class="back-btn"
                absolute
                small
                fab
            >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div class="out">
                请向志愿者出示您的号码牌
                <br />Please show your number to the volunteer
            </div>
            <div class="line"></div>
            <div class="loc">
                {{ info.area }}
                <br />
                {{ info.building }}
                <br />
                <div style="border-bottom: 2px solid #fff;">{{ info.room }}</div>
                <div
                    style="font-size: 20px;line-height: 100%;margin-top: 16px;"
                >{{ `${info.major} ${info.realname}` }}</div>
            </div>
            <div class="foot">
                {{ time }}
                <br />请在核酸检测时出示，请勿截图
            </div>
        </div>
    </div>
</template>

<script>
/**
 * @Date: 2022/4/6
 */


export default {
    name: "locationCode",
    data: () => ({
        info: JSON.parse(sessionStorage.getItem('basicInfo')),
        mainColor: {
            '格园': "#FF3D3F",
            '诚园': "#FF9449",
            '正园': "#FFC130",
            '修园': "#73D13D",
            '齐园': "#40A9FF",
            '平园': "#AE45DB",
            '治园': "#6A56D3",
            '青园': "#000000",
        },
        time:0
    }),
    created() {
        this.time=this.getCurrentTime()
        setInterval(() => {
            this.time=this.getCurrentTime()
        }, 1000);
    },
    methods: {
        repair(i) {
            if (i >= 0 && i <= 9) {
                return "0" + i;
            } else {
                return i;
            }
        },
        getCurrentTime() {
            var date = new Date();//当前时间
            var year = date.getFullYear() //返回指定日期的年份
            var month = this.repair(date.getMonth() + 1);//月
            var day = this.repair(date.getDate());//日
            var hour = this.repair(date.getHours());//时
            var minute = this.repair(date.getMinutes());//分
            var second = this.repair(date.getSeconds());//秒

            //当前时间
            var curTime = year + "-" + month + "-" + day
                + " " + hour + ":" + minute + ":" + second;
            return curTime;
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}
.back-btn {
    position: absolute;
    top: 5.5vh;
    left: 10vw;
}
.out {
    position: absolute;
    top: 14vh;
    left: 10vw;
    font-size: 13px;
    color: white;
}
.line {
    position: absolute;
    top: 19vh;
    left: 10vw;
    width: 50vw;
    height: 2px;
    background-color: white;
}
.loc {
    font-weight: 900;
    font-size: 100px;
    color: white;
    position: absolute;
    top: 20vh;
    left: 10vw;
    line-height: 120%;
}
.foot{
    font-size: 13px;
    position: absolute;
    bottom: 10vh;
    left:10vw;
    color: white;
}
</style>
