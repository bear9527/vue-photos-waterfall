<template>
  <div class="waterfall-warpper">
    <WaterFall :listsAll="listsAll" @clickLikeIt="clickLikeIt" @clickpicdetailpar="clickpicdetailpar"></WaterFall>
    <picturedetails v-show="picobj" :picobj="picobj" ref="picdetail"></picturedetails>
  </div>
</template>

<script>
  import WaterFall from 'components/waterfall/waterfall'
  import {urlParse} from 'common/js/util'
  import '../../../static/js/hotcss.js'
  import picturedetails from 'components/picturedetails/picturedetails'
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
        listsAll: [],
        picobj: null
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
      },
      clickpicdetailpar (pic, event) { // 点击图片详情
        if (!event._constructed) {
          return;
        }
        this.picobj = pic;
        this.$refs.picdetail.show(); // 执行图片详情页组件里的show方法
      }
    },
    mounted () {
    },
    created () {
      this.getData();
    },
    components: {
      WaterFall,
      picturedetails
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
