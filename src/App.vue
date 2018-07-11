<template>
  <div id="app">
    <myheader></myheader>
    <myfooter></myfooter>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import '../static/js/hotcss.js'
import myheader from './components/header/header.vue'
import myfooter from './components/footer/footer.vue'
import home from './components/home/home.vue'
import search from './components/search/search.vue'
import upload from './components/upload/upload.vue'
import friend from './components/friend/friend.vue'
import personal from './components/personal/personal.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  components: {myheader, myfooter, home, search, upload, friend, personal}
}
</script>

<style lang="scss">
@charset "UTF-8";
@import 'common/style/font.css';
@import '../static/css/px2rem.scss';
$designWidth : 750;
body{
  padding: px2rem(88) 0;
  margin: 0;
  // overflow: hidden;
}
#app{
  height: 85vh;
}
</style>
