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
        <el-form ref="form" :model="form" label-width="70px" size="small">
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio label="null">全部</el-radio>
              <el-radio label="0">共青团员</el-radio>
              <el-radio label="1">积极分子</el-radio>
              <el-radio label="2">发展对象</el-radio>
              <el-radio label="3">共产党员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择专业">
            <el-select v-model="form.region" placeholder="请选择专业">
              <el-option
              :label="major.name"
              :value="major.id"
              v-for="(major,index) in majors"
              :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学号查询">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadInfor(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="font-size: 17px;">根据筛选条件查询到的结果</span>
     </div>
     <el-table
        class="list-lable"
        :data="infor"
        style="width: 100%"
        stripe>
        <el-table-column
          fixed
          prop="title"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="id"
          label="学号"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="性别"
          >
        </el-table-column>
        <el-table-column
          prop="city"
          label="民族"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="入学年份"
          >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="专业"
          >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="职务"
          >
        </el-table-column>
          <el-table-column
            prop="zip"
            label="政治面貌"
            >
            </el-table-column>
          <el-table-column
            prop="zip"
            label="联系方式"
            >
        </el-table-column>
        <el-table-column
            label="状态"
            >
            <template slot-scope="scope">
              <el-tag :type="inforStatus[scope.row.status].type">{{ inforStatus[scope.row.status].text}}</el-tag>
             <!-- <el-tag v-if="scope.row.status === 0" type="success">团员</el-tag>
              <el-tag v-if="scope.row.status === 1" type="info">积极分子</el-tag>
              <el-tag v-if="scope.row.status === 2" type="warning">发展对象</el-tag>
              <el-tag v-if="scope.row.status === 3" type="danger">党员</el-tag> -->
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
                      @click="handleDelete(scope.$index, scope.row)"></el-button>
                  </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
          layout="prev, pager, next"
          background
          :total="totalCount"
          @current-change="onCurrentChange"
          :page-size='pageSize'>
        </el-pagination>
</el-card>
  </div>
</template>

<script>
import {
  getInfor,
  getInforMajors
} from '@/api/InforBase'
export default {
  name: 'InfonbaseIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      infor: [], // 信息列表
      inforStatus: [
        { text: '团员', type: 'info' },
        { text: '积极分子', type: '' },
        { text: '发展对象', type: 'success' },
        { text: '党员', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页大小
      status: null,
      majors: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadInfor(1)
    this.loadInforMajors()
  },
  mounted () {},
  methods: {
    loadInfor (page = 1) {
      getInfor({
        page,
        per_page: this.pageSize,
        status: this.status
        // major: this.major
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.infor = results
        this.totalCount = totalCount
      })
    },
    onCurrentChange (page) {
      this.loadInfor(page)
    },
    loadInforMajors () {
      getInforMajors().then(res => {
        this.majors = res.data.data.channels
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
