<template>
    <div class="comment-list">
        <h3 class="name">
            <span>共{{comments.length}}条评论</span>
        </h3>
        <template v-if="comments.length>0">
            <ul v-for="(item,i) in comments" :key="i">
                <li>
                    <img v-lazy="item.avatar" data-size="80-80">
                    <div class="con plr20">
                        <h5 class="f26">{{item.nickname}}</h5>
                        <p class="date c999 f20">{{item.addtime|formatDate}}</p>
                        <p class="txt f28">{{item.content}}</p>
                    </div>
                </li>
            </ul>
        </template>

        <!--无评论提示-->
        <div class="none f24 c888" v-else>
            {{tipTxtLists[parseInt(Math.random() * 4)]}}
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AjaxComments from '../services/comments/comments.js'
import ExtendMethod from '../lib/commonJS'
export default {
    data() {
        return {
            comments: [],
            newActid: this.actid ? this.actid : this.$route.query.actid,
            tipTxtLists: ['就差你的神评论', '抢沙发攒人品', '期待你的牛评', '据说第一个评论的人最美']
        }
    },
    props: {
        actid: {
            default: ''
        },
        bus: {
            type: Object
        }
    },
    created() {
        this.getcomments();
        //监听评论成功
        this.bus.$on('updataComments', () => {
            this.getcomments();
            console.log('成功评论后触发更新。')
        })
    },
    methods: {
        getcomments() {
            AjaxComments.getComments(res => {
                if (res.code == 0) {
                    this.comments = res.data.comments;
                } else {
                    Vue.toast(res.msg);
                }
            }, { actid: this.newActid, offset: '' })
        }
    },
    filters: {
        formatDate: ExtendMethod.formatDate
    }
}
</script>
<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.comment-list {
    .name {
        @include centerTitle;
    }
    .none {
        height: rem(300);
        text-align: center;
        line-height: rem(200);
    }
    ul:nth-child(2){
        margin-top: rem(-20);
    }
    ul li {
        display: flex;
        box-sizing: border-box;
        padding-left: rem(30);
        padding-top: rem(25);
        img {
            flex-shrink: 0;
            width: rem(80);
            height: rem(80);
            border-radius: 50%;
        }
        .con {
            flex-grow: 1;
            h5 {
                color: #666;
                font-weight: 400;
            }
            padding-bottom: rem(30);
            border-bottom: 1px solid #eee;
            .txt {
                word-break: break-all;
                white-space: normal;
                margin-top: rem(10);
            }
        }
    }
}
</style>
