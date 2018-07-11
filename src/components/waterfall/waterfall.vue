<template>
  <div class="itemWrapper" ref="itemWrapper">
    <div class="list-wrapper home">
      <div class="con-wrapper list-left">
        <div class="item" v-for="listitem in listsA" :key="listitem.id" @click.stop="click_item(listitem.dataIndex)" :data-index="listitem.dataIndex">
          <img class="item-img" :height="listitem.height/1.4" v-lazy="listitem.picUrl">
          <div class="content">
            <div class="content-up">
              <div class="up-wrapper">
                <span class="con-dec" v-text="listitem.description"></span>
                <div class="likeit">
                  <span v-text="listitem.dzs">26</span>
                  <i :class="[ismylike[listitem.ismylike] ? ismylike[listitem.ismylike] : ismylike[0]]" @click.stop="mylikeit($event, listitem.picid)"></i>
                </div>
              </div>
              <a class="linkin" :href="listitem.url">点击进入➜</a>
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
      <div class="con-wrapper list-center">
        <div class="item" v-for="listitem in listsC" :key="listitem.id" @click="click_item(listitem.dataIndex)" :data-index="listitem.dataIndex">
          <img class="item-img" :height="listitem.height/1.4" v-lazy="listitem.picUrl">
          <div class="content">
            <div class="content-up">
              <div class="up-wrapper">
                <span class="con-dec" v-text="listitem.description"></span>
                <div class="likeit">
                  <span v-text="listitem.dzs">26</span>
                  <i :class="[ismylike[listitem.ismylike] ? ismylike[listitem.ismylike] : ismylike[0]]" @click.stop="mylikeit($event, listitem.picid)"></i>
                </div>
              </div>
              <a class="linkin" :href="listitem.url">点击进入➜</a>
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
      <div class="con-wrapper list-right">
        <div class="item" v-for="listitem in listsB" :key="listitem.id" @click="click_item(listitem.dataIndex)" :data-index="listitem.dataIndex">
          <img class="item-img" :height="listitem.height/1.4" v-lazy="listitem.picUrl">
          <div class="content">
            <div class="content-up">
              <div class="up-wrapper">
                <span class="con-dec" v-text="listitem.description"></span>
                <div class="likeit">
                  <span v-text="listitem.dzs">26</span>
                  <i :class="[ismylike[listitem.ismylike] ? ismylike[listitem.ismylike] : ismylike[0]]" @click.stop="mylikeit($event, listitem.picid)"></i>
                </div>
              </div>
              <a class="linkin" :href="listitem.url">点击进入➜</a>
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
      <div class="loading">
        <span v-if="isAllAfter"><img src="../../../static/picture/loading.gif"></span>
        <span class="dixian" v-else>人家也是有底线的呦。。。</span>
      </div>
    </div>
    <div class="loadmore__header" :class="{ load_active: load_active }">
      <span v-text="updata"></span>
    </div>
    <div class="MySwiper-wrapper">
      <MySwiper class="MySwiper" :listsABC="listsABC" :dataIndex="dataIndex" @clickClose="clickClose"></MySwiper>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import MySwiper from 'components/myswiper/myswiper';
  import '../../../static/js/hotcss.js'
  export default {
    name: 'home',
    props: {
      listsAll: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        lists: [],
        listsA: [],
        listsB: [],
        listsC: [],
        listsABC: [],
        dataIndex: 0,
        isAllNum: 0,
        items: 0,
        itemsOld: 0,
        loading: false,
        load_active: false,
        updata: false,
        options: {
            pullDownRefresh: {
              threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
              stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
            },
            pullUpLoad: {
              threshold: 200 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
            },
            // pullDownRefresh: false, //关闭下拉
            // pullUpLoad: false, // 关闭上拉
            click: true,
            probeType: 3,
            startY: 0,
            scrollbar: false
        },
        ismylike: ['icon-heart', 'icon-byg_heart']
      };
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.itemWrapper, this.options);
          console.log('success');
        } else {
          this.scroll.refresh();
          console.log('refresh');
        }
        // 下拉
        this.scroll.on('pullingDown', () => {
          // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
          this.resets();
        })
        // 上拉
        this.scroll.on('pullingUp', (event) => {
          this.listsIsAll();
          // if (this.curPage < this.totalPage) { // 判断是否继续上拉刷新
          //   this.moreData() // 获取数据方法
          // }
        })
      },
      resets () {
        this.lists = [] // 重置数据
        this.items = 0;
        this.itemsOld = 0;
        this.listsA = [];
        this.listsB = [];
        this.listsC = [];
        this.isAllNum = 0;
        this.updata = '正在刷新'
        this.load_active = true;
        this.dataIndex = 0;
        this.setData(); // 获取数据方法
        setTimeout(() => {
          this.load_active = false;
        }, 1000);
        // this.searchCondition.pageNo = 1 // 重置分页数
      },
      pullingDownUp () {
        this.scroll.finishPullDown()
        this.scroll.finishPullUp()
        this.scroll.refresh() // 重新计算元素高度
      },
      listsIsAll () {
        if (JSON.stringify(this.lists) !== JSON.stringify(this.listsAll)) {
          // debugger;
          if (this.isAllNum === this.listsAll.length) {
          // debugger;
            this.updata = '已加载全部';
            this.load_active = true;
            setTimeout(() => {
              this.load_active = false;
            }, 3000);
          } else {
            this.moreData();
          }
        }
      },
      moreData () { // 加载更多数据
        // 加载完页面执行的函数
        let boxA = document.getElementsByClassName('list-left')[0].clientHeight
        let boxB = document.getElementsByClassName('list-right')[0].clientHeight
        let boxC = document.getElementsByClassName('list-center')[0].clientHeight
        let boxBody = document.getElementsByTagName('body')[0].clientWidth
        let that = this;
        this.itemsOld = this.items;
        this.items += 10;
        this.lists = [];
        this.lists = this.listsAll.slice(this.itemsOld, this.items);
        for (let val of this.lists) {
          setTimeout(() => {
            boxA = document.getElementsByClassName('list-left')[0].clientHeight
            boxB = document.getElementsByClassName('list-right')[0].clientHeight
            boxC = document.getElementsByClassName('list-center')[0].clientHeight
            if (boxBody >= 768) { // 判断屏幕超过768的时候三列展示否则两列
              if (boxA <= boxB && boxA <= boxC) {
                that.listsA.push(val)
                that.isAllNum++
              } else if (boxB <= boxA && boxB <= boxC) {
                  that.listsB.push(val)
                  that.isAllNum++
              } else if (boxC <= boxA && boxC <= boxB) {
                  that.listsC.push(val)
                  that.isAllNum++
              } else {
                that.listsA.push(val)
                  that.isAllNum++
              }
            } else {
              if (boxA > boxB) {
                that.listsB.push(val)
                that.isAllNum++
              } else if (boxA < boxB) {
                  that.listsA.push(val)
                  that.isAllNum++
              } else {
                that.listsA.push(val)
                  that.isAllNum++
              }
            }
            this.$nextTick(() => {
              this.updata = '已更新'
                this.pullingDownUp()
                this.scroll.finishPullUp()
                this.scroll.refresh() // 重新计算元素高度
              })
          }, 1000)
        }
      },
      setData () { // 加载数据
        setTimeout(() => {
          this.moreData();
        }, 500);
      },
      mylikeit (e, picid) { // 点击小心心
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
      click_item (picid) { // 点击每个照片弹出swiper
        let _this = document.getElementsByClassName('swiper-container-wrapper')[0]
        this.dataIndex = picid
        _this.style.display = 'block'
        this.scroll.disable()
      },
      clickClose (picid) {
        this.scroll.enable()
      }
    },
    computed: {
      isAllAfter () { // 是否全部加载完 加载完显示底线
        return this.isAllNum !== this.listsAll.length
      }
    },
    mounted () {
      this._initScroll(); // 切换路由刷新一下bs
      window.onresize = () => {
        this.resets();
      };
    },
    created () {
      this.$nextTick(() => {
        this._initScroll();
        this.setData();
      });
    },
    watch: {
      lists: {
        handler () {
          setTimeout(() => {
            this.listsABC = this.listsABC.concat(this.listsA)
            this.listsABC = this.listsABC.concat(this.listsC)
            this.listsABC = this.listsABC.concat(this.listsB)
          }, 1000);
        },
        // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
        immediate: true
      }
    },
    components: {
      MySwiper
    }
  }
