 <!--投票分享提示组件-->
<template>
    <div class="share" @touchmove.prevent v-show="$store.state.isShareShow" @click="$store.commit('TOGGLE_SHARE')">
        <div class="box" @click.stop>
            <img :src="userinfo.avatar" class="avatar100">
            <p class="txt">
                <strong>{{userinfo.nickname}}</strong>正在参加{{userinfo.title}}活动
                <p>
                    <strong class="theme-red">快来帮TA投票吧</strong>
                </p>
            </p>
            </p>
            <div class="count">
                <dl>
                    <dt>当前排名</dt>
                    <dd>第
                        <b class="num f36">{{userinfo.rank}}</b>名</dd>
                </dl>

                <dl>
                    <dt>当前票数</dt>
                    <dd>
                        <b class="num f36">{{userinfo.votes}}</b>票
                    </dd>
                </dl>
            </div>

            <div class="description">
                <div>
                    <p>扫码关注in-music</p>
                    <p>点击底部菜单栏“投票为TA助力”</p>
                </div>
                <img src="../assets/in-music.png">
            </div>

            <span class="close" @click.stop="$store.commit('TOGGLE_SHARE')"></span>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        userinfo: {
            type: Object,
            default: {
                avatar: '/static/img/one.ff57e4e.png',
                nickname: '',
                title: '',
                rank: '',
                votes: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.share {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: $maskBg;
    font-size: rem(28);

    text-align: center;
    font-weight: 300;
    color: #333;
    .txt {
        width: rem(400);
        line-height: rem(50);
        &>strong {
            font-size: rem(30);
        }
    }
    .count {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: rem(70) 0 rem(20);
        dl {
            flex: 1;
        }
    }
    .description {
        width: 100%;
        display: flex;
        padding: rem(30);
        box-sizing: border-box;
        &>img {
            width: rem(150);
            height: rem(150);
            flex-shrink: 0;
            flex-grow: 0;
        }
        &>div {
            text-align: left;
            font-size: rem(24);
            flex-shrink: 1;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    .box {
        width: rem(600);
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: rem(20);
        padding-top: rem(60);
        .close {
            position: absolute;
            left: 50%;
            bottom: rem(-200);
            width: rem(80);
            height: rem(80);
            border-radius: 50%;
            border: rem(3) solid #fff;
            transform: rotate(45deg) translateX(-50%);
            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: rem(50);
                height: rem(3);
                background-color: #fff;
            }
            &::after {
                transform: rotate(-90deg) translate(-50%, -50%);
                transform-origin: 0;
            }
        }
    }
}
</style>

