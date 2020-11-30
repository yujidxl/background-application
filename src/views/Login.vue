<template>
  <div class="login">
    <div
      class="login-container"
      style="background-color: #141a48;margin: 0px;overflow: hidden;"
    >
      <a-form
        layout="horizontal"
        :model="formInline"
        @submit="handleSubmit"
        @submit.prevent
      >
        <a-form-item>
          <a-input v-model:value="formInline.email" placeholder="Username">
            <template #prefix
              ><UserOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formInline.password"
            type="password"
            placeholder="Password"
          >
            <template #prefix
              ><LockOutlined style="color:rgba(0,0,0,.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formInline.email === '' || formInline.password === ''"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { Vue, Options } from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';
@Options({
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      formInline: {
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['setToken']),
    async handleSubmit(e: any) {
      const { email, password } = this.formInline;
      if (!/.+@.+/.test(email)) {
        this.$message.error('当前输入用户名不是邮箱，清校验通过后再尝试登录');
        return;
      }
      const end = await this.$axios.post('/login/to', {
        email,
        password
      });
      if (end.code === 0) {
        this.$message.success('登录成功！');
        const token = end.token;
        token && this.setToken(token);
        this.$router.push('/');
        return;
      }
      this.$message.error(end.msg);
    }
  }
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login {
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .login-container {
    height: 100vh;
    background-color: #2d3a4b;
    display: flex;
    justify-content: center;
    padding-top: 200px;
    box-sizing: border-box;
    ::v-deep {
      .ant-form-item-control-wrapper {
        margin: 0 auto;
      }
    }
  }
}
</style>
