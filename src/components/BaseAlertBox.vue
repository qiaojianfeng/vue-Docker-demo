<!-- 通用强制提示框
* 使用方法 *
1 => import { mapActions } from 'vuex'
     import BaseAlretBox from '../../components/BaseAlertBox.vue'

2 => methods 中映射vuex中的警示弹窗方法
    ...mapActions({
        alert: 'openAlertBox',
        close: 'closeAlertBox'
    }),
3 => components: {
        BaseAlretBox
    },
4 =>可以调用了
    >激活
    this.alert({
        Title: '确定此操作？',
        CancelTxt: '取消',
        OKTxt: '确定',
        OkFunc: () => {
            //点击确认回调
            console.log('点击确认了');
        }
    }); 
    >关闭
    this.close();
-->

<template>
    <div class="alert-box" @touchmove.prevent v-show="$store.state.isAlertBox">
        <div class="box">
            <p>{{$store.state.alertMsg.Title}}</p>
            <div class="control">
                <span class="cancel" @click.stop="close">{{$store.state.alertMsg.CancelTxt}}</span>
                <span class="ok theme-red" @click.stop="$store.state.alertMsg.OkFunc">{{$store.state.alertMsg.OKTxt}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        //映射vuex中的警示弹窗方法
        ...mapActions({
            close: 'closeAlertBox'
        })
    }

}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.alert-box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: $maskBg;
    user-select: none;
    .box {
        width: rem(580);
        border-radius: rem(10);
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        display: flex;
        flex-direction: column;
        &>p {
            height: rem(200);
            font-size: rem(36);
            padding: rem(20) rem(50);
            line-height: rem(50);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .control {
            display: flex;
            border-top: rem(2) solid #eee;
            span {
                flex: 1;
                height: rem(100);
                line-height: rem(100);
                &:last-child {
                    border-left: rem(2) solid #eee;
                }
                &:active {
                    background-color: #EEE;
                    border-radius: 0 0 rem(10) rem(10);
                }
            }
        }
    }
}
</style>
