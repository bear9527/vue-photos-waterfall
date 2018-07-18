<template>
  <transition name="move">
    <div v-if="picobj" v-show="showFlag" class="picturedetails" ref="picdetail">
      <div class="header">
        <i class="left icon-arrow" @click="hide"></i>
        <i class="right icon-share"></i>
      </div>
      <div class="img-headre">
        <div class="img-bottom">
          <div class="fabulous">
            <ul>
              <li><img src="../../../static/picture/class_bg2.png"></li>
              <li><img src="../../../static/picture/class_bg2.png"></li>
              <li><img src="../../../static/picture/class_bg2.png"></li>
              <li><img src="../../../static/picture/class_bg2.png"></li>
              <li><img src="../../../static/picture/class_bg2.png"></li>
              <li><img src="../../../static/picture/class_bg2.png"></li>
              <li><img src="../../../static/picture/class_bg2.png"></li>
            </ul>
            <div class="text-a">
              <a href="javascript:void(0);">赞 <span v-text="picobj.dzs">36</span> > </a>
            </div>
          </div>
          <hr>
          <div class="edit">
            <i class="icon-input"></i><input class="input" placeholder="@  喜欢就要说出来">
          </div>
        </div>
        <img class="bg-img" :src="picobj.picUrl">
      </div>
      <div class="info">
        <div class="info-main">
          <div class="main-left">
            <h1 class="title" v-text="picobj.title">图片标题法国巴黎大楼</h1>
            <p class="text" v-text="picobj.description">美丽的景色，每个人都能看到，但是又有谁，能够将它储存下来。这是我在法国巴黎看到的美丽景色，特意分享给大家看一下。美丽的景色，每个人都能看到，但是又有谁，能够将它储存下来。</p>
          </div>
          <div class="main-right">
            <ul>
              <li><i class="icon-flag active"></i></li>
              <li><i class="icon-heart"></i></li>
              <li><i class="icon-news"></i></li>
              <li>90</li>
            </ul>
          </div>
        </div>
        <div class="picList" ref="itemWrapper">
          <ul ref="itemUl">
            <li v-for="item in imgs" :key="item.id"> <img :src="item"></li>
          </ul>
        </div>
        <div class="type">
          <h2>分类推荐</h2>
          <div class="itemWrapper">
            <div class="typeItem">
              <img src="../../../static/picture/typeTj1.png">
              <span>人物</span>
            </div>
            <div class="typeItem">
              <img src="../../../static/picture/typeTj2.png">
              <span>动 物</span>
            </div>
            <div class="typeItem">
              <img src="../../../static/picture/typeTj3.png">
              <span>景 色</span>
            </div>
            <div class="typeItem">
              <img src="../../../static/picture/typeTj4.png">
              <span>植 物</span>
            </div>
            <div class="typeItem">
              <img src="../../../static/picture/typeTj5.png">
              <span>家 居</span>
            </div>
          </div>
        </div>
        <div class="fallWrapper">
          <h2>相关图片</h2>
          <WaterFall2 v-if="listsAll" :listsAll="listsAll"></WaterFall2>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import WaterFall2 from 'components/waterfall/waterfall'
  import BScroll from 'better-scroll'
  import '../../../static/js/hotcss.js'
  import picturedetails from 'components/picturedetails/picturedetails'
  export default {
    props: {
      picobj: {
        type: Object,
        default: null
      }
    },
    name: '',
    data () {
      return {
        showFlag: false,
        imgs: ['../../../static/picture/hori_1.png', '../../../static/picture/hori_2.png', '../../../static/picture/hori_3.png', '../../../static/picture/hori_4.png', '../../../static/picture/hori_3.png'],
        listsAll: []
      };
    },
    methods: {
      _initItemWrapper () {
        if (!this.itemWrapper) {
          this.$nextTick(() => {
            let picWidth = 160;
            let margin = 20;
            let width = (picWidth + margin) * this.imgs.length - margin;
              this.$refs.itemUl.style.width = width + 'px';
              this.itemWrapper = new BScroll(this.$refs.itemWrapper, {
                click: true,
                scrollX: true,
                eventPassthrough: 'vertical'
              });
          });
        } else {
          this.itemWrapper.refresh() // 重新计算元素宽度
        }
      },
      getData () {
        this.$ajax.get('/api/home/', {
        }).then((response) => {
          this.listsAll = response.data.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      show () {
        this.showFlag = true;
        this._initItemWrapper(); // 图片详情页显示的时候再初始化bscroll
      },
      hide () {
        this.showFlag = false;
      }
    },
    created () {
      // this._initItemWrapper();
      this.getData();
    },
    components: {
      WaterFall2,
      picturedetails
    },
    activated: function () {
      // this._initItemWrapper();
    }
  };
</script>

<style lang="scss" scoped>
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
.picturedetails{
  width:100%;
  position: absolute;
  top:0;
  left:0;
  z-index: 88888;
  overflow: hidden;
  &.move-enter-active, &.move-leave-active{ // 从右面消失
    transition: all 0.2s linear;
    transform:translate3d(0,0,0);
  }
  &.move-enter, &.move-leave{
    transition: all 0.2s linear;
    opacity: 0;
    transform: translate3d(100%,0,0);
  }
  .header{
    padding:0 px2rem(24);
    height: px2rem(88);
    background-color: #151515;
    .left{
      float: left;
      line-height: px2rem(88);
    }
    .right{
      float: right;
      line-height: px2rem(88);
    }
  }
  .img-headre{
    position: relative;
    top:px2rem(0);
    width:100%;
    height: 0;
    // padding-top: 150%;
    padding-top: 92vh;
    .bg-img{
      position: absolute;
      top:px2rem(0);
      width:100%;
      height: 100%;
    }
    .img-bottom{
      width: 100%;
      position: absolute;
      padding-top: px2rem(100);
      bottom:0;
      z-index: 88889;
      background-image: -webkit-linear-gradient(top,rgba(0,0,0,0.08) 10%,rgba(0,0,0,1) 100%);
      //background-image: -webkit-linear-gradient(top,rgba(0,0,0,0.08) 10%, black 100%);
      //background-image: -moz-linear-gradient(top,rgba(255,255,255,0.08) 10%,rgba(0,0,0,1) 100%);
      //background-image: -o-linear-gradient(top,rgba(0,0,0,0.08) 10%,rgba(0,0,0,1) 100%);
      // background-image: linear-gradient(top,rgba(0,0,0,0.08) 10%rgba(0,0,0,1) 100%);
      hr{
        margin: 0 px2rem(20);
        background-color: #151515;
        color: #151515;
      }
      .fabulous{
        width: 100%;
        height: px2rem(60);
        margin-bottom: px2rem(30);
        padding: 0 px2rem(40);
        ul{
          width: 70%;
          height: 100%;
          float: left;
          li{
            width: px2rem(60);
            height: px2rem(60);
            display: inline-block;
            border-radius: 50%;
            background-color: #ccc;
            margin-left: px2rem(-20);
            img{
            //  display: inline-block;
              border-radius: 50%;
              width: 100%;
              height: 100%;
            }
          }
        }
        .text-a{
          width: 20%;
          float: right;
          font-size: px2rem(26);
          line-height: px2rem(50);
        }
      }
      .edit{
        width: 100%;
        margin: px2rem(20) 0;
        .input{
          width: 94%;
          display: block;
          margin: 0 auto;
          background-color: transparent;
          padding-left:px2rem(100);
          font-size: px2rem(26);
          color:#6b6b6b;
          line-height: px2rem(50);
        }
        .icon-input{
          position: absolute;
          left: px2rem(30);
          color:#fff;
        }
      }
    }
  }
  .info{
    width: 100%;
    background-color: #383838;
    .info-main{
      display: flex;
      padding: px2rem(70) px2rem(24) px2rem(50) px2rem(24);
      .main-left{
        flex:1;
        .title{
          font-size: px2rem(40);
          color:#fff;
          font-weight: bold;
          line-height: px2rem(80);
        }
        .text{
          font-size: px2rem(28);
          color:#d3d3d3;
          line-height: px2rem(40);
        }
      }
      .main-right{
        flex:1;
        color:#b2b2b2;
        font-size: px2rem(36);
          line-height: px2rem(90);
        ul{
            float: right;
          li{
            display: inline-block;
            padding:0 px2rem(10);
          }
          .active{
            color:#fff;
          }
        }
      }
    }
    .picList{
      // width:89%;
      padding: 0 px2rem(24);
      padding-bottom: px2rem(60);
      overflow: hidden;
      white-space: nowrap;
      margin: 0 px2rem(16);
      ul{
        height: px2rem(160);
        li{
          width: px2rem(160);
          height: px2rem(160);
          border-radius: px2rem(20);
          display: inline-block;
          margin-left: px2rem(20);
          img{
            width: 100%;
            height: 100%;
            border-radius: px2rem(20);
          }
        }
        li:first-child{
          margin-left: 0;
        }
      }
    }
    .type{
      border-radius: px2rem(30);
      background-color: #fff;
      margin: 0 px2rem(20);
      padding: 0 px2rem(40);
      h2{
        font-size: px2rem(30);
        padding-top: px2rem(40);
      }
      .itemWrapper{
        position: relative;
        flex-direction: column;
        justify-content: space-between;
        margin: px2rem(40) 0;
        height:px2rem(1200);
        .typeItem{
          width:px2rem(290);
          display: inline-block;
          background-color: #ccc;
          border-radius: px2rem(30);
          position: absolute;
          img{
            width: 100%;
            height: 100%;
            border-radius: px2rem(30);
          }
          span{
            display: block;
            margin-top: px2rem(-60);
            font-size: px2rem(24);
            color:#fff;
            padding-left: px2rem(24);
          }
        }
        .typeItem:nth-child(1){
          height:px2rem(530);
          top: px2rem(0);
          left:0;
        }
        .typeItem:nth-child(2){
          height:px2rem(396);
          top: px2rem(0);
          right:0;
        }
        .typeItem:nth-child(3){
          height:px2rem(544);
          top: px2rem(592);
          left:0;
        }
        .typeItem:nth-child(4){
          height:px2rem(400);
          top: px2rem(452);
          right:0;
        }
        .typeItem:nth-child(5){
          height:px2rem(231);
          top: px2rem(910);
          right:0;
        }
      }
    }
    .fallWrapper{
      height: 80vh;
      color:#9c9c9c;
      h2{
        font-size: px2rem(30);
        padding: 0 px2rem(20);
        margin:px2rem(20) 0;
      }

    }
  }
}
</style>
