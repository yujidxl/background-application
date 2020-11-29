<template>
  <div class="slider-bar">
    <a-menu-item v-if="!map.children">
      <router-link :to="map.path">{{ map.name }}</router-link>
    </a-menu-item>
    <a-sub-menu v-else>
      <template #title>
        <span>
          <MailOutlined /><span>{{ map.name }}</span>
        </span>
      </template>
      <a-menu-item v-for="(child, key) in map.children" :key="child.path + key">
        <router-link :to="child.path">{{ child.name }}</router-link>
      </a-menu-item>
    </a-sub-menu>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue';
@Options({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined
  },
  props: {
    map: {
      type: Object,
      default() {
        return {};
      }
    }
  }
})
export default class SliderBar extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
