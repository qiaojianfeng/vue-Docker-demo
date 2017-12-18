<template>
    <div class="tools">
        <!--回到首页-->
        <router-link to="/toHomes" tag="div" class="toHome" v-if="isShowToHome">回到首页</router-link>
        <!--回到顶部-->
        <div class="toTop" @click.stop="toTop" v-show="isShowToTop && isShow"></div>
    </div>
</template>
<script>
import Vue from 'vue'
　　export default {
    props: {
        isShowToHome: {
            type: Boolean,
            default: true
        },
        isShowToTop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    created() {
        setInterval(() => {
            if (document.body.scrollTop > document.documentElement.clientHeight / 2) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        }, 500)

    },
    methods: {
        //回到顶部
        toTop() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    }
}
</script>
<style scoped lang="scss">
@import '../style/css/mixin.scss';

.tools {
    // width: rem(160);
    // height: rem(210);
    // position: fixed;
    // right: 0;
    // bottom: rem(190);
    &>div {
        display: block;
        background-color: rgba(0, 0, 0, .3);
        font-size: rem(22);
        color: #fff;
        position: fixed;
        z-index: 9999;

        &.toTop {
            bottom: rem(190);
            right: rem(30);
            width: rem(50);
            height: rem(50);
            background: rgba(0, 0, 0, .3) url('../assets/pop_top.png') no-repeat;
            background-size: 70%;
            background-position: center center;
            border-radius: 50%;
            padding: rem(10);
        }
        &.toHome {
            // top: 0;
            bottom: rem(400);
            right: 0;
            width: rem(150);
            height: rem(50);
            padding: 0 rem(12);
            text-align: right;
            box-sizing: border-box;
            line-height: rem(50);
            border-radius: rem(25) 0 0 rem(25);
            &::before {
                content: '';
                position: absolute;
                width: rem(30);
                height: rem(30);
                top: 50%;
                transform: translateY(-50%);
                left: rem(12);
                background: url('../assets/pop_home.png') no-repeat;
                background-size: contain;
            }
        }
    }
}
</style>