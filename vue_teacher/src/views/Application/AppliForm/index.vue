<template>
  <div class="InforBase-container">
    <!-- 面包屑导航 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>申请人审查</el-breadcrumb-item>
          <el-breadcrumb-item>申请书</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" label-width="70px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="queryForm.status">
            <el-radio label="">全部</el-radio>
            <el-radio label="待审核">未审核</el-radio>
            <el-radio label="已通过">已通过</el-radio>
            <el-radio label="未通过">未通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择专业">
          <el-select v-model="queryForm.major" placeholder="请选择专业">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="major"
              :value="major"
              v-for="(major, index) in majors"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号查询">
          <el-input v-model="queryForm.studentNumber"></el-input>
          <el-button
            type="primary"
            :disabled="loading"
            @click="pullApplicationBooks()"
            style="margin-left: 10px"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 17px">根据筛选条件查询到的结果</span>
      </div>
      <el-table
        v-loading="loading"
        class="list-lable"
        :data="infor"
        style="width: 100%"
        stripe
      >
        <el-table-column
          fixed
          prop="createTime"
          label="时间"
          width="100"
          :formatter="formatTime"
        >
        </el-table-column>
        <el-table-column prop="u_id.nickname" label="姓名" width="100" />

        <el-table-column prop="u_id.class" label="班级" width="100">
        </el-table-column>
        <el-table-column prop="u_id.studentNumber" label="学号" width="100">
        </el-table-column>
        <el-table-column label="申请书">
          <template #default="{ row }">
            <el-image
              style="width: 50px; height: 50px"
              :src="row.imgUrl"
              :preview-src-list="[row.imgUrl]"
            />
            <!-- <img :src="row.imgUrl" style="width: 50px; height: 50px"/> -->
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template #default="{ row }">
            <el-tag v-if="row.status === '待审核'">{{ row.status }}</el-tag>
            <el-tag v-else-if="row.status === '已通过'" type="success">{{
              row.status
            }}</el-tag>
            <el-tag v-else-if="row.status === '未通过'" type="danger">{{
              row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              circle
              icon="el-icon-check"
              @click="handlePut(scope.row._id, '已通过')"
            ></el-button>
            <el-button
              size="mini"
              circle
              type="danger"
              icon="el-icon-close"
              @click="changeDialogVisible(scope.row._id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="pullApplicationBooks"
        @current-change="pullApplicationBooks"
        :current-page.sync="queryForm.pageNum"
        :page-sizes="[10, 25, 50, 100]"
        :page-size.sync="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="确认打回申请书吗？"
      :visible.sync="dialogVisible"
      width="50%"
      append-to-body
    >
      <span style="magrin: 15px">请输入打回原因或建议：</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        size="mini"
        type="textarea"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePut(rowId, '未通过', input)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>

import dayjs from 'dayjs'

import {
  getApplicationBooks, // 获取申请书列表
  getMajors, // 获取专业列表
  putStatus
} from '@/api/AppliForm'
export default {
  name: 'AppliFormIndex',
  components: {},
  props: {},
  data () {
    return {
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        status: null, // 审核状态
        studentNumber: null // 学号
      },
      infor: [], // 信息列表

      total: 0, // 总数据条数
      majors: [], // 按专业筛选
      loading: true, // 表格数据加载中
      dialogVisible: false, // 对话框
      input: '', // 文本输入框
      rowId: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 获取申请书列表
      this.pullApplicationBooks()
      // 获取专业列表
      this.getMajors()
    },
    // 获取申请书列表
    async pullApplicationBooks () {
      try {
        this.loading = true
        const res = await getApplicationBooks(this.queryForm)
        console.log(res)
        this.infor = res.data.records
        this.total = res.data.total
      } finally {
        this.loading = false
      }
    },
    // 获取专业列表
    async getMajors () {
      const res = await getMajors()
      this.majors = res.data
    },
    formatTime (row, cell, cellValue) {
      return dayjs(cellValue).format('YYYY-MM-DD')
    },

    async handlePut (id, status, msg) {
      const data = {
        _id: id,
        status: status,
        message: msg
      }
      console.log(data)
      try {
        await putStatus(data)
        if (status === '已通过') {
          this.$message({
            message: '申请书已通过',
            type: 'success'
          })
        } else if (status === '未通过') {
          this.$message({
            message: '申请书已打回',
            type: 'success'
          })
        }
      } finally {
        this.pullApplicationBooks()
        this.dialogVisible = false
      }
    },
    reject () {
      
    },
    changeDialogVisible (id) {
      this.rowId = id
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.filter-card {
  margin-bottom: 20px;
}
.list-lable {
  margin-bottom: 20px;
}
</style>
