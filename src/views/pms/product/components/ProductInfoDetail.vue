<template>
  <div style="margin-top: 50px">
    <el-form :model="productInfo" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
        <el-form-item label="商品名称：" prop="chineseName">
            <el-input v-model="productInfo.chineseName"></el-input>
        </el-form-item>
        <el-form-item label="英文名称：" prop="englishName">
            <el-input v-model="productInfo.englishName"></el-input>
        </el-form-item>
        <el-form-item label="商品简介：" >
            <el-input
                :autoSize="true"
                v-model="productInfo.introduction"
                type="textarea"
                placeholder="请输入商品简介内容">
            </el-input>
        </el-form-item>
        <el-form-item label="推荐理由：" >
            <el-input
                :autoSize="true"
                v-model="productInfo.reason"
                type="textarea"
                placeholder="请输入商品推荐理由">
            </el-input>
        </el-form-item>
        <el-form-item label="商品类型：" prop="categoryId">
            <el-select v-model="productInfo.categoryId" placeholder="请选择">
                <el-option
                    v-for="item in goodsCategoryLists"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品产地：">
            <el-input v-model="productInfo.placeOfOrigin" :autoSize="true"></el-input>
        </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="productInfo.brandId"
          @change="handleBrandChange"
          placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.id"
            :label="item.brandName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签：">
        <el-select
          v-model="tagIdList"
          multiple
          @change="handlerChange"
          placeholder="请选择标签">
          <el-option
            v-for="item in articleTagList"
            :key="item.id"
            :label="item.tagName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="评价星级：">
            <el-rate
                v-model="productInfo.starLevel"
                :colors="colors">
            </el-rate>
      </el-form-item>
      <el-form-item label="推荐等级：">
            <el-rate
                v-model="productInfo.recommendLevel"
                :colors="colors">
            </el-rate>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input type="number" v-model.number="productInfo.discountPrice"></el-input>
      </el-form-item>
      <el-form-item label="市场价：">
        <el-input type="number" v-model.number="productInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：" prop="stockNum">
        <el-input  type="number" v-model.number="productInfo.stockNum"></el-input>
      </el-form-item>
      <!-- <el-form-item label="计量单位：">
        <el-input v-model="productInfo.unit"></el-input>
      </el-form-item> -->
      <el-form-item label="商品规格：">
        <el-input  type="number" v-model.number="productInfo.capacity" style="width: 300px"></el-input>
        <span style="margin-left: 20px">ML</span>
      </el-form-item>
      <el-form-item label="材料/成分：">
        <el-input v-model="productInfo.component" :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="酒精含量：">
        <el-input  type="number" v-model.number="productInfo.alcoholContent"  :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="建议醒酒时间：">
        <el-input v-model="productInfo.wakeTime" :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="建议搭配菜肴：">
        <el-input v-model="productInfo.adviseFood" :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="productInfo.remark" :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="关键字：">
        <el-input v-model="productInfo.keyword" :autoSize="true"></el-input>
      </el-form-item>
      <el-form-item label="年份：">
          <el-input v-model.number="productInfo.year"  oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入年份"></el-input>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch
          v-model="productInfo.isSale"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否打折扣：">
        <el-switch
          v-model="productInfo.isDiscount"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否推荐：">
        <el-switch
          v-model="productInfo.isRecommend"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否新品：">
        <el-switch
          v-model="productInfo.isNew"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品封面图：" class="uploadCoverPath">
        <el-upload
            class="avatar-uploader"
            accept='.jpg,.jpeg,.png,.gif,JPG,.JPEG,'
            action=""
            :auto-upload='false'
            :on-change="getFile"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="goodsCover" :src="goodsCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList as fetchBrandList} from '@/api/brand'
  import {getProduct} from '@/api/product';
    import MultiUpload from '@/components/Upload/multiUpload'
    import {
        selectAllGoodsCategory, selectAllGoodsBrand,
        selectAllArticleTag, addGoods, updateGoodsById
    } from '@/api/api';
  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    components: {
        MultiUpload
    },
    data() {
      return {
        hasEditCreated:false,
        //选中商品分类的值
        selectProductCateValue: [],
        productCateOptions: [],
        brandOptions: [],
        articleTagList: [],
        tagIdList: [],
        goodsCover: '',
        productID: '',
        category: '',      //保存单个分类
        goodsCategoryLists: [],  //商品所有分类数组
        productInfo: {},
        //     chineseName: '',
        //     englishName: '',
        //     categoryId: '',     //分类id
        //     // categoryName: '',    //分类名称
        //     goodsCover: '',
        // },
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        rules: {
          chineseName: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          subTitle: [{required: true, message: '请输入商品英文名称', trigger: 'blur'}],
          productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
        //   brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
          description: [{required: true, message: '请输入商品介绍', trigger: 'blur'}],
          stockNum: [{required: true, message: '该项为必填项', trigger: 'blur'}]
        }
      };
    },
    created() {
        //   this.getProductCateList();
        this.getBrandList();
        this.getGoodsCategory();
        this.getArticleTagList();
    },
    computed:{
    //   //商品的编号
    //   productId(){
    //     return this.value.goods.id;
    //   }
    // productInfo () {
    //         if (this.value && this.isEdit) {
    //             console.log(this.value);
    //             let obj = this.value.goods;
    //             // obj['tagIdList'] = [];
    //             // this.value.goodsTagList && this.value.goodsTagList.forEach(element => {
    //             //     obj.tagIdList.push(element.id);
    //             // });
    //             return obj;
    //         }
    //     }
    },
    watch: {
        value (newVal, oldVal){
             if (this.isEdit && this.value) {
                console.log("商品基本信息：", this.value);
                this.productInfo = this.value.goods;
                this.value.goodsTagList.forEach( v=> {
                    this.tagIdList.push(v.id);
                })
            }
        }
    //   productId:function(newValue){
    //     if(!this.isEdit)return;
    //     if(this.hasEditCreated)return;
    //     if(newValue===undefined||newValue==null||newValue===0)return;
    //     this.handleEditCreated();
    //   },
    //   selectProductCateValue: function (newValue) {
    //     if (newValue != null && newValue.length === 2) {
    //       this.value.productCategoryId = newValue[1];
    //       this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
    //     } else {
    //       this.value.productCategoryId = null;
    //       this.value.productCategoryName=null;
    //     }
    //   }
    },
    methods: {
        handlerChange (value) {
            // debugger
            this.productInfo.tagIdList = value;
            console.log(value);
        },
      //处理编辑逻辑
      handleEditCreated(){
        if(this.value.productCategoryId!=null){
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getBrandList() {
        selectAllGoodsBrand().then(res => {
            this.brandOptions = [];
            this.brandOptions = res.data.data;
        //   for (let i = 0; i < brandList.length; i++) {
        //     this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
        //   }
        });
      },
      getArticleTagList() {
        selectAllArticleTag().then(response => {
          this.articleTagList = response.data.data;
        //   this.total = response.data.data.length;
        });
      },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;i<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.isEdit) {
                    updateGoodsById(this.productInfo).then( res => {
                        if (res.data.code) {
                            this.$message.error(res.data.msg || '更新商品基本信息失败');
                            return
                        }
                        // 保存当前新增商品的id
                        this.productID = res.data.data;
                        this.$message.success(res.data.msg || '更新商品基本信息成功');
                        this.$emit('nextStep',this.productID);
                    });
                    return
                }
                addGoods(this.productInfo).then( res => {
                    if (res.data.code) {
                        this.$message.error(res.data.msg || '新增商品基本信息失败');
                        return
                    }
                    // 保存当前新增商品的id
                    this.productID = res.data.data;
                    this.$message.success(res.data.msg || '新增商品基本信息成功');
                    this.$emit('nextStep',this.productID);

                });
            } else {
                    this.$message({
                        message: '请填写必填项',
                        type: 'error',
                        duration:1000
                    });
                    return false;
            }
        });
      },
      handleBrandChange(val) {
        let brandName = '';
        // for (let i = 0; i < this.brandOptions.length; i++) {
        //   if (this.brandOptions[i].value === val) {
        //     brandName = this.brandOptions[i].label;
        //     break;
        //   }
        // }
        // this.value.brandName = brandName;
      },
        // 获取所有分类列表   
        getGoodsCategory () {
            selectAllGoodsCategory().then(res => {
                if (res.data.code) {
                    this.$message.error(res.data.msg || '查询所有分类失败');
                }
                this.goodsCategoryLists = res.data.data;      
            });
        },
        // 获取封面图
        async getFile (res,file) {
            await this.getBase64(res.raw).then( res => {
                this.productInfo.goodsCover = res;
                this.goodsCover = res;
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
        // 上传文件之前的事件，验证图片类型和大小用
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
    }
  }
</script>

<style lang='scss'>
.uploadCoverPath{
    .avatar-uploader {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
            object-fit: contain;
        }
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
    
}
</style>
