<template>
  <div class="search-wrapper">
    <div class="search-header">
      <div class="search-input-wrapper">
        <input id="search-input" class="search-input" name="" placeholder="输入关键字"/>
        <i class="icon-magnifier" @click="input_search($event)"></i>
      </div>
      <div class="hotfont">
        <h1 class="title">热门关键字</h1>
        <ul>
          <li v-for="item in buttons" :key="item.id" @touchstart="isActive($event)" @touchend="clearActive($event)" @click="input_search($event,item)">{{item}}</li>
        </ul>
      </div>
      <div class="typesearch">
        <h1 class="title">分类搜索</h1>
        <ul>
          <li v-for="item in searchbuttons" :key="item.id" :style="{backgroundImage:`url(${item.bgurl})`}" @touchstart="isActive($event)" @touchend="clearActive($event)"><span @click="input_search($event,item.text)">{{item.text}}</span></li>
        </ul>
      </div>
    </div>
    <div class="WaterFall-wrapper">
      <h1 class="title" v-if="listsAll">搜索结果</h1>
      <WaterFall v-if="listsAll" :listsAll="listsAll" @clickLikeIt="clickLikeIt"></WaterFall>
      <span class="isnull">暂无数据</span>
    </div>
  </div>
</template>

<script>
  import WaterFall from 'components/waterfall/waterfall'
  import {urlParse} from 'common/js/util'
  import '../../../static/js/hotcss.js'
  export default {
    name: 'search',
    data () {
      return {
        urlObj: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        listsAll: null,
        searchs: {},
        buttons: [],
        searchbuttons: []
      }
    },
    methods: {
      getData () {
        this.$ajax.get('/api/search/', {
          params: {id: this.urlObj.id}
        }).then((response) => {
          this.searchs = response.data.data;
          // this.listsAll = this.searchs.lists;
          this.buttons = this.searchs.button;
          this.searchbuttons = this.searchs.searchbuttons;
        }).catch(function (error) {
          console.log(error);
        });
      },
      clickLikeIt (picid, islike) {
        console.log(picid, islike)
          // this.$ajax.post('/api/home/', {
          //   picid: picid,
          //   islike: islike,
          //   myid: this.urlObj.id
          // })
          // .then(function (response) {
          //  console.log(response);
          // })
          // .catch(function (error) {
          //  console.log(error);
          // });
      },
      isActive (e) {
        e.currentTarget.classList = 'active'
      },
      clearActive (e) {
        e.currentTarget.classList = ''
      },
      input_search (e, val, num) {
        let arglen = arguments.length
        if (arglen === 1) {
          let str = e.target.previousElementSibling.value
          console.log(str)
          if (!str) {
            alert('请输入要搜索的关键字！')
          } else {
            this.$ajax.get('/api/search/', {
            params: {search: str}
            }).then((response) => {
              this.listsAll = response.data.data.lists;
            }).catch(function (error) {
              console.log(error);
            });
          }
        } else if (arglen === 2) {
          let str = e.currentTarget.innerHTML
          if (!str) {
            alert('请输入要搜索的关键字！')
          } else {
            this.$ajax.get('/api/search/', {
            params: {search: str}
            }).then((response) => {
              this.listsAll = response.data.data.lists;
            }).catch(function (error) {
              console.log(error);
            });
          }
        }
      }
    },
    mounted () {
    },
    created () {
      this.getData();
    },
    components: {
      WaterFall
    }
  }
</script>

<style lang="scss" scoped>
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
.WaterFall-wrapper{
  height: 80vh;
  background-color: rgba(0,0,0,0.6);
  .title{
    padding: px2rem(24) 0;
      padding-left: px2rem(25);
      font-size: px2rem(24);
      color:#888888;
      font-weight: bold;
  }
  .isnull{
    display: inline-block;
    width: 100%;
    color:#ccc;
    font-size: px2rem(24);
    line-height: px2rem(250);
    text-align: center;
  }
}
.search-wrapper{
  background-image: url(./search_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .search-header{
    background-color: rgba(0,0,0,0.6);
    .search-input-wrapper{
      position: relative;
      width: 100%;
      padding-top: px2rem(20);
      .search-input{
        width: 92%;
        height: px2rem(70);
        display: block;
        border-radius: px2rem(6);
        margin: 0 auto;
        font-size: px2rem(26);
        padding-left: px2rem(20);
      }
      .icon-magnifier{
        position: absolute;
        right: px2rem(38);
        top: px2rem(38);
        font-size: px2rem(36);
      }
    }
    .hotfont{
      // width: 100%;
      // height: px2rem(300);
      padding-left: px2rem(25);
      .title{
        font-size: px2rem(24);
        color:#888888;
        margin: px2rem(26) 0;
        font-weight: bold;
      }
      ul{
        display: flex;
        width: 100%;
        font-size: px2rem(22);
        flex-wrap: wrap;
        align-content: space-around;
        justify-content: space-between;
        li{
          padding: px2rem(20) px2rem(40);
          display: inline-block;
          color:#c5c5c5;
          border-radius: px2rem(40);
          margin: 0 px2rem(20) px2rem(20) 0;
          font-weight: bold;
          cursor: pointer;
          background-image: -webkit-linear-gradient(top,rgba(20,20,20,1%) 0%,rgba(58,58,58,1) 100%);
          background-image: -moz-linear-gradient(top,rgba(20,20,20,1%) 0%,rgba(58,58,58,1) 100%);
          background-image: -o-linear-gradient(top,rgba(20,20,20,1%) 0%,rgba(58,58,58,1) 100%);
          background-image: linear-gradient(top,rgba(20,20,20,1%) 0%,rgba(58,58,58,1) 100%);
          -webkit-touch-callout:none;
          -webkit-user-select:none;
          -khtml-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;
        }
        .active{
          color:orange;
          background-image: -webkit-linear-gradient(top,rgba(0,0,0,0) 6%,rgba(58,58,58,1) 100%);
          background-image: -moz-linear-gradient(top,rgba(0,0,0,0) 6%,rgba(58,58,58,1) 100%);
          background-image: -o-linear-gradient(top,rgba(0,0,0,0) 6%,rgba(58,58,58,1) 100%);
          background-image: linear-gradient(top,rgba(0,0,0,0) 6%,rgba(58,58,58,1) 100%);
        }
      }
    }
    .typesearch{
      // width: 100%;
      // height: px2rem(300);
      padding-left: px2rem(25);
      .title{
        font-size: px2rem(24);
        color:#888888;
        margin: px2rem(26) 0;
        font-weight: bold;
      }
      ul{
        display: flex;
        width: 100%;
        font-size: px2rem(22);
        flex-wrap: wrap;
        // align-content: space-around;
        // justify-content: space-between;
        li{
          flex:1;
          height: px2rem(110);
          text-align: center;
          line-height: px2rem(110);
          display: inline-block;
          color: #c5c5c5;
          background-color: #c5c5c5;
          background-size: 100% 150%;
          background-position: center;
          border-radius: px2rem(20);
          margin: 0 px2rem(20) px2rem(20) 0;
          font-weight: bold;
          cursor: pointer;
          -webkit-touch-callout:none;
          -webkit-user-select:none;
          -khtml-user-select:none;
          -moz-user-select:none;
          -ms-user-select:none;
          user-select:none;
          overflow: hidden;
          span{
            width: 100%;
            height: 100%;
            display: block;
            background-color: rgba(0,0,0,0.4);
          }
        }
      }
    }
  }
}
</style>
