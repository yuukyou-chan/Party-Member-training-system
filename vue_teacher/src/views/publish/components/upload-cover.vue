<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
        <img
        class="cover-image"
        ref="cover-image"
        width="150"
        height="100"
        :src='value'
        >
        <el-dialog
            title="选择封面"
            :visible.sync="dialogVisible"
            width="30%"
            append-to-body>
             <el-tabs v-model="activeName">
                <el-tab-pane label="素材库" name="first">
                  <image-list
                  :is-show-add="false"
                  :is-show-action="false"
                  :is-show-selected="true"
                  ref="image-list"
                  />
                </el-tab-pane>
                <el-tab-pane label="上传图片" name="second">
                  <input
                  type="file"
                  @change="onFileChange"
                  ref="file"
                  >
                  <img
                  width="150"
                  ref="preview-image"
                  src=''>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                type="primary"
                @click="onCoverConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'

export default {
  name: 'UploadCover',
  components: { ImageList },
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          console.log(res)
          this.dialogVisible = false
          this.$refs['cover-image'].src = res.data.data.url
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择封面图片')
          return
        }
        // 关闭对话框
        this.dialogVisible = false
        // 修改父组件
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}

</script>

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 100px;
  border: 1px solid #000;
}
</style>
