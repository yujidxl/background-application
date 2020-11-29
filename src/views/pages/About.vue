<template>
  <div class="about">
    <h5>关于我们</h5>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  data() {
    return {};
  }
})
export default class About extends Vue {}
</script>

<style lang="scss" scoped>
.about {
  h5 {
    font-size: 14px;
  }
}
</style>
