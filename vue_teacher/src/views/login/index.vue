<template>
  <div class="login-container">
    <!--
      配置表单验证：
      1、bixv gei  el-from 组件绑定数据对象
      2、给需要验证的表单项 el-form-item 绑定 prop属性
         注意：prop 属性需要指定表单对象中的数据名称
      3、通过 el-form 组件的 rules 属性配置验证规则

      手动触发表单验证：
      1、给 el-form 设置 ref 起个名字（不重复）
      2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
      -->
    <el-form
      ref="login-form"
      class="login-form"
      :model="user"
      :rules="formRules"
    >
      <h4>欢迎使用<br />信息工程学院智慧培优平台</h4>
      <el-form-item prop="mobile">
        <el-input v-model="user.username" placeholder="请输入管理者账号" />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="agree">
          我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loginLoading"
          class="login-btn"
          @click="onLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      agree: '', // 是否同意协议的选中状态
      loginLoading: false, // 登录的loading状态
      formRules: {
        // 表单验证规则属性
        username: [
          { required: true, message: '账号不能为空', trigger: 'change' },
          { pattern: /\d{8}$/, message: '请输入正确的账号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ]
        // agree: [
        //   { // 自定义校验规则
        //     validator: (rule, value, callback) => {
        //       if (value) {
        //         callback()
        //       } else {
        //         callback(new Error('请同意用户协议'))
        //       }
        //     },
        //     trigger: 'change'
        //   }
        // ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations(['updateToken', 'updateUserInfo']),
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user

      // 表单验证
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }

        // 验证通过，提交登录
        this.login()
      })
    },
    login () {
      // 开启登录中 loading...
      this.loginLoading = true

      login(this.user)
        .then(res => {
          // debugger
          const { token } = res
          // 登录成功
          this.$message({
            message: '登录成功',
            type: 'success'
          })

          // 关闭loading
          this.loginLoading = false

          // 将接口返回的用户相关数据存储到本地
          window.localStorage.token = token
          // 保存到vuex中
          this.updateToken(token)
          window.localStorage.setItem('user', JSON.stringify(res.data))
          this.updateUserInfo(res.data)
          // 跳转到首页
          this.$router.push('/').catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
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
  background: url(bg4.jpg) no-repeat;
  background-size: cover;
}
.login-form {
  background-color: #fff;
  padding: 20px;
  min-width: 300px;
}
.login-btn {
  width: 100%;
}
h4 {
  margin-top: 5px;
  margin-bottom: 50px;
  text-align: center;
}
</style>
