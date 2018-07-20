<template>
  <div class="friend">
    {{friend}}
  </div>
</template>

<script>
export default {
  name: 'friend',
  data () {
    return {
      friend: '敬请期待'
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
.friend{
  height: 82vh;
  text-align: center;
  color:#ccc;
  font-size:px2rem(20);
  padding-top: px2rem(50);
  background-color: #5d5d5d;
}
</style>
