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
      upload: 'upload'
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
