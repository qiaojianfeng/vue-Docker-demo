<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view" @click.stop="closeView" @touchmove.prevent>
            <!-- 遮罩层 -->
            <div class="img-layer"></div>
            <div class="img">
                <!--内容页轮播图-->
                <swipe :auto="0" class="product-swipe" :defaultIndex="defaultIndex">
                    <template v-for="(item,i) in imgSrcArr">
                        <swipe-item class="picItem" :key="i">
                            <img v-lazy="item.url">
                        </swipe-item>
                    </template>
                </swipe>
            </div>
        </div>
    </transition>
</template>
<script>
require('vue-swipe/dist/vue-swipe.css')
import {
    // Swipe,
    SwipeItem
} from 'vue-swipe'

import Swipe from './BaseSwipe.vue'
　　export default {
    props: ['imgSrcArr', 'defaultIndex'],//接受图片地址
    methods: {
        closeView() {
            this.$emit('closeView');
        }
    },
    components: {
        Swipe,
        SwipeItem
    }
　　}
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    transform: scale(0, 0);
}

.fade-enter,
.fade-leave-active {
    transform: scale(100%, 100%);
}

.img-view {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    overflow: hidden;
}

.img-view .img-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.96);
}

.img-view .img {
    height: 100%;
    img {
        max-width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>