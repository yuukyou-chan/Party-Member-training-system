<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
   -->
  <el-menu
    class="nav-menu"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse">
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/InforBase">
      <i class="el-icon-document-copy"></i>
      <span slot="title">学生资料库</span>
    </el-menu-item>
    <el-submenu index="/applicant">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>申请人审查&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/AppliForm">申请书</el-menu-item>
        <el-menu-item index="/AppliText">申请表</el-menu-item>
        <el-menu-item index="/Contact">谈话联系人</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/activists">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>积极分子审查</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/OnlineLearning">线上学习情况</el-menu-item>
        <el-menu-item index="/DevelopInspection">培养考察</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/feedback">
      <i class="el-icon-files"></i>
      <span slot="title">反馈箱</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-tickets"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-submenu index="userCenter">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userInfo">基本资料</el-menu-item>
        <!-- <el-menu-item index="/secRe">头像修改</el-menu-item> -->
        <el-menu-item index="/userPwd">重置密码</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/adminAcount">
      <i class="el-icon-document-copy"></i>
      <span slot="title">管理员管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}
</style>
