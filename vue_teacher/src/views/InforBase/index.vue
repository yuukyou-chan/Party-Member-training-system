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
        <el-form ref="form" :model="students" label-width="70px" size="small">
          <el-form-item label="状态">
            <el-radio-group v-model="students.status">
              <el-radio :label=null>全部</el-radio>
              <el-radio label="0">共青团员</el-radio>
              <el-radio label="1">积极分子</el-radio>
              <el-radio label="2">发展对象</el-radio>
              <el-radio label="3">共产党员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择专业">
            <el-select v-model="students.major" placeholder="请选择专业">
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
            <el-input v-model="students.number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
            type="primary"
            :disabled = "loading"
            @click="loadInfor(1)"
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
          prop="s_name"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="s_id"
          label="学号"
          >
        </el-table-column>
        <el-table-column
          prop="s_sex"
          label="性别"
          >
        </el-table-column>
        <el-table-column
          prop="s_nation"
          label="民族"
          >
        </el-table-column>
        <el-table-column
          prop="s_register"
          label="入学年份"
          >
        </el-table-column>
        <el-table-column
          prop="s_major"
          label="专业"
          >
        </el-table-column>
          <el-table-column
            prop="s_politic"
            label="政治面貌"
            >
            </el-table-column>
          <el-table-column
            prop="s_tel"
            label="联系方式"
            width="120"
            >
        </el-table-column>
        <el-table-column
            label="状态"
            >
            <template slot-scope="scope">
              <el-tag :type="inforStatus[scope.row.s_status].type">{{ inforStatus[scope.row.s_status].text}}</el-tag>
             <el-tag v-if="scope.row.status === 0" type="success">团员</el-tag>
              <el-tag v-if="scope.row.status === 1" type="info">积极分子</el-tag>
              <el-tag v-if="scope.row.status === 2" type="warning">发展对象</el-tag>
              <el-tag v-if="scope.row.status === 3" type="danger">党员</el-tag>
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
          layout="prev, pager, next"
          background
          :total="totalCount"
          :disabled="loading"
          @current-change="onCurrentChange"
          :page-size='pageSize'>
        </el-pagination>
</el-card>
  </div>
</template>

<script>
import {
  getInfor,
  getInforMajors,
  deleteArticle
} from '@/api/InforBase'
export default {
  name: 'InfonbaseIndex',
  components: {},
  props: {},
  data () {
    return {
      students: {
        number: null, // 查询学号
        status: null, // 查询学生状态
        major: null // 查询的专业
      },
      infor: [], // 信息列表
      inforStatus: [
        { text: '团员', type: 'info' },
        { text: '积极分子', type: '' },
        { text: '发展对象', type: 'success' },
        { text: '党员', type: 'danger' }
      ],
      totalCount: 50, // 总数据条数
      pageSize: 10, // 每页大小
      majors: [], // 专业列表
      loading: true // 表格数据加载中
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadInfor()
    this.loadInforMajors()
  },
  mounted () {},
  methods: {
    async loadInfor () {
      // this.loading = true
      // getInfor({
      //   // page,
      //   // per_page: this.pageSize,
      //   s_politic: this.students.status,
      //   s_id: this.students.number || null,
      //   s_major: this.students.major
      // }).then(res => {
      //   const results = res.data.data
      //   this.infor = results
      //   // this.totalCount = totalCount

      //   // 关闭加载中 v-loading
      //   this.loading = false
      // })
        try {
          this.loading = true
          const res = await getInfor({
            // page,
            // per_page: this.pageSize,
            s_politic: this.students.status,
            s_id: this.students.number || null,
            s_major: this.students.major
          })
          const results = res.data.data
          this.infor = results
        } finally {
          this.loading = false
        }
    },
    onCurrentChange (page) {
      this.loadInfor(page)
    },
    loadInforMajors () {
      getInforMajors().then(res => {
        this.majors = res.data.data
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
