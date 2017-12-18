<template>
    <div class="content-box" v-html="content" v-if="content">
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../style/css/mixin.scss';
.content-box {
    width: 100%;
    box-sizing: border-box;
    padding: rem(30);
    border-bottom: 0.02rem solid #eee;
    img {
        width: 100%;
        height: auto;
    }
}

.content-box>img {
    margin-top: rem(30);
}
</style>

