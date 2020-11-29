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
          <a-input v-model:value="formInline.user" placeholder="Username">
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
            :disabled="formInline.user === '' || formInline.password === ''"
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
@Options({
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      }
    };
  },
  methods: {
    async handleSubmit(e: any) {
      const { user, password } = this.formInline;
      if (!/.+@.+/.test(user)) {
        this.$message.error('当前输入用户名不是邮箱，清校验通过后再尝试登录');
        return;
      }
      const end = await this.$axios.post('/login/loginbyemail', {
        email: user,
        password
      });
      if (end.code === 0) {
        this.$message.success('login successed, congrations! jumpping ...');
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
