import Vue from 'vue'
require('vue-swipe/dist/vue-swipe.css')
import {
  Swipe,
  SwipeItem
} from 'vue-swipe'

import BaseCard from '../../components/BaseCard.vue'
//引入接口

//引入通用分享
import ExtendMethods from '../../lib/commonJS'
export default {
  data() {
    return {
      banners: [],
      itemLists: []
    }
  },
  components: {
    Swipe,
    SwipeItem,
    BaseCard
  },
  mounted() {},
  methods: {

  }

}
