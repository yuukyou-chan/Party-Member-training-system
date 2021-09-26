<template>
  <div class="login-container">
    <el-form class="login-form" ref="form" :model="user" >
    <h4>欢迎使用<br>天津商业大学党建系统</h4>
  <el-form-item >
    <el-input
    v-model="user.mobile"
    placeholder="请输入管理者账号"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input
    v-model="user.code"
    placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item >
    <el-checkbox v-model="checked"> 我已阅读并同意用户协议和隐私条款</el-checkbox>

  </el-form-item>
  <el-form-item>
    <el-button
    type="primary"
    @click="onLogin"
    :loading='loginLoading'
    class="login-btn">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import request from '../../utils/request'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false, // 是否同意协议选中的状态
      loginLoading: false // 登录的loading状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      const user = this.user

      // 表单验证

      // 验证通过，提交登录

      // 开启登录中 loading...
      this.loginLoading = true

      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: user
      }).then(res => {
        console.log(res)

        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        // 关闭loading
        this.loginLoading = false
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登陆失败，账号或验证码错误')
        // 关闭loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(login-bgp.png) no-repeat;
  background-size: cover;
}
.login-form{
  background-color: #fff;
  padding: 20px;
  min-width: 300px;
}
.login-btn{
  width: 100%;
}
h4{
  margin-top: 5px;
  margin-bottom: 50px;
  text-align: center;
}
</style>
