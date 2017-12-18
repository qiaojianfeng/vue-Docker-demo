<!--二级页面卡片-->
<template>
    <div class="active-top-card">
        <div class="box">

            <video controls :poster="curItem.image" :src="curItem.video" v-if="curItem.video"></video>
            <img v-lazy="curItem.image" v-else>
            <div class="outTime" :data-type="curItem.type" v-if="isOutDate === 'unactive'">
                <span>距离活动开始还有：</span>
                <BaseOutTime :targetDate="curItem.begintime" />
            </div>
            <div class="outTime" :data-type="curItem.type" v-if="isOutDate === 'activeing'">
                <span>距离活动结束还有：</span>
                <BaseOutTime :targetDate="curItem.endtime" />
            </div>
            <div class="outTime disabled" :data-type="curItem.type" v-if="isOutDate === 'actived'">
                <span></span>
                活动已结束
                <span></span>
            </div>
        </div>
        <div class="content">
            <h3 class="title dot f36">{{curItem.title}}</h3>
            <p class="price theme-red" v-if="curItem.type ==2 || curItem.type ==4 ||curItem.type ==6||curItem.type ==7">
                {{curItem.ismoney=='N'?curItem.price+'饭票':'&yen;'+curItem.price}}
            </p>
            <!--<p class="sub c999 f24" v-if="curItem.endtime">结束时间：{{curItem.endtime}}</p>-->
            <p class="sub c999 f24">
                <span class="icon-item" :data-type="curItem.type"></span> {{curItem |showTxt}}
            </p>
        </div>
    </div>
</template>
<script>
import BaseOutTime from '../components/BaseOutTime'
export default {
    data() {
        return {
            nowDate: +new Date()
        }
    },
    mounted() {
        setInterval(() => {
            this.nowDate = +new Date();
        }, 2000);
    },
    computed: {
        isOutDate() {
            if (this.curItem.begintime) {
                var startDate = +new Date(this.curItem.begintime.replace(/-/g, '/'));//活动开始时间 
                var endDate = +new Date(this.curItem.endtime.replace(/-/g, '/'));//活动结束时间 
                if (this.nowDate < startDate) {
                    return 'unactive'
                } else if (this.nowDate >= startDate && this.nowDate < endDate) {
                    return 'activeing'
                } else if (this.nowDate >= endDate) {
                    return 'actived'
                }
            }

        }
    },
    props: {
        curItem: {
            type: Object,
            default: {}
        }
    },
    components: {
        BaseOutTime
    },
    filters: {
        showTxt(item) {
            if (item.type == 1 || item.type == 3 || item.type == 5 || item.type == 6 || item.type == 7) {
                return '参与人数：' + item.num;
            } else if (item.type == 2) {
                return '已售数量：' + item.num;
            } else if (item.type == 4) {
                return '已售数量：' + item.num;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../style/css/mixin.scss';

.active-top-card {
    width: 100%;
    height: auto;
    position: relative;
    border-bottom: rem(1) solid #eee;
    .tag {
        position: absolute;
        width: rem(80);
        height: rem(40);
        left: 0;
        top: rem(10);
        background: #fff;
        padding-left: rem(10);
        box-sizing: border-box;
        border-radius: 0 rem(20) rem(20) 0;
        &[data-type="3"] {
            background-color: #ffde00;
        }
        &[data-type="5"] {
            background-color: #ff5857;
            color: #fff;
        }
    }
    .box {
        width: 100%;
        height: rem(370);
        position: relative;
        img,
        video {
            width: 100%;
            height: 100%;
        }
        .outTime {
            position: absolute;
            width: 100%;
            height: rem(60);
            background-color: rgba(0, 0, 0, .5);
            left: 0;
            bottom: 0;
            color: #fff;
            padding: 0 rem(30);
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &[data-type="1"],
            &[data-type="2"],
            &[data-type="4"] {
                display: none;
            }
        }
    }
    .content {
        padding: rem(30) rem(30) rem(24);
        box-sizing: border-box;
        .sub {
            position: relative;
            padding-left: rem(30);
            .icon-item {
                position: absolute;
                content: '';
                left: 0;
                top: rem(7);
                width: rem(24);
                height: rem(24);

                background: url('../assets/vote_number.png') no-repeat;
                background-size: contain;

                &[data-type="1"],
                &[data-type="3"],
                &[data-type="5"],
                &[data-type="6"] {
                    background: url('../assets/vote_number.png') no-repeat;
                    background-size: contain;
                }
            }
        }

        .title {
            height: rem(50);
        }
        .progress {
            width: 100%;
            height: rem(8);
            background-color: #e5e5e5;
            position: relative;
            border-radius: rem(4);
            overflow: hidden;
            margin-top: rem(20);
            margin-bottom: rem(24);
            span {
                position: absolute;
                height: 100%;
                left: 0;
                top: 0;
                background-color: #fa5857;
            }
        }
        p {
            height: rem(45);
        }
    }
}
</style>
