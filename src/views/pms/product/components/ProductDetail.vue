<template> 
  <el-card class="form-container" shadow="never">
	<el-steps :active="active" finish-status="success" align-center>
	  <el-step title="填写商品信息"></el-step>
	  <el-step title="上传商品图片"></el-step>
	  <el-step title="填写商品详情"></el-step>
	  <!-- <el-step title="选择商品关联"></el-step> -->
	</el-steps>
	<product-info-detail
	  v-show="showStatus[0]"
	  v-model="productParam"
	  :is-edit="isEdit"
	  @nextStep="nextStep">
	</product-info-detail>
	<product-sale-detail
	  v-show="showStatus[1]"
	  v-model="productParam.goodsPhoto"
	  :is-edit="isEdit"
      :productId='productID'
	  @nextStep="nextStep"
	  @prevStep="prevStep">
	</product-sale-detail>
	<product-attr-detail
	  v-show="showStatus[2]"
	  v-model="productParam.goodsDetail"
	  :is-edit="isEdit"
      :productIds='productID'
	  @finishCommit="finishCommit"
	  @prevStep="prevStep">
	</product-attr-detail>
	<!-- <product-relation-detail
	  v-show="showStatus[3]"
	  v-model="productParam"
	  :is-edit="isEdit"
	  @prevStep="prevStep"
	  >
	</product-relation-detail> -->
  </el-card>
</template>
<script>
  import ProductInfoDetail from './ProductInfoDetail';
  import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  import ProductRelationDetail from './ProductRelationDetail';
  import {createProduct,getProduct,updateProduct} from '@/api/product';
    import {selectGoodsById} from '@/api/api'
  const defaultProductParam = {     
        goods:{},
        goodsPhoto: null,
        goodsTagList: [],
        goodsDetail: null
  };
  export default {
	name: 'ProductDetail',
	components: {ProductInfoDetail, ProductSaleDetail, ProductAttrDetail, ProductRelationDetail},
	props: {
	  isEdit: {
		type: Boolean,
		default: false
	  }
    },
    computed: {
        editproductId () {
            return this.$route.query.id;
        }
    },
	data() {
	  return {
		active: 0,
		productParam: {
            goods:{},
            goodsPhoto: null,
            goodsTagList: [],
            goodsDetail: null
        },
        showStatus: [true, false, false, false],
        productID: '',
	  }
	},
	created(){
	  if(this.isEdit){
		selectGoodsById({id: this.editproductId}).then(res=>{
            this.productParam = res.data.data;
		});
      } else {
          this.productParam = defaultProductParam
      }
	},
	methods: {
	  hideAll() {
		for (let i = 0; i < this.showStatus.length; i++) {
		  this.showStatus[i] = false;
		}
	  },
	  prevStep() {
		if (this.active > 0 && this.active < this.showStatus.length) {
		  this.active--;
		  this.hideAll();
		  this.showStatus[this.active] = true;
		}
	  },
	  nextStep(productID) {
          if (productID) {
            this.productID = productID;
          }
            if (this.active < this.showStatus.length - 1) {
                this.active++;
                this.hideAll();
                this.showStatus[this.active] = true;
            }
	  },
	  finishCommit(isEdit) {
		this.$confirm('是否要提交该产品', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
		  if(isEdit){
			updateProduct(this.$route.query.id,this.productParam).then(response=>{
			  this.$message({
				type: 'success',
				message: '商品数据更行成功啦',
				duration:1000
			  });
            //   this.$router.back();
            this.$router.push({
                  path: '/pms/product'
              })
			});
		  }else{
              this.$message({
                    type: 'success',
                    message: '新的商品添加成功啦',
                    duration:1000
			  });
              this.$router.push({
                  path: '/pms/product'
              })
                // createProduct(this.productParam).then(response=>{
                // this.$message({
                //     type: 'success',
                //     message: '提交成功',
                //     duration:1000
                // });
                // location.reload();
                // });
		  }
		})
	  }
	}
  }
</script>
<style>
  .form-container {
	width: 1000px;
  }
</style>


