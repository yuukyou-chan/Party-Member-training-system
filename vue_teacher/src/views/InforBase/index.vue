<template>
  <div class="InforBase-container">
          <!-- 面包屑导航 -->
      <el-card class="filter-card">
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>学生资料库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 数据筛选表单 -->
        <el-form ref="form" :model="queryForm" label-width="70px" size="small">
          <el-form-item label="状态">
            <el-radio-group v-model="queryForm.politic">
              <el-radio label=''>全部</el-radio>
              <el-radio label="共青团员">共青团员</el-radio>
              <el-radio label="积极分子">积极分子</el-radio>
              <el-radio label="发展对象">发展对象</el-radio>
              <el-radio label="共产党员">共产党员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择专业">
            <el-select v-model="queryForm.major" placeholder="请选择专业">
              <el-option
              label="全部"
              :value="null"
              ></el-option>
              <el-option
              :label="major"
              :value="major"
              v-for="(major,index) in majors"
              :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学号查询">
            <el-input v-model="queryForm.studentNumber"></el-input>
            <el-button
            type="primary"
            :disabled = "loading"
            @click="list(1)"
            style="margin-left: 10px;"
            >查询</el-button>
          </el-form-item>
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
        stripe>
        <el-table-column
          fixed
          prop="username"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="studentNumber"
          label="学号"
          >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          >
        </el-table-column>
        <el-table-column
          prop="nation"
          label="民族"
          >
        </el-table-column>
        <el-table-column
          prop="register"
          label="入学年份"
          >
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          >
        </el-table-column>
          <el-table-column
            prop="politic"
            label="政治面貌"
            >
            </el-table-column>
          <el-table-column
            prop="tel"
            label="联系方式"
            width="120"
            >
        </el-table-column>
        <el-table-column
            label="状态"
            >
            <template #default="{row}">
             <el-tag v-if="row.politic ==='共青团员' " type="success">共青团员</el-tag>
              <el-tag v-else-if="row.politic === '积极分子'" type="info">积极分子</el-tag>
              <el-tag v-else-if="row.politic === '发展对象'" type="warning">发展对象</el-tag>
              <el-tag v-else-if="row.politic === '共产党员'" type="danger">共产党员</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
             <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      circle
                      icon="el-icon-edit"
                      @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button
                      size="mini"
                      circle
                      type="danger"
                      icon="el-icon-delete"
                      @click="onDeleteArticle(scope.row.id)"></el-button>
                  </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
      background
      @size-change="list"
      @current-change="list"
      :current-page.sync="queryForm.pageNum"
      :page-sizes="[10, 25, 50, 100]"
      :page-size.sync="queryForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
  </div>
</template>

<script>
import {
  list, // 获取学生列表
  deleteArticle
} from '@/api/InforBase'

import {
  getMajors // 获取专业列表
} from '@/api/AppliForm'
export default {
  name: 'InfonbaseIndex',
  components: {},
  props: {},
  data () {
    return {
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        politic: null, // 政治身份
        studentNumber: null, // 学号
        major: null // 查询的专业
      },
      infor: [], // 信息列表
      total: 0, // 总数据条数
      majors: [], // 专业列表
      loading: true // 表格数据加载中
    }
  },
  computed: {},
  watch: {},
  created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      // 获取学生列表
      this.list()
      // 获取专业列表
      this.getMajors()
    },
    async list () {
      try {
        this.loading = true
        const res = await list(this.queryForm)
        this.infor = res.data.records
        this.total = res.data.total
      } finally {
        this.loading = false
      }
    },
    getMajors () {
      getMajors().then(res => {
        this.majors = res.data
      })
    },

    onDeleteArticle (articleId) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认执行这里
        deleteArticle(articleId).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.filter-card {
  margin-bottom: 20px;
}
.list-lable{
      margin-bottom: 20px;
}
</style>
