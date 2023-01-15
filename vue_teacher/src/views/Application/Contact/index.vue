<template>

  <div class="InforBase-container">
          <!-- 面包屑导航 -->
      <el-card class="filter-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>申请人审查</el-breadcrumb-item>
          <el-breadcrumb-item>谈话人分配</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 17px;">谈话人分配情况</span>
         </div>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-form-item label="查询方式">
          <el-select
            v-model="checkWayStuValue"
            placeholder="选择查询方式"
            style="width: 150px">
            <el-option
            v-for="wayStu in checkWayStu"
            :key="wayStu.value"
            :label="wayStu.label"
            :value="wayStu.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入内容">
          <el-input
            v-model="form.name"
            style="width: 150px;"></el-input>
          <el-button
            type="primary"
            :disabled = "loading"
            @click="loadInfor(1)"
            style="margin-left: 20px;"
          >查询</el-button>
        </el-form-item>
      </el-form>

       <el-table
          v-loading="loading"
          class="list-lable"
          :data="infor"
          style="width: 100%"
          stripe>
          <el-table-column
            fixed
            prop="title"
            label="姓名"
            width="90">
          </el-table-column>
          <el-table-column
            prop="id"
            label="学号"
            width="90"
            >
          </el-table-column>
          <el-table-column
            prop="status"
            label="班级"
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="id"
            label="谈话人"
            >
            <template slot-scope="scope">
              <div v-show="!scope.row.isshow">{{scope.row.title}}}</div>
              <el-select
                v-model="checkWayStuValue"
                v-show="scope.row.isshow"
                placeholder="谈话人"
                size="mini">
              <el-option
                v-for="item in checkWayStu"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                size="mini"
                >
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="谈话人联系方式"
            >
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作">
               <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    circle
                    icon="el-icon-edit"
                    v-show="!scope.row.isshow"
                    @click="Edit(scope)"></el-button>
                   <el-button
                    v-show="scope.row.isshow"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle></el-button>
                    <el-button
                    v-show="scope.row.isshow"
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    @click="Close(scope)"
                    circle></el-button>
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
} from '@/api/Contact'
export default {
  name: 'ContactIndex',
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
      status: null, // 查询学生状态
      majors: [], // 按专业筛选
      checkWayStu:
        [{
          value: '0',
          label: '学生姓名'
        }, {
          value: '1',
          label: '学生学号'
        }, {
          value: '2',
          label: '教师姓名'
        }, {
          value: '3',
          label: '教师编号'
        }],
      checkWayTeac:
        [{
          value: '0',
          label: '教师姓名'
        }, {
          value: '1',
          label: '教师编号'
        }],
      checkWayStuValue: '',
      checkWayTeacValue: '',
      loading: true, // 表格数据加载中
      edit: { index: '', isshow: false },
      dialogFormVisible: false,
      addSpeakers: {
        name: '',
        num: '',
        sex: '',
        phone: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadInfor(1)
    this.loadInforMajors()
  },
  mounted () { },
  methods: {
    loadInfor (page = 1) {
      this.loading = true
      getInfor({
        page,
        per_page: this.pageSize,
        status: this.status
        // major: this.major
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.infor = results
        this.totalCount = totalCount

        // 关闭加载中 v-loading
        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadInfor(page)
    },
    loadInforMajors () {
      getInforMajors().then(res => {
        this.majors = res.data.data.channels
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
    },
    Edit (scope) {
      if (scope.row.isshow === undefined) {
        this.$set(scope.row, 'isshow', false)
      }
      scope.row.isshow = !scope.row.isshow
    },
    Close (scope) {
      scope.row.isshow = false
      console.log(scope.row)
    },
    pop () {
      this.$prompt('请输入邮箱', '添加谈话联系人', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
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
.list-lable {
  margin-bottom: 20px;
}
.el-input--small {
  font-size: 7px;
  width: 150px;
}
</style>
