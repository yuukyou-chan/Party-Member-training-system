<template>
  <div class="imge-list">
    <div class="action-head">
      <el-radio-group
      v-model="collect"
      size="mini"
      @change="loadImages(1)">
        <el-radio-button :label="false" >全部</el-radio-button>
        <el-radio-button :label="true" >收藏</el-radio-button>
      </el-radio-group>
       <el-button
        size="mini"
        type="success"
        @click="dialogUploadVisible = true"
        v-if="isShowAdd"
        >上传素材</el-button>
    </div>
      <!-- 素材列表 -->
    <el-row :gutter="10">
        <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
         v-for="(img,index) in images"
         :key="index"
         class="image-item"
         @click.native="selected = index">
         <el-image
           style="height: 100px"
           :src="img.url"
           fit="cover"
           ></el-image>
           <div
           class="selected"
           v-if="isShowSelected && selected ===index"
           ></div>
           <div v-if="isShowAction" class="image-action">
             <el-button
              type="warning"
              :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              @click="onCollect(img)"
              :loading="img.loading"
              size="small"
              ></el-button>
               <el-button
              type="warning"
              icon="el-icon-delete-solid"
              circle
              @click="onDelete(img)"
              :loading="img.loading"
              size="samll"
              ></el-button>
           </div>
           </el-col>
    </el-row>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onPageChange"
        :page-size="pageSize"
        current-page.sync="page"
        >
    </el-pagination>
    <el-dialog
    title="上传素材"
    :visible.sync="dialogUploadVisible"
    :append-to-body="true">
        <el-upload
        v-if="dialogUploadVisible"
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import {
  getImages,
  collectImage,
  deleteImage
} from '@/api/image'
export default {
  name: 'ImageList',
  components: {},
  props: {
    isShowAdd: {
      type: Boolean,
      default: true
    },
    isShowAction: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: '',
      pageSize: 20,
      page: 1,
      selected: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        this.images = results
        results.forEach(img => {
          img.loading = false
        })
        this.totalCount = res.data.data.total_count
      })
    },
    onUploadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(this.page)
    },
    onPageChange (page) {
      this.loadImages(page)
    },
    onCollect (img) {
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.loading = false
        img.is_collected = !img.is_collected
      })
    },
    onDelete (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        img.loading = false
        this.loadImages()
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-action {
  height: 40px;
  background-color: rgba(204,204,204,.5);
  position: absolute;
  bottom: 6px;
  left: 5px;
  right: 12px;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}
.image-item {
  position: relative;
}
.selected{
  background: url(./selected.png) no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
