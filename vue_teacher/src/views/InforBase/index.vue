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
            <el-radio-group v-model="form.resource">
              <el-radio label="共青团员"></el-radio>
              <el-radio label="积极分子"></el-radio>
              <el-radio label="发展对象"></el-radio>
              <el-radio label="共产党员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择专业">
            <el-select v-model="form.region" placeholder="请选择专业">
              <el-option label="电商" value="ds"></el-option>
              <el-option label="智能" value="zn"></el-option>
              <el-option label="计科" value="jk"></el-option>
              <el-option label="软件" value="rj"></el-option>
              <el-option label="通信" value="tx"></el-option>
              <el-option label="自动化" value="zdh"></el-option>
              <el-option label="信管" value="xg"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学号查询">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
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
          fixed="left"
          prop="title"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="id"
          label="学号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="民族"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="入学年份"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="职务"
          width="120">
        </el-table-column>
          <el-table-column
            prop="zip"
            label="政治面貌"
            width="120">
            </el-table-column>
          <el-table-column
            prop="zip"
            label="联系方式"
            width="120">
        </el-table-column>
        <el-table-column
            label="状态"
            width="120">
            <template slot-scope="scope">
              <el-tag :type="inforStatus[scope.row.status].type">{{ inforStatus[scope.row.status].text}}</el-tag>
             <!-- <el-tag v-if="scope.row.status === 0" type="success">团员</el-tag>
              <el-tag v-if="scope.row.status === 1" type="info">积极分子</el-tag>
              <el-tag v-if="scope.row.status === 2" type="warning">发展对象</el-tag>
              <el-tag v-if="scope.row.status === 3" type="danger">党员</el-tag> -->
            </template>
        </el-table-column>
        <el-table-column
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
import { getInfor } from '@/api/InforBase'
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
      pageSize: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadInfor(1)
  },
  mounted () {},
  methods: {
    loadInfor (page = 1) {
      getInfor({
        page,
        per_page: this.pageSize
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.infor = results
        this.totalCount = totalCount
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadInfor(page)
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
