<template>
    <div class="user-bar">
        <img class="avatar" v-lazy="avatar?avatar:'http://static.tianyinculture.com/fanyin/avatar/20171117/201711171604091555.jpg'" data-size="80-80">
        <span class="nickname f26">{{nickname?nickname:'天音互动'}}</span>
    </div>
</template>
<script>
export default {
    props: {
        nickname: {
            type: String,
            default: ""
        },
        avatar: {
            type: String,
            default: '天音互动'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.user-bar {
    width: 100%;
    height: rem(140);
    box-sizing: border-box;
    padding: rem(20) rem(30);
    display: flex;
    align-items: center;
    border-bottom: 0.02rem solid #eee;
    .avatar {
        width: rem(80);
        height: rem(80);
        border-radius: 50%;
        border: rem(1) solid #eee;
    }
    .nickname {
        margin-left: rem(20);
        font-weight: 400;
        line-height: rem(45);
        height: rem(45);
        position: relative; // &::after {
        //     content: '';
        //     position: absolute;
        //     left: 0;
        //     bottom: 0;
        //     width: rem(30);
        //     height: rem(2);
        //     background-color: #000;
        // }
    }
}
</style>