</script>

<style lang="scss" scoped>
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
.itemWrapper {
  // height: 84vh;
  height: 100%;
  overflow: hidden;
  // background-color: #383838;
}
.home{
  display: flex;
  padding: px2rem(20);
  .con-wrapper{
    flex:1;
    flex-wrap: nowrap;
    height: max-content;
    padding-bottom: px2rem(200);
  }
  .list-left{
    margin-right: px2rem(20);
    position: relative;
  }
  .item {
    position: relative;
    padding-bottom: 0;
    border-radius: px2rem(8);
    margin-bottom: px2rem(20);
    background-color: #eee;
    border-color:#383838;
    min-height: px2rem(260);
    .item-img{
      width: 100%;
      display: block;
      border-radius: px2rem(8);
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
      border-radius: px2rem(8);
      .content-up{
        .up-wrapper{
          display: flex;
          .con-dec{
            flex:1;
            font-size:px2rem(18);
            display: -webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:4;
            overflow: hidden;
            background-image: -webkit-linear-gradient(top,rgba(0,0,0,0) 10%,rgba(0,0,0,0) 100%);
            color:#aaaaaa;
          }
          .likeit{
            display: flex;
            flex:0 0 px2rem(50);
            height: px2rem(24);
            font-size:px2rem(16);
            color:#989898;
            span{
              flex:1;
              font-size:px2rem(13);
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
          font-size:px2rem(18);
          color:#8d8d8d;
          text-decoration: none;
          margin: px2rem(15) 0;
          display: inline-block;
        }
      }
      .content-down{
        .headerimg{
          width:px2rem(58);
          height:px2rem(58);
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
          font-size: px2rem(19);
          .self-dec{
            display:block;
            color: #919191;
          }
          .name{
            display: block;
            color:#4f4f4f;
          }
        }
      }
    }
  }
}
.loading{
  width: 100%;
  position: absolute;
  bottom: px2rem(120);
  left: 0;
  text-align: center;
  img{
    width: 16%;
  }
  .dixian{
    color:#ccc;
    font-size:px2rem(26)
  }
}
.loadmore__header{
  transition: all 0.2s cubic-bezier(0.5,0,0.5,1) 0s;
  -webkit-transition: all 0.2s cubic-bezier(0.5,0,0.5,1) 0s;
  width: 100%;
  height: px2rem(50);
  background-color: #ff76008a;
  text-align: center;
  font-size:px2rem(18);
  line-height: 50px;
  position: absolute;
  top: px2rem(88);
  opacity: 0;
  color:#fff;
}
.load_active{
  opacity: 1;
}
//MySwiper
.MySwiper-wrapper{
  // width: 100vw;
  // height: 100vh;
  // position: fixed;
  // top: px2rem(0);
  // left: px2rem(0);
  // z-index: 9999;
  // padding: px2rem(100) px2rem(20);
  // background-color: rgba(0,0,0,0.5);
  .MySwiper{
    // width: 90%;
    // height: 80vh;
    // margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .list-left{
    margin-right: px2rem(10)!important;
  }
  .list-center{
    display: block;
    margin-right: px2rem(10)!important;
  }
}
@media screen and (max-width: 768px) {
  // .list-left{
  //   margin-right: px2rem(20)!important;
  // }
  .list-center{
    display: none;
    margin-right: px2rem(10)!important;
  }
}

</style>
