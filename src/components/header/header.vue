<template>
  <div class="myheader" @touchmove="dft_prop($event)">
    <div class="return">
      <a href="javascript:history.back();">
        <i class="icon-arrow"></i>
      </a>
    </div>
    <div class="logo">
      <h2>PICTURE</h2>
    </div>
    <div id="fl_right" class="fl_right">
      <div class="camera">
      <input type="file" accept="image/*" capture="camera">
        <a href="javascript:void(0);">
          <i class="icon-photograph"></i>
        </a>
      </div>
      <div class="fabulous">
        <a href="javascript:void(0);">
          <i class="icon-heart"></i>
          <span class="badge">65</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../static/js/hotcss.js'
export default {
  name: 'myheader',
  data () {
    return {
      msg: 'my name is header.vue'
    }
  },
  methods: {
    dft_prop: (e) => { // 禁止在footer上触摸 body的滚动
      e.preventDefault();
    }
  },
  created: function () {
  }
}
</script>

<style lang="scss">
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
  .myheader{
    width:100%;
    height:px2rem(88);
    background-color:#151515;
    color:#fff;
    position: fixed;
    top: 0;
    background: #151515;
    z-index: 9999;
    .return{
      // width:px2rem(120);
      width:20%;
      height:100%;
      // margin:px2rem(10) px2rem(25);
      a{
        display:block;
        width:px2rem(88);
        height:100%;
        line-height: px2rem(88);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
        text-align: center;
        text-decoration: none;
      }
    }
    #fl_right{
      width:20%;
      float:right;
      // margin-right:px2rem(40);
    }
    .logo{
      // width:px2rem(428);
      width:60%;
      height:px2rem(88);
      margin:0 auto;
      text-align:center;
      h2{
        // width:px2rem(428);
        margin:0;
        font-size:px2rem(40.5);
        text-align:center;
        line-height:px2rem(88);
      }
    }
    .camera{
      // width:px2rem(60);
      width:50%;
      height:px2rem(88);
      float:left;
      position:relative;
      input{
        position:absolute;
        opacity:0;
        width:100%;
        height:100%;
        z-index:888;
      }
      a{
        display:block;
        width:px2rem(80);
        height:px2rem(88);
        margin:0 auto;
        line-height: px2rem(88);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
        text-decoration: none;
      }
    }
    .fabulous{
      width:50%;
      height:px2rem(88);
      float:left;
      position: relative;
      z-index: 889;
      a{
        color: #abaaba;
        display:block;
        width:px2rem(80);
        height:px2rem(88);
        margin:0 auto;
        line-height: px2rem(88);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
        position:absolute;
        text-decoration: none;
        .badge{
          position: absolute;
          left: px2rem(36);
          top: px2rem(20);
          width:px2rem(20);
          height:px2rem(20);
          background-color: #fff;
          border-radius: 50%;
          font-size:px2rem(13);
          line-height: px2rem(20);
          text-align: center;
          color:#000;
        }
      }
    }
    >div{
      float:left;
    }
  }

</style>
