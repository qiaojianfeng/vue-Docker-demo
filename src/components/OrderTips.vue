<template>
    <div class="tips c999 f24">
        <p>温馨提示</p>
        <p v-html="tipsTxt"></p>
        <p v-if="isOutTime" class="outTime theme-red mt20">剩余付款时间：{{outTime}}</p>
    </div>
</template>
<script>
export default {
    props: {
        tipsTxt: {
            type: String,
            default: '如有疑问请联系客服 小in君，微信：xiaoinjun'
        },
        //订单创建时间
        createTime: {
            default: ''
        },
        //是否使用倒计时
        isOutTime: {
            dafault: false
        }
    },
    data() {
        return {
            //倒计时间
            outTime: ''

        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getOutTime();
        })
    },

    methods: {
        getOutTime() {
            if (!this.createTime) {
                setTimeout(this.getOutTime, 1000);
                return;
            }
            var nowDate = +new Date();//获取当前时间 
            var endDate = +new Date(this.createTime.replace(/-/g, '/')) + (20 * 60 * 1000);//设置截止时间 

            //时间差
            var offsetTime = endDate - nowDate;

            //定义变量 d,h,m,s保存倒计时的时间  
            if (offsetTime >= 0) {
                let m = Math.floor(offsetTime / 1000 / 60 % 60);
                let s = Math.floor(offsetTime / 1000 % 60);
                this.outTime = (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s);
            } else {
                this.$emit('update');
                return
            }
            //递归每秒调用countTime方法，显示动态时间效果  
            setTimeout(this.getOutTime, 1000);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.tips {
    // background-color: #f5f5f5;
    text-align: center;
    box-sizing: border-box;
    padding: rem(150) rem(130) rem(20);
}
</style>
