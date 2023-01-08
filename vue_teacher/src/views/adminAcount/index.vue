<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学生资料库</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="admin" label-width="70px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="admin.level">
            <el-radio label=''>全部</el-radio>
            <el-radio label="超级管理员">超级管理员</el-radio>
            <el-radio label="考察型管理员">考察型管理员</el-radio>
            <el-radio label="材料型管理员">材料型管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号查询">
          <el-input v-model="admin.acount"></el-input>
          <el-button type="primary" :disabled = "loading" style="margin-left: 10px;">查询</el-button>
        </el-form-item>
        <el-button type="primary" style="margin-left: 10px;" plain size="mini">新增</el-button>
        <el-button type="warning" style="margin-left: 10px;" plain size="mini">修改</el-button>
        <el-button type="danger" style="margin-left: 10px;" plain size="mini">删除</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 17px;">根据筛选条件查询到的结果</span>
      </div>
      <el-table
        v-loading="loading"
        class="list-lable"
        :data="infor"
        style="width: 100%"
        stripe
      >
        <el-table-column fixed prop="createTime" label="创建时间" width="100" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="u_id.nickname" label="用户姓名" width="100"/>

        <el-table-column prop="u_id.class" label="登录账号" width="100">
        </el-table-column>
        <el-table-column prop="u_id.studentNumber" label="管理员级别" width="100">
        </el-table-column>
        <el-table-column  label="管理员联系方式">
        </el-table-column>

        <el-table-column label="状态">
          <template >
            <el-switch
              v-model="admin.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-check"
            ></el-button>
            <el-button
              size="mini"
              circle
              type="danger"
              icon="el-icon-close"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
        background
        @size-change="getApplicationBooks"
        @current-change="getApplicationBooks"
        :current-page.sync="admin.pageNum"
        :page-sizes="[10, 25, 50, 100]"
        :page-size.sync="admin.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'adminAcount',
  data() {
    return {
      admin: {
        level: '',
        acount: '',
        pageNum: 1,
        pageSize: 10,
        status: ''
      },
      loading: false,
      total: 0,
      infor: []
    }
  },
  methods: {
    formatTime (row, cell, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD')
    },
    getApplicationBooks () {

    }
  }
}
</script>

<style>

</style>
