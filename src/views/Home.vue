<template>
  <div id="home">
    <div class="menus">
      <a-menu theme="dark" mode="inline">
        <slider-bar v-for="(item, index) in $router.options.routes[0].children" :key="index" :map="item"></slider-bar>
      </a-menu>
    </div>
    <div class="menu-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import SliderBar from '@/components/SliderBar.vue';
import { Options, Vue, ClassComponentHooks } from 'vue-class-component';
@Options({
  components: {
    SliderBar
  },
  data() {
    return {};
  },
  methods: {
    clickedFn() {
      console.log(this.$router.options.routes);
    }
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
#home {
  display: flex;
  .menus {
    width: 256px;
    height: 100vh;
    background-color: #001529;
  }
  .menu-view {
    flex: 1;
  }
}
</style>
