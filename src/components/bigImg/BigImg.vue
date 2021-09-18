<template>
    <!-- 过渡动画 -->
        <div class="img-view" @click="bigImg">
            <!-- 遮罩层 -->
            <div class="img-layer" ></div>
            <div class="img">
                <img :src="imgSrc">
            </div>
        </div>
</template>
<script>
export default {
    props: ['imgSrc'],//接受图片地址
    methods: {
        bigImg() {
            // 发送事件
            this.$emit('clickit')
        }
    }
}
</script>
<style scoped>


/* bigimg */
.img-view {
    cursor: pointer;
    z-index:2000;
    left: 0;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
}

/*遮罩层样式*/
.img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
}

/*不限制图片大小，实现居中*/
 img {
    max-height: 80%;
    display: block;
    z-index: 1000;
}

 .img{
     position: absolute;
     width:100vw;
     height:100vh;
     display: flex;
     flex-direction: row;
     align-items:center;
     justify-content:center;
 }
</style>
