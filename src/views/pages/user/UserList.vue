<template>
  <div class="user-list">
    <a-table :columns="columns" :data-source="data" bordered size="small">
    </a-table>
  </div>
</template>

<script lang="ts">
import { formatTime } from '@/utils';
import { Options, Vue } from 'vue-class-component';
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'email',
    align: 'center'
  },
  {
    title: '密码',
    dataIndex: 'password',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    align: 'center'
  }
];
@Options({
  data() {
    return {
      data: [],
      columns
    };
  },
  async mounted() {
    const data = await this.$axios.get('/login/list');
    if (data.code !== 0) {
      this.$message.error(data.msg || '获取用户列表失败！');
      return;
    }
    this.data = data.data.map((item: any) => {
      item.key = item.id;
      item.createdAt = formatTime(new Date(item.created_at));
      item.updatedAt = formatTime(new Date(item.updated_at));
      return item;
    });
  }
})
export default class UserList extends Vue {}
</script>

<style lang="scss" scoped>
.user-list {
  h5 {
    font-size: 14px;
  }
}
</style>
