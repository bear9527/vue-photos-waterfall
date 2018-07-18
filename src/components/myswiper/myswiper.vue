<template>
  <div class="swiper-container-wrapper" @touchmove="dft_prop($event)">
      <span class="close" @click="closeit">×</span>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide item" v-for="listitem in listsABC" :key="listitem.id">
              <img class="item-img" :height="listitem.height/1.4" v-lazy="listitem.picUrl">
              <div class="content">
                <div class="content-up">
                  <div class="up-wrapper">
                    <span class="con-dec" v-text="listitem.description"></span>
                    <div class="likeit">
                      <span v-text="listitem.dzs">26</span>
                      <i :class="[ismylike[listitem.ismylike] ? ismylike[listitem.ismylike] : ismylike[0]]" @click="mylikeit($event, listitem.picid)"></i>
                    </div>
                  </div>
                  <a class="linkin" :href="listitem.url" @click.stop="clickpicdetail(listitem, $event)">点击进入➜</a>
                </div>
                <div class="content-down">
                  <div class="headerimg">
                    <img :src="listitem.header_img">
                  </div>
                  <div class="personinfo">
                    <span class="self-dec" v-text="listitem.my_dec">一个人在这儿</span>
                    <span class="name" v-text="listitem.name">Name</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="icon-arrow icon-arrow-prev"></div>
        <div class="icon-arrow-next icon-arrow"></div>
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
      </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import '../../../static/js/hotcss.js'
  export default {
    name: 'home',
    props: {
      listsABC: {
        type: Array,
        default: () => {
          return []
        }
      },
      dataIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        ismylike: ['icon-heart', 'icon-byg_heart'],
        mySwiper: null
      };
    },
    methods: {
      mylikeit (e, picid) {
        if (e.target.className === 'icon-heart') { // 1 喜欢  0取消喜欢
          e.target.className = 'icon-byg_heart'
          e.target.previousElementSibling.innerHTML++
          this.$emit('clickLikeIt', picid, 1)
        } else {
          e.target.className = 'icon-heart'
          e.target.previousElementSibling.innerHTML--
          this.$emit('clickLikeIt', picid, 0)
        }
      },
      closeit () {
        let _this = document.getElementsByClassName('swiper-container-wrapper')[0]
        this.$emit('clickClose')
        _this.style.display = 'none'
      },
      dft_prop: (e) => { // 禁止在footer上触摸 body的滚动
        e.preventDefault();
      },
      clickpicdetail (pic, event) { // 点击点击进入
        if (!event._constructed) {
          return;
        }
        this.$emit('clickpicdetailpar', pic, event); // 把点击当前的数据传给父组件 之后父组件把数据传给图片详情组件
      }
    },
    computed: {
      isAllAfter () {
        return this.isAllNum !== this.listsAll.length
      }
    },
    mounted () {
      /* eslint-disable no-new */
      this.mySwiper = new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.icon-arrow-next', // 下一页
          prevEl: '.icon-arrow-prev' // 上一页
        },
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true // 修改swiper的父元素时，自动初始化swiper
      })
    },
    created () {
      this.$nextTick(() => {
      });
    },
    watch: {
      listsABC: {
        handler () {
          setTimeout(() => {
            /* eslint-disable no-new */
            new Swiper('.swiper-container', {
            })
          }, 1000);
          this.listsABC.forEach((index, item) => {
            index.dataIndex = item // 每个slide加 index 实现slideTo
          })
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      },
      dataIndex () {
         this.mySwiper.slideTo(this.dataIndex, 0, false); // 切换到第一个slide，速度为1秒
      }
    }
  }
</script>

<style lang="scss" scoped>
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
.swiper-container-wrapper{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: px2rem(0);
  left: px2rem(0);
  z-index: 9999;
  padding: px2rem(100) px2rem(20);
  background-color: rgba(0,0,0,0.5);
  display: none;
  .swiper-container {
    height: 83%;
    width: 90%;
    overflow: hidden;
    background-color: #383838;
    margin: 0 px2rem(20);
    border-radius: px2rem(20);
    .item {
      position: relative;
      padding-bottom: 0;
      border-radius: px2rem(20);
      margin-bottom: px2rem(20);
      background-color: #eee;
      border-color:#383838;
      min-height: px2rem(260);
      .item-img{
        width: 100%;
        height: 100%;
        display: block;
        border-radius: px2rem(20);
        min-height: px2rem(280);
        max-height: 100%;
      }
      .content{
        position: absolute;
        bottom: 0;
        padding: px2rem(18);
        background-image: -webkit-linear-gradient(top,rgba(0,0,0,0.08) 10%,rgba(0,0,0,1) 100%);
        //background-image: -webkit-linear-gradient(top,rgba(0,0,0,0.08) 10%, black 100%);
        //background-image: -moz-linear-gradient(top,rgba(255,255,255,0.08) 10%,rgba(0,0,0,1) 100%);
        //background-image: -o-linear-gradient(top,rgba(0,0,0,0.08) 10%,rgba(0,0,0,1) 100%);
        // background-image: linear-gradient(top,rgba(0,0,0,0.08) 10%rgba(0,0,0,1) 100%);
        border-radius: px2rem(20);
        .content-up{
          .up-wrapper{
            display: flex;
            .con-dec{
              flex:1;
              font-size:px2rem(26);
              display: -webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:4;
              overflow: hidden;
              background-image: -webkit-linear-gradient(top,rgba(0,0,0,0) 10%,rgba(0,0,0,0) 100%);
              color:#aaaaaa;
              line-height: px2rem(32);
            }
            .likeit{
              display: flex;
              flex:0 0 px2rem(60);
              height: px2rem(24);
              font-size:px2rem(22);
              color:#989898;
              padding-left:px2rem(90);
              span{
                flex:1;
                font-size:px2rem(20);
              }
              i{
                flex:1;
              }
              .icon-byg_heart{
                color: #eaeaea;
              }
            }
          }
          .linkin{
            font-size:px2rem(20);
            color:#8d8d8d;
            text-decoration: none;
            margin: px2rem(15) 0;
            display: inline-block;
          }
        }
        .content-down{
          .headerimg{
            width:px2rem(80);
            height:px2rem(80);
            border-radius: 50%;
            background-color: #fff;
            display: inline-block;
            vertical-align: top;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .personinfo{
            display: inline-block;
            margin-left: px2rem(14);
            font-size: px2rem(22);
            line-height: px2rem(36);
            .self-dec{
              display:block;
              color: #919191;
              font-size: px2rem(22);
            }
            .name{
              display: block;
              color:#4f4f4f;
              font-size: px2rem(26);
            }
          }
        }
      }
    }
    .icon-arrow-next, .icon-arrow-prev {
      position: absolute;
      top: 50%;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      cursor: pointer;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
      text-shadow: 0 0 black;
    }
    .icon-arrow-prev{
      left: px2rem(10);
    }
    .icon-arrow-next{
      right: px2rem(10);
      transform: rotate(180deg)
    }
  }
    .close{
      display: inline-block;
      position: absolute;
      top: px2rem(30);
      right: px2rem(60);
      color: #ccc;
      padding: px2rem(30);
      padding-top: 0;
      font-size:px2rem(70);
      font-weight: bold;
    }
}
</style>
