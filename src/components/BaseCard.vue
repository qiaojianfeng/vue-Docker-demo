<!--基础卡片-->
<template>
    <div class="card">
        <router-link :to="item|setTargetRpute" tag="div" class="item" v-for="(item,i) in itemLists" :key="i">
            <span class="tag f24" :data-type="item.type">{{item.type|transfromTagName}}</span>
            <div class="box" v-lazy:background-image="item.image" data-size="690-370"></div>
            <div class="content">
                <h3 class="title dot f36">{{item.title}}</h3>
                <p class="price theme-red" v-if="item.type ==2 || item.type ==4">
                    {{item.ismoney =='N'?item.price+'饭票':'&yen;'+item.price}}
                </p>
                <!--应援文字-->
                <p class="price theme-red" v-if="item.type == 6||item.type == 7">
                    <span class="fl">{{item.ismoney === 'Y'?'&yen;'+item.income_amount/100:item.income_amount+'饭票'}}
                        <i class="c999">/ {{item.ismoney === 'Y'?'&yen;'+item.aimed_amount/100:item.aimed_amount+'饭票'}}</i>
                    </span>
                    <span class="fr c999">
                        {{item.income_amount==0?'0':Math.ceil((item.income_amount/item.aimed_amount)*100)}}%
                    </span>
                </p>
                <!--应援进度条-->
                <div class="progress" v-if="item.type == 6 ||item.type == 7">
                    <span :style="{'width':Math.ceil((item.income_amount/item.aimed_amount)*100)+'%'}"></span>
                </div>
                <p class="sub c999 f24 flex" v-if="item.endtime || item.num">
                    <span>
                        <span class="icon-item" :data-type="item.type"></span>
                        {{item |showTxt}}</span>
                    <span v-if="item.type == 3 || item.type == 5|| item.type == 6 ||item.type == 7">结束时间：{{item.endtime}}</span>
                </p>
            </div>
        </router-link>

    </div>
</template>
<script>
//活动类型，1:话题 2:商品 3:投票 4:福利 5:抽奖 6:应援
export default {
    data() {
        return {

        }
    },


    props: {
        itemLists: {
            type: Array,
            default: []
        }
    },
    filters: {
        transfromTagName(type) {
            switch (type) {
                case '1':
                    return '话题';
                case '2':
                    return '商品';
                case '3':
                    return '投票';
                case '4':
                    return '福利';
                case '5':
                    return '抽奖';
                case '6':
                    return '应援';
                case '7':
                    return '夺宝';
                default:
                    return '话题';
            }
        },
        showTxt(item) {
            if (item.type == 1 || item.type == 3 || item.type == 5 || item.type == 6 || item.type == 7) {
                return '参与人数：' + item.num;
            } else if (item.type == 2) {
                return '已售数量：' + item.num;
            } else if (item.type == 4) {
                return '已售数量：' + item.num;
            }
        },
        setTargetRpute(item) {
            switch (item.type) {
                case '1':
                    return {
                        path: 'activeShow',
                        query: {
                            actid: item.actid
                        }
                    };
                case '2':
                    return {
                        path: 'activeShow',
                        query: {
                            actid: item.actid
                        }
                    };
                case '3':
                    return {
                        path: 'activeVote',
                        query: {
                            actid: item.actid
                        }
                    };
                case '4':
                    return {
                        path: 'boon',
                        query: {
                            actid: item.actid
                        }
                    };
                case '5':
                    return {
                        path: 'lotto',
                        query: {
                            actid: item.actid
                        }
                    };
                case '6':
                case '7':
                    return {
                        path: 'supportShow',
                        query: {
                            actid: item.actid
                        }
                    }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.card {
    width: 100%;
    box-sizing: border-box;
    padding: 0 rem(30);
    .item {
        width: 100%;
        height: auto;
        position: relative;
        margin-bottom: rem(40);
        box-shadow: 0 10px 10px rgba(0, 0, 0, .1);
        .tag {
            position: absolute;
            width: rem(80);
            height: rem(40);
            left: rem(-1);
            top: rem(10);
            background: #f6f6f6;
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
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center top;
        }
        .content {
            padding: rem(30);
            box-sizing: border-box;
            .title {
                height: rem(50);
            }
            .flex {
                display: flex;
                justify-content: space-between;
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
        }
    }
}
</style>
