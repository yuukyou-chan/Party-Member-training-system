<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width='auto'
    >
    <app-aside class="aside-menu"
    :is-collapse='isCollapse'
    />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
        <i
        :class="{
          'el-icon-s-fold':isCollapse,
          'el-icon-s-unfold':!isCollapse
        }"
        @click="isCollapse = !isCollapse"
        ></i>
        <span>信息工程学院智慧培优平台</span>
        </div>
         <el-dropdown>
           <div class="avatar-wrap">
               <img  class="avatar" :src="user.photo" />
               <span>{{user.name}}</span>
               <span class="el-dropdown-link">
               <i class="el-icon-arrow-down el-icon--right"></i>
               </span>
         </div>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >个人设置</el-dropdown-item>
                <el-dropdown-item
                 @click.native= "onLogout">用户退出</el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
        </el-header>

      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边栏菜单
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好，请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },

    onLogout () {
      this.$confirm('确认退出吗?', '推出提示提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 把用户的登录状态清除
        window.localStorage.removeItem('user')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
      })
    }

  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
    width: 300px;
}

.header {
  // background-color: #b3c0d1;
  border-bottom: 1px solid #ccc;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
   .avatar-wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

}

.main {
  background-color: #e9eef3;
      margin: 0;
}
.aside-menu{
  height: 100%;
}
.h3{
    text-align: center;
}
</style>
