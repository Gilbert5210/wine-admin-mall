<template>
    <div class="articleContent">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文章标题" prop="titleText">
                <el-input v-model="ruleForm.titleText"></el-input>
            </el-form-item>
            <el-form-item prop="content">
                <my-edit ref="myEdit" v-model="ruleForm.content"></my-edit>
            </el-form-item>
            <el-form-item label="文章封面" class="uploadCoverPath">
                <el-upload
                    class="avatar-uploader"
                    accept='.jpg,.jpeg,.png,.gif,JPG,.JPEG,'
                    action=""
                    :auto-upload='false'
                    :on-change="getFile"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="标签选项" prop="labelList">
                <el-select
                        v-model="ruleForm.labelList"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        @change="handleSelect"
                        placeholder="请选择文章标签">
                    <el-option
                            v-for="item in articleTagLists"
                            :key="item.id"
                            :label="item.tagName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类选择" prop="classList">
                <el-select
                        v-model="ruleForm.classList"
                        allow-create
                        multiple
                        filterable
                        @change="handleSelect"
                        placeholder="请选择分类">
                    <el-option
                            v-for="item in articleCategoryLists"
                            :key="item.id"
                            :label="item.categoryName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限设置">
                <el-radio-group v-model="ruleForm.commentPermission">
                    <el-radio :label="1">允许所有人评论</el-radio>
                    <el-radio :label="0">不允许评论</el-radio>
                </el-radio-group>
                <el-checkbox-group v-model="ruleForm.visiblePermission">
                    <el-checkbox label="仅自己可见" name="type"></el-checkbox>
                    <el-checkbox label="禁止转载" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    
</template>

<script>
    import myEdit from '@/components/wangEdit/index'
    // import {    
    //     selectAllArticleTag, 
    //     selectAllArticleCategory,
    //     addArticle
    // } from '../../api/api.js'
    export default {
        name: "sendBlog.vue",
        data(){
            return{
                editor:'',
                dialogVisible: false,
                dialogImageUrl: '',
                ruleForm:{
                    titleText: '',  //文章标题
                    content: '',    //文章内容
                    labelList: [],//标签列表
                    classList: [],//分类选择
                    commentPermission:'',
                    visiblePermission:[],
                    imageUrl: ''
                },
                articleCategoryLists:[
                    
                ],
                articleTagLists:[
                   
                ],//默认列表
                rules: {
                    titleText: [
                        { required: true, message: '请输入博客文章的标题', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入博客文章的内容', trigger: 'blur' }
                    ],
                    labelList: [
                        { required: true, message: '请选标签', trigger: 'change' }
                    ],
                    classList: [
                        { required: true, message: '请选择分类', trigger: 'change' }
                    ],
                }
            }
        },
        computed: {
            token () {
                return JSON.parse(localStorage.getItem("userInfo")).token;
            },
            userId () {
                return JSON.parse(localStorage.getItem("userInfo")).userId;
            }
        },
        components:{
            myEdit
        },
        methods:{
            //选择器选中的时候触发的事件
            handleSelect(item){
                console.log("选中的：",item);
            },
            //立即发布博文的点击事件
            submitForm (formData) {
                let _this = this;
                 this.$refs[formData].validate((valid) => {
                    if (valid) {
                        // console.log(_this.ruleForm,'form数据');
                        let params = {
                            article: {
                                userId: _this.userId,         //用户Id
                                authorId: _this.userId,       //作者Id，新增博文时和用户Id一致
                                title: _this.ruleForm.titleText,          //标题
                                articleCoverPath: _this.ruleForm.imageUrl,   //文章封面路径(非必填)
                                text: _this.ruleForm.content,
                            },
                            categoryIdList: _this.ruleForm.classList, //分类Id数组
                            tagIdList: _this.ruleForm.labelList       //标签Id数组
                        };
                        let config = {
                            headers:{
                                token: _this.token,
                                userId: _this.userId
                            }
                        };
                        addArticle(params, config).then(res => {
                            if (res.data.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: '博客发送成功'
                                });
                                this.$router.push({
                                    path:'userInfo/personalCenter'
                                })
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    }
                    else {
                        this.$message({
                            message: '请输入必填信息',
                            type: 'warning'
                        });
                    }
                })
            },
            //文档编辑器点击重置的时候
            resetForm(ruleForm){
               
            },
            getFile (res,file) {
                this.getBase64(res.raw).then( res => {
                    this.ruleForm.imageUrl = res;
                });
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

            // 移除已经上传的图片
            handleRemove (file, fileList) {
                console.log(file, fileList);
            },
            // 显示已经上传的图片
            handlePictureCardPreview () {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;  
            },
            // 文件上传成功时的事件
            handleAvatarSuccess(res, file) {
                console.log(res,'或者',file);
                this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
                console.log("封面图地址：",this.ruleForm.imageUrl);
            },
            // 上传文件之前的事件，验证图片类型和大小用
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                // const isLt2M = file.size / 1024 / 1024 < 2;
            },
            // 查询博客全部标签
            selectArticleTag () {
                let params = {
                };
                let header = {
                    headers:{
                        token: this.token,
                        userId: this.userId
                    }
                }
                selectAllArticleTag(params,header).then(res => {
                    if (res.data.code === 0) {
                        this.articleTagLists = res.data.data;
                    } else {
                        this.$message.error("博客标签列表请求失败");
                    }
                })
            },
            // 查询博客全部分类
            selectArticleCategory () {
                let params = {
                };
                let header = {
                    headers:{
                        token: this.token,
                        userId: this.userId
                    }
                }
                selectAllArticleCategory(params,header).then(res => {
                    if (res.data.code === 0) {
                        this.articleCategoryLists = res.data.data;
                    } else {
                        this.$message.error("博客分类列表请求失败");
                    }
                })
            },
        },
        created () {
            // this.$nextTick(()=>{
            //     this.editor = new EditorBar('#editor');  //这个地方传入div元素的id 需要加#号
            //     // 配置 onchange 事件
            //     // this.editor.change = function () {          // 这里是change 不是官方文档中的 onchange
            //     // // 编辑区域内容变化时，实时打s印出当前内容
            //     //     console.log(this.txt.html())
            //     // };
            //     this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
            //     this.editor.create()     // 生成编辑器
            // })
            
        },
        mounted () {
            // this.selectArticleCategory();
            // this.selectArticleTag();
            // console.log(this.$refs['myEdit'].editor.txt.html() ,'获取富文本编辑器HTML');
        }
    }
    
</script>

<style lang="scss">
.articleContent{
    
    width: 85%;
    margin: 30px auto;
    padding: 20px;
    #editor{
        .w-e-text-container{
            height: 450px !important ;
        }
    }
    .uploadCoverPath{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
}
</style>