<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productSaleForm" label-width="120px" style="width: 600px" size="small">

        <el-form-item label="商品相册：">
            <multi-upload v-model="selectProductAttrPics"></multi-upload>
        </el-form-item>
      <!-- <el-form-item label="商品上架：">
        <el-switch
          v-model="value.publishStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <span style="margin-right: 10px">新品</span>
        <el-switch
          v-model="value.newStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
        <span style="margin-left: 10px;margin-right: 10px">推荐</span>
        <el-switch
          v-model="value.recommandStatus"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>
      <!-- <el-form-item label="服务保证：">
        <el-checkbox-group v-model="selectServiceList">
          <el-checkbox :label="1">无忧退货</el-checkbox>
          <el-checkbox :label="2">快速退款</el-checkbox>
          <el-checkbox :label="3">免费包邮</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <!-- <el-form-item label="建议醒酒时间和搭配菜肴：">
        <el-input v-model="value.detailTitle"></el-input>
      </el-form-item>
      <el-form-item label="推荐理由：">
        <el-input v-model="value.detailDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品关键字：">
        <el-input v-model="value.keywords"></el-input>
      </el-form-item>
      <el-form-item label="推荐等级：">
            <el-rate
                v-model="value.sort"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
      </el-form-item>
      <el-form-item label="商品备注：">
        <el-input v-model="value.note" type="textarea" :autoSize="true"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="选择优惠方式：">
        <el-radio-group v-model="value.promotionType" size="small">
          <el-radio-button :label="0">无优惠</el-radio-button>
          <el-radio-button :label="1">特惠促销</el-radio-button>
          <el-radio-button :label="2">会员价格</el-radio-button>
          <el-radio-button :label="3">阶梯价格</el-radio-button>
          <el-radio-button :label="4">满减价格</el-radio-button>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchList as fetchMemberLevelList} from '@/api/memberLevel'
  import MultiUpload from '@/components/Upload/multiUpload'
   import {
        addGoodsPhoto, updateGoodsPhotoById
    } from '@/api/api';
  export default {
    name: "ProductSaleDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      },
      productId:{
          type:String
      }
    },
    components: {MultiUpload},
    data() {
      return {
        //日期选择器配置
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        selectProductAttrPics: []
      }
    },
    watch: {
        value (newVal, oldVal) {
            if (this.isEdit && this.value) {
                console.log("商品图片信息：",this.value);
                this.selectProductAttrPics.push(this.value.photo1);
                this.selectProductAttrPics.push(this.value.photo2);
                this.selectProductAttrPics.push(this.value.photo3);
            }
        }
    },
    created() {
    //   if (this.isEdit) {
    //         if (this.value && this.value.photo1) {
    //             console.log("商品图片信息：",this.value);
    //             this.selectProductAttrPics.push(this.value.photo1);
    //             this.selectProductAttrPics.push(this.value.photo2);
    //             this.selectProductAttrPics.push(this.value.photo3);
    //         }
    //         console.log("商品图片信息：",this.selectProductAttrPics);
           
    //     // this.handleEditCreated();
    //   } else {
    //     // fetchMemberLevelList({defaultStatus: 0}).then(response => {
    //     //   let memberPriceList = [];
    //     //   for (let i = 0; i < response.data.length; i++) {
    //     //     let item = response.data[i];
    //     //     memberPriceList.push({memberLevelId: item.id, memberLevelName: item.name})
    //     //   }
    //     //   this.value.memberPriceList = memberPriceList;
    //     // });
    //   }
    },
    computed: {
      //选中的服务保证
      selectServiceList: {
        get() {
          let list = [];
          if (this.value.serviceIds === undefined || this.value.serviceIds == null || this.value.serviceIds === '') return list;
          let ids = this.value.serviceIds.split(',');
          for (let i = 0; i < ids.length; i++) {
            list.push(Number(ids[i]));
          }
          return list;
        },
        set(newValue) {
          let serviceIds = '';
          if (newValue != null && newValue.length > 0) {
            for (let i = 0; i < newValue.length; i++) {
              serviceIds += newValue[i] + ',';
            }
            if (serviceIds.endsWith(',')) {
              serviceIds = serviceIds.substr(0, serviceIds.length - 1)
            }
            this.value.serviceIds = serviceIds;
          } else {
            this.value.serviceIds = null;
          }
        }
      },
      editProductId () {
          return this.$route.query.id;
      }
    },
    methods: {
      handleEditCreated() {
        let ids = this.value.serviceIds.split(',');
        console.log('handleEditCreated', ids);
        for (let i = 0; i < ids.length; i++) {
          this.selectServiceList.push(Number(ids[i]));
        }
      },
      handleRemoveProductLadder(index, row) {
        let productLadderList = this.value.productLadderList;
        if (productLadderList.length === 1) {
          productLadderList.pop();
          productLadderList.push({
            count: 0,
            discount: 0,
            price: 0
          })
        } else {
          productLadderList.splice(index, 1);
        }
      },
      handleAddProductLadder(index, row) {
        let productLadderList = this.value.productLadderList;
        if (productLadderList.length < 3) {
          productLadderList.push({
            count: 0,
            discount: 0,
            price: 0
          })
        } else {
          this.$message({
            message: '最多只能添加三条',
            type: 'warning'
          });
        }
      },
      handleRemoveFullReduction(index, row) {
        let fullReductionList = this.value.productFullReductionList;
        if (fullReductionList.length === 1) {
          fullReductionList.pop();
          fullReductionList.push({
            fullPrice: 0,
            reducePrice: 0
          });
        } else {
          fullReductionList.splice(index, 1);
        }
      },
      handleAddFullReduction(index, row) {
        let fullReductionList = this.value.productFullReductionList;
        if (fullReductionList.length < 3) {
          fullReductionList.push({
            fullPrice: 0,
            reducePrice: 0
          });
        } else {
          this.$message({
            message: '最多只能添加三条',
            type: 'warning'
          });
        }
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      handleNext() {
           let params = {};
           this.selectProductAttrPics.forEach((v,index) => {
              params[`photo${index+1}`] = v;
          })
          if (this.isEdit && this.value) {
            //   更新的时候使用商品图片表的id
             params.id = this.value.id;
            updateGoodsPhotoById(params).then( res => {
                if (res.data.code) {
                    this.$message.error(res.data.msg || '新增商品基本信息失败');
                    return
                }
                this.$message.success(res.data.msg || '新增商品基本信息成功');
                this.$emit('nextStep')
            });
            return
          };
            params.goodsId = this.productId ? this.productId : this.editProductId;
            //   console.log('参数',params);
            addGoodsPhoto(params).then( res => {
                if (res.data.code) {
                    this.$message.error(res.data.msg || '新增商品基本信息失败');
                    return
                }
                this.$message.success(res.data.msg || '新增商品基本信息成功');
                this.$emit('nextStep')
            });
        
      }
    }
  }
</script>

<style scoped>
  .littleMargin {
    margin-top: 10px;
  }
</style>
