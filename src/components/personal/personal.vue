<template>
  <div class="personal">
    {{personal}}
  </div>
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {
      personal: 'personal'
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
