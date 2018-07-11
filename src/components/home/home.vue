<template>
  <div class="waterfall-warpper">
    <WaterFall :listsAll="listsAll" @clickLikeIt="clickLikeIt"></WaterFall>
  </div>
</template>

<script>
  import WaterFall from 'components/waterfall/waterfall'
  import {urlParse} from 'common/js/util'
  import '../../../static/js/hotcss.js'
  export default {
    name: 'home',
    data () {
      return {
        urlObj: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        },
        listsAll: []
      }
    },
    methods: {
      getData () {
        this.$ajax.get('/api/home/', {
          params: {id: this.urlObj.id}
        }).then((response) => {
          this.listsAll = response.data.data;
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
.waterfall-warpper {
  height: 93.4vh;
  background-color: #383838;
}
</style>
