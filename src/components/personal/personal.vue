<template>
  <div class="personal">
    <div class="header">
      <div class="headerInfo">
        <div class="infoLeft">
          <div class="avatar">
            <img src="../../../static/picture/header.png">
          </div><div class="infoCon">
            <div class="name">sam</div>
            <div class="infoDetail">编辑个人资料 <i class="icon-bigright"></i></div>
          </div>
        </div>
        <div class="infoRight">
          <div class="rightItem">
            <span class="num">15556</span>
            <span class="text">帖子</span>
          </div><div class="rightItem">
            <span class="num">567</span>
            <span class="text">关注</span>
          </div><div class="rightItem">
            <span class="num">446</span>
            <span class="text">关注者</span>
          </div>
        </div>
      </div>
      <div class="tabTitle">
        <div class="tabItem tabItemActive" @click="getTab($event, 0)">
          <i class="icon-listfk"></i>
        </div>
        <div class="tabItem" @click="getTab($event, 1)">
          <i class="icon-list"></i>
        </div>
        <div class="tabItem" @click="getTab($event, 2)">
          <i class="icon-flag"></i>
        </div>
      </div>
    </div>
    <div class="tabContentWrapper">
      <keep-alive>
        <compontent :is="viewCompontent" :listsAll="listsAll"></compontent>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import WaterFall1 from 'components/waterfallper1/waterfallper1'
  import WaterFall2 from 'components/waterfallper2/waterfallper2'
  import WaterFall3 from 'components/waterfallper3/waterfallper3'
  import '../../../static/js/hotcss.js'
  HTMLCollection.prototype.toArray = function () {
    return [].slice.call(this);
  };
  export default {
    name: 'personal',
    data () {
      return {
        listsAll: [],
        listsAll1: [],
        listsAll2: [],
        listsAll3: [],
        viewCompontent: 'WaterFall1',
        compontentList: ['WaterFall1', 'WaterFall2', 'WaterFall3']
      };
    },
    methods: {
      getTab (e, num) {
        let thisEl = e.currentTarget
        let thislist = e.currentTarget.parentNode.children
        this.viewCompontent = this.compontentList[num]
        console.log(this.viewCompontent)
        thislist.toArray().forEach((index, item) => {
          index.classList.remove('tabItemActive')
        })
        thisEl.classList.add('tabItemActive')
        switch (num) {
          case 0 :
            this.listsAll = this.listsAll1
          break;
          case 1 :
            this.listsAll = this.listsAll2
          break;
          case 2 :
            this.listsAll = this.listsAll3
          break;
          default:
            this.listsAll = this.listsAll1
        }
      }
    },
    created () {
      this.$ajax.get('/api/home/', {
        // params: {id: this.urlObj.id}
      }).then((response) => {
        this.listsAll1 = response.data.data;
        this.listsAll = this.listsAll1
      }).catch(function (error) {
        console.log(error);
      });
      this.$ajax.get('/api/search/', {
        // params: {id: this.urlObj.id}
      }).then((response) => {
        this.listsAll2 = response.data.data.lists;
      }).catch(function (error) {
        console.log(error);
      });
      this.$ajax.get('/api/home/', {
        // params: {id: this.urlObj.id}
      }).then((response) => {
        this.listsAll3 = response.data.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
    components: {
      WaterFall3,
      WaterFall1,
      WaterFall2
    }
  };
</script>

<style lang="scss">
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
.personal{
  .header{
   .headerInfo{
    background-color: #151515;
    padding: px2rem(40) px2rem(25);
    .infoLeft{
      display: inline-block;
      .avatar{
        display: inline-block;
        width: px2rem(150);
        height: px2rem(150);
        vertical-align: top;
        img{
          width:100%;
        }
      }
      .infoCon{
        display: inline-block;
        padding: px2rem(24) 0 px2rem(24) px2rem(30);
        .name{
          display: block;
          color:#fff;
          font-size:px2rem(47);
          line-height: px2rem(40);
          font-weight: bold;
          margin-bottom: px2rem(20);
        }
        .infoDetail{
          color:#6b6b6b;
          font-size:px2rem(21);
          .icon-bigright  {
            font-size:px2rem(16);
          }
        }
        .icon-bigright:before {
            color: #6b6b6b;
        }
      }
    }
    .infoRight{
      float: right;
      padding: px2rem(24) 0;
      .rightItem{
        text-align: center;
        margin-right: px2rem(30);
        display: inline-block;
        .num{
          font-size:px2rem(38);
          display: block;
          color:#9b9b9b;
          font-weight: bold;
        }
        .text{
          font-size: px2rem(21);
          color:#6b6b6b;
        }
      }
      .rightItem:last-child{
        margin-right: 0;
      }
    }
   }
    .tabTitle{
      display: flex;
      color:#9b9b9b;
      text-align: center;
      background-color: #151515;
      font-size:px2rem(38);
      .tabItem{
        flex: 1;
      }
      i{
        display: inline-block;
        padding: px2rem(20);
      }
      .tabItemActive{
        border-color:#ffd000;
        i{
          border-bottom: px2rem(4) solid #ffd000;
        }
        i:before {
          color:#ffd000;
        }
      }
    }
  }
  .tabContentWrapper{
    background-color: #383838;
    height: 80vh;
  }
}
</style>
