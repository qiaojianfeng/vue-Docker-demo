 <!--排行榜列表组件-->
<template>
    <ul class="rank-list">
        <li v-for="(item,i) in rankList" :key="i">
            <span class="index">{{i+1}}</span>
            <div class="detail">
                <div>
                    <img class="avatar80" v-lazy="item.avatar" data-size="80-80">
                    <span class="name f30">{{item.nickname}}</span>

                </div>
                <span class="count theme-red f24">{{item.count}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        rankList: {
            type: Array,
            default: [{
                avatar: '',
                nickname: '',
                count: '200.00'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.rank-list {
    padding: rem(30);
    li {
        display: flex;
        height: rem(130);
        align-items: center;
        .index {
            width: rem(50);
            flex-grow: 0;
        }
        .detail {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            &>div {
                display: flex;
                justify-content: center;
                .name {
                    margin-left: rem(30);
                }
            }
        }
    }
}
</style>

