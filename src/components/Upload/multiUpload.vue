<template> 
  <div>
    <el-upload
      action=""
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :auto-upload='false'
      :on-change="getFile"
      :on-remove='handleRemove'
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" class="big-img">
      <img :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'

  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        imgValue: [],
        dialogVisible: false,
        dialogImageUrl:null
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
        async emitInput(res) {
            // for(let i=0;i<fileList.length;i++){
            //     await this.getBase64(fileList[i].raw).then(res => {
            //         value.push(res);		
            //     });
            // }
            // console.log("转换好的数组图片",value);
            // this.$emit('input', value)
        },
        handleRemove(file, fileList) {
            console.log("需要删除的：",file);
            console.log("删除之后的数据",this.imgValue);
            // this.emitInput(fileList);
        },
        handlePreview(file) {
            this.dialogVisible = true;
            this.dialogImageUrl=file.url;
        },
        beforeUpload(file) {
            let _self = this;
            return new Promise((resolve, reject) => {
            policy().then(response => {
                _self.dataObj.policy = response.data.policy;
                _self.dataObj.signature = response.data.signature;
                _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
                _self.dataObj.key = response.data.dir + '/${filename}';
                _self.dataObj.dir = response.data.dir;
                _self.dataObj.host = response.data.host;
                resolve(true)
            }).catch(err => {
                console.log(err)
                reject(false)
            })
            })
        },
        handleUploadSuccess(res, file) {
            this.fileList.push({url: file.name,url:this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name});
            this.emitInput(this.fileList);
        },
        handleExceed(files, fileList) {
            this.$message({
            message: '最多只能上传'+this.maxCount+'张图片',
            type: 'warning',
            duration:1000
            });
        },
      	getFile (res,fileList) {
            this.getBase64(res.raw).then(res => {
                this.imgValue.push(res);		
            }); 
            console.log("当前的图片列表：",this.imgValue);
            this.$emit('input', this.imgValue)
		},
		// 把图片地址转换成base64位
		getBase64(file) {
			return new Promise(function(resolve, reject) {
				let reader = new FileReader();
				let imgResult = "";
				reader.readAsDataURL(file);
				reader.onload = function() {
					imgResult = reader.result;
				};
				reader.onerror = function(error) {
					reject(error);
				};
				reader.onloadend = function() {
					resolve(imgResult);
				};
			});
		},
    }
  }
</script>
<style lang='scss'>
.big-img {
    text-align: center;
    .el-dialog {
        width: 550px;
        height: 500px;
        img {   
            // width: 100%;
            height: 100%;
            width: 111px;
            object-fit: contain
            // max-height: 500px;
            // width: 400px;
        }
    }
}
.el-upload-list__item-thumbnail {
    object-fit: contain;
}
</style>


