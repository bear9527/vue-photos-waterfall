<template>
  <div class="myfooter" @touchmove="dft_prop($event)">
      <div class="icon-home" :class="{'current':0==now}" v-on:click="tapfooter(0)" data-index="0">
        <router-link :to="{ path: 'home' }" href="javascript:void(0);"></router-link>
      </div>
      <div class="icon-magnifier" :class="{'current':1==now}" v-on:click="tapfooter(1)" data-index="1">
        <router-link :to="{ path: 'search'}"></router-link>
      </div>
      <div class="icon-up-load" :class="{'current':2==now}" v-on:click="tapfooter(2)" data-index="2">
        <router-link :to="{ path: 'upload' }" href="javascript:void(0);"></router-link>
      </div>
      <div class="icon-friends" :class="{'current':3==now}" v-on:click="tapfooter(3)" data-index="3">
        <router-link :to="{ path: 'friend' }" href="javascript:void(0);"></router-link>
      </div>
      <div class="icon-personal-enter" :class="{'current':4==now}" v-on:click="tapfooter(4)" data-index="4">
        <router-link :to="{ path: 'personal' }" href="javascript:void(0);"></router-link>
      </div>
  </div>
</template>

<script>
import '../../../static/js/hotcss.js'
export default {
  name: 'myfooter',
  data () {
    return {
      now: 0
    }
  },
  methods: {
    tapfooter: function (str) {
      this.now = str;
    },
    dft_prop: (e) => { // 禁止在footer上触摸 body的滚动
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss">
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
  .myfooter{
    width: 100%;
    position:fixed;
    bottom:0;
    height:px2rem(115);
    background:#151515;
    z-index:9999;
  }
  .myfooter >div{
    position: relative;
    width:20%;
    height:px2rem(115);
    float:left;
    background: #151515;
    // font-size:1rem;
    line-height: px2rem(115);
    text-align: center;
    border-bottom:px2rem(10) solid #1d1d1d;
  }

  .myfooter >div a{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    margin:0 auto;
    display:block;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
  }
  //tab选中状态
  .current:before {
    color:#ffffff;
  }
</style>
