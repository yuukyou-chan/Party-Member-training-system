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
              <el-option label="电商" value="shanghai"></el-option>
              <el-option label="智能" value="beijing"></el-option>
              <el-option label="计科" value="beijing"></el-option>
              <el-option label="软件" value="beijing"></el-option>
              <el-option label="通信" value="beijing"></el-option>
              <el-option label="自动化" value="beijing"></el-option>
              <el-option label="信管" value="beijing"></el-option>
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
        :data="tableData"
        style="width: 100%"
        height="400"
        stripe>
        <el-table-column
          fixed="left"
          prop="date"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="学号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
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
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
</el-card>
  </div>
</template>

<script>
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
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
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
