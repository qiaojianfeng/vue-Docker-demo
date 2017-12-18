<template>
    <div class="out-time-box">
        <p>
            <span>{{outTimes.day}}</span>天
            <span>{{outTimes.hours}}</span>时
            <span>{{outTimes.minutes}}</span>分
            <span>{{outTimes.seconds}}</span>秒
        </p>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    data() {
        return {
            outTimes: {
                day: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
    },
    props: {
        targetDate: {
            type: String,
            default: '2017/11/25'
        }
    },
    created() {
        this.outTime();
    },
    methods: {
        outTime() {
            var nowDate = +new Date();//获取当前时间 
            var endDate = +new Date(this.targetDate.replace(/-/g, '/'));//设置截止时间 
            //时间差  
            var offsetTime = Math.abs(endDate - nowDate);

            //定义变量 d,h,m,s保存倒计时的时间  
            if (offsetTime >= 0) {
                Vue.set(this.outTimes, 'day', Math.floor(offsetTime / 1000 / 60 / 60 / 24))
                // this.outTimes.day = Math.floor(offsetTime / 1000 / 60 / 60 / 24);
                this.outTimes.hours = Math.floor(offsetTime / 1000 / 60 / 60 % 24);
                this.outTimes.minutes = Math.floor(offsetTime / 1000 / 60 % 60);
                this.outTimes.seconds = Math.floor(offsetTime / 1000 % 60);
            } else {
                return
            }
            //递归每秒调用countTime方法，显示动态时间效果  
            setTimeout(this.outTime, 1000);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../style/css/mixin.scss';

.out-time-box>p {
    display: flex;
    align-items: center;
    span {
        width: rem(34);
        height: rem(34);
        border-radius: rem(6);
        background-color: #fff;
        color: #ff2d2d;
        font-size: rem(24);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: rem(5);
        margin-left: rem(5);
    }
}
</style>
