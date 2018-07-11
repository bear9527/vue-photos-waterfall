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
      friend: 'friend'
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
</style>
