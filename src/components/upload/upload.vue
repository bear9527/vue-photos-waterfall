<template>
  <div class="upload">
    {{upload}}
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      upload: '敬请期待'
    };
  },
  components: {
  }
};
</script>

<style lang="scss">
@charset "UTF-8";
@import '../../../static/css/px2rem.scss';
$designWidth : 750;
.upload{
  height: 82vh;
  text-align: center;
  color:#ccc;
  font-size:px2rem(20);
  padding-top: px2rem(50);
  background-color: #5d5d5d;
}
</style>
