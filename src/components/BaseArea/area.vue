<style lang="scss" scoped>
@import '../../style/css/mixin.scss';
.ProvCityBoxBg {
    background: rgba(0, 0, 0, .35);
    z-index: 200;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.ProvCityBox {
    position: fixed;
    z-index: 300;
    background: #fff;
    bottom: 0;
    left: 0;
    right: 0;
}

//表头标题
.ProvCityHeader {
    background-color: #eee;
    height: rem(100);
    line-height: rem(100);
    overflow: hidden;

    font-size: rem(30);
    display: flex;
    justify-content: space-between;
    .ProvCityHeaderCancle,
    .ProvCityHeaderConfirm {
        padding: 0 rem(30);
        color: #ff5657;
        font-size: rem(30);
    }
}




.ProvCityContent {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    height: rem(400);
    display: flex;
    text-align: center;
    .ProvCityContentList {
        flex: 1;
        ul {
            transition: all .3s ease;
            .province_dragging,
            .city_dragging,
            .area_dragging {
                transition: none;
            }
            li {
                line-height: rem(100);
                height: rem(100);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: rem(28);
                &.current {
                    font-weight: bold;
                }
                &.node1 {
                    opacity: .7;
                }
                &.node2 {
                    opacity: .5;
                }
                &.node3 {
                    opacity: .3;
                }
            }
        }
    }
}



.ProvCitySelectedTop,
.ProvCitySelectedBottom {
    width: 100%;
    border: none;
    border-top: rem(2) solid #eee;
    position: absolute;
    bottom: rem(300);
    margin: 0;
    height: 0;
}

.ProvCitySelectedBottom {
    width: 100%;
    border: none;
    border-top: rem(2) solid #eee;
    position: absolute;
    bottom: rem(200);
    margin: 0;
    height: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}

.select-enter-active,
.select-leave-active {
    transition: all .3s linear;
}

.select-enter,
.select-leave-active {
    transform: translateY(rem(500));
}
</style>
<template>
    <div class="ProvCityBoxWarp">
        <transition name="fade" mode="out-in">
            <div class="ProvCityBoxBg" v-show="show" @click="closeArea" @touchmove="_stopDef" @mousewheel="_stopDef"></div>
        </transition>
        <transition name="select">
            <div class="ProvCityBox" v-show="show" @mousewheel="_stopDef">
                <div class="ProvCityHeader">
                    <div class="ProvCityHeaderCancle" @click="cancelSelect">{{cancel}}</div>
                    {{title}}
                    <div class="ProvCityHeaderConfirm" @click="submit">{{confirm}}</div>
                </div>
                <div class="ProvCityContent">
                    <div class="ProvCityContentList">
                        <ul ref:province-list :class="{'province_dragging': provinceState.dragging}" @touchstart="_onTouchStart('province', $event)" @mousedown="_onTouchStart('province', $event)" :style="{'transform' : 'translate3d(0,' + provinceState.translateY + 'px, 0)'}">

                            <li ref="liHeight"></li>
                            <li v-for="(item, index) in provinceState.data" :key="index" :class="{'current': item.code === provinceState.selectedId,'node1':  Math.abs(index - provinceState.index) == 1,'node2':  Math.abs(index - provinceState.index) == 2,'node3':  Math.abs(index - provinceState.index) >= 3}">{{item.name}}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="ProvCityContentList">
                        <ul ref:city-list :class="{'city_dragging': cityState.dragging}" @touchstart="_onTouchStart('city', $event)" @mousedown="_onTouchStart('city', $event)" :style="{'transform' : 'translate3d(0,' + cityState.translateY + 'px, 0)'}">

                            <li></li>
                            <li v-for="(item, index) in cityState.data" :key="index" :class="{'current': item.code === cityState.selectedId,'node1':  Math.abs(index - cityState.index) == 1,'node2':  Math.abs(index - cityState.index) == 2,'node3':  Math.abs(index - cityState.index) >= 3}">{{item.name}}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="ProvCityContentList">
                        <ul ref:area-list :class="{'area_dragging': areaState.dragging}" @touchstart="_onTouchStart('area', $event)" @mousedown="_onTouchStart('area', $event)" :style="{'transform' : 'translate3d(0,' + areaState.translateY + 'px, 0)'}">

                            <li></li>
                            <li v-for="(item, index) in areaState.data" :key="index" :class="{'current': item.code === areaState.selectedId,'node1':  Math.abs(index - areaState.index) == 1,'node2':  Math.abs(index - areaState.index) == 2,'node3':  Math.abs(index - areaState.index) >= 3}">{{item.name}}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <hr class="ProvCitySelectedTop">
                <hr class="ProvCitySelectedBottom">
            </div>
        </transition>
    </div>
</template>
<script>
import { province, city, area } from './city-data'
export default {
    data: function() {
        return {
            show: this.propsShow,
            result: this.propsResult,
            target: '',
            provinceState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            cityState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            areaState: {
                data: null,
                selectedId: null,
                index: 0,
                startPos: null,
                translateY: 0,
                startTranslateY: 0,
                dragging: false
            },
            delta: 0,
            slideEls: null
        }
    },
    mounted: function() {
        this.initData();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
    },
    methods: {
        initData() {
            this.provinceState.data = province;
            this.provinceState.selectedId = 110000; //北京市  省
            this.cityState.selectedId = 110100;     //市辖区  市
            this.areaState.selectedId = 110101;     //东城区  区
            this.filterCity();
            this.filterArea();
        },
        closeArea() {
            this.show = false;
            this.areaShow();
        },
        submit() {
            this.result = {
                'province': this.provinceState.data[this.provinceState.index],
                'city': this.cityState.data[this.cityState.index],
                'area': this.areaState.data[this.areaState.index]
            };
            this.show = false;
            this.areaShow();
        },
        cancelSelect() {
            this.show = false;
            this.areaShow();
        },
        filterCity() {
            this.cityState.data = city.filter((item, index) => {
                return item.parentId === this.provinceState.selectedId;
            })
            this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code;
            this.cityState.translateY = 0;
            this.cityState.index = 0;
        },
        filterArea() {
            this.areaState.data = area.filter((item, index) => {
                return item.parentId === this.cityState.selectedId;
            })
            this.areaState.selectedId = this.areaState.data[0] && this.areaState.data[0].code;
            this.areaState.translateY = 0;
            this.areaState.index = 0;
        },
        getSelectedData(index) {
            let target = this.target;
            let thisData = this[target + 'State'];
            thisData.selectedId = thisData.data[index].code;
            if (target === 'province') {
                this.filterCity();
                this.filterArea();
            }
            if (target === 'city') {
                this.filterArea();
            }
        },
        setPage() {
            let target = this.target;
            let thisData = this[target + 'State'];
            let clientHeight = this.slideEls[0] ? this.slideEls[0]['clientHeight'] : this.$refs.liHeight.clientHeight;

            let total = thisData.data.length;
            let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1));
            if (goPage > 0) {
                goPage = 0;
            }
            goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1);
            let index = Math.abs(goPage);
            thisData.index = index;
            this.getSelectedData(index);
            thisData.translateY = goPage * clientHeight;
        },
        _getTouchPos(e) {
            return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY'];
        },
        _getElem(e) {
            return Array.from(e.currentTarget.children).slice(3, -3);
        },
        _onTouchStart(target, e) {
            let thisData = this[target + 'State'];
            this.target = target;
            this.slideEls = this._getElem(e);
            this.delta = 0;
            thisData.startPos = this._getTouchPos(e);
            thisData.startTranslateY = thisData.translateY;
            thisData.dragging = true;
            document.addEventListener('touchmove', this._onTouchMove, false);
            document.addEventListener('touchend', this._onTouchEnd, false);
            document.addEventListener('mousemove', this._onTouchMove, false);
            document.addEventListener('mouseup', this._onTouchEnd, false);
        },
        _onTouchMove(e) {
            let target = this.target;
            let thisData = this[target + 'State'];
            this.delta = this._getTouchPos(e) - thisData.startPos;
            thisData.translateY = thisData.startTranslateY + this.delta;
            if (Math.abs(this.delta) > 0) {
                e.preventDefault();
            }
        },
        _onTouchEnd(e) {
            let target = this.target;
            let thisData = this[target + 'State'];
            thisData.dragging = false;
            this.setPage();
            document.removeEventListener('touchmove', this._onTouchMove);
            document.removeEventListener('touchend', this._onTouchEnd);
            document.removeEventListener('mousemove', this._onTouchMove);
            document.removeEventListener('mouseup', this._onTouchEnd);
        },
        _stopDef(e) {
            e.preventDefault()
        }
    },
    watch: {
        propsShow: function(newVal) {
            this.show = newVal
        },
        show: function(newVal) {
            this.$emit('result', newVal, this.result)
        }
    },
    props: {
        'propsResult': {
            type: Object,
            default: null
        },
        'propsShow': {
            type: Boolean,
            default: false
        },
        'title': {
            type: String,
            default: '请选择'
        },
        'confirm': {
            type: String,
            default: '确定'
        },
        'cancel': {
            type: String,
            default: '取消'
        },
        'areaShow': {
            default: function() {

            }
        }
    }
}
</script>