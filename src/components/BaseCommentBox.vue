<template>
    <div class="comment-box" ref="commentBox">

        <div class="text-box">
            <div>
                <input type="text" @focus="showKey" v-model="content" class="f26" placeholder="写评论">
            </div>
        </div>
        <button class="post f26" @click="addComment">发送</button>
    </div>
</template>
<script>
import AjaxComment from '../services/comments/comments'
import Vue from 'vue'
export default {
    data() {
        return {
            content: ''
        }
    },
    props: {
        actid: {
            default: 0
        },
        bus: {
            type: Object
        }
    },
    methods: {
        //添加评论
        addComment() {
            if (!this.content) {
                Vue.toast('评论不能为空！');
                return;
            }
            AjaxComment.addComments(res => {
                //初始化评论框
                this.content = '';
                if (res.code == 0) {
                    Vue.toast('评论+1' + (res.data.result > 0 ? '，饭票+' + res.data.result : ''));
                    //通知评论列表刷新
                    this.bus.$emit('updataComments');
                } else {
                    Vue.toast(res.msg);
                }
            }, { actid: this.actid, content: this.content })
        },
        showKey() {
            //解决输入框获取焦点软键盘过高bug
            setTimeout(() => {
                this.$refs.commentBox.scrollIntoView(false);
            }, 800);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.comment-box {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    height: rem(100);
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    display: flex;
    padding: rem(15)rem(30);
    box-sizing: border-box;
    align-items: center;
    transform: translate3d(0, 0, 0);
    .text-box {
        position: relative;
        &>div {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            input[type="text"] {
                width: 100%;
                height: 100%;
                padding-left: rem(30);
            }
        }
        background-color: #eee;
        flex-shrink: 1;
        flex-grow: 1;
        margin-right: rem(30);
        height: 100%;
        border-radius: rem(5);
    }
    .post {
        flex-shrink: 0;
        width: rem(130);
        height: rem(55);
        background-color: #fa5857;
        color: #fff;
        border: 0;
        border-radius: rem(5);
        &:active {
            background-color: rgba(250, 88, 87, .88);
        }
    }
}
</style>
