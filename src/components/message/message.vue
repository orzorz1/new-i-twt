<template>
    <transition name="message-fade">
        <div class="message" :class="type" role="alert" v-show="visible">
            <p class="message__content">
                {{ message }}
            </p>
        </div>
    </transition>
</template>

<script>
export default {
    name: "message",

    data() {
        return {
            visible: false,
            message: "",
            closed: false,
            color: "",
            type: "",
        };
    },

    watch: {
        closed(val) {
            if (val) {
                this.visible = false;
                this.$el.addEventListener("transitionend", this.destroyElement);
            }
        },
    },

    methods: {
        destroyElement() {
            this.$el.removeEventListener("transitionend", this.destroyElement);
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },

        close() {
            this.closed = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.message {
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.3s, transform 0.4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
}

.message--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
}

.message--error {
    background-color: #ffccff;
    border-color: #ffccff;
    color: #cc0033;
}

.message p {
    margin: 0;
}

.message__content {
    padding: 0;
    font-size: 14px;
    line-height: 1;
}

.message-fade-enter,
.message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -50px);
}
</style>