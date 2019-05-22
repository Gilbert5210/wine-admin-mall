<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="addProductAttrCate()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productAttrCateTable"
                style="width: 100%"
                :data="goodsCategoryLists"
                v-loading="listLoading"
                border>
        <el-table-column label="编号" type="index" width="100" align="center">
          <!-- <template slot-scope="scope">{{scope.row.id}}</template> -->
        </el-table-column>
        <el-table-column label="类型名称" align="center">
            <template slot-scope="scope">{{scope.row.categoryName}}</template>
        </el-table-column>
        <el-table-column label="类型序号" width="100" align="center">
            <template slot-scope="scope">{{scope.row.type}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="center">
            <template slot-scope="scope">{{scope.row.createAt}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="200" align="center">
            <template slot-scope="scope">{{scope.row.updateAt}}</template>
        </el-table-column>
        <!-- <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="getAttrList(scope.$index, scope.row)">属性列表
            </el-button>
            <el-button
              size="mini"
              @click="getParamList(scope.$index, scope.row)">参数列表
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="goodsCategoryLists.length">
      </el-pagination>
    </div>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="productAttrCate" :model="productAttrCate" :rules="rules" label-width="120px">
            <el-form-item label="分类序号" prop="type">
                <el-input v-model="productAttrCate.type" :disabled="editingCategroy" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="productAttrCate.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelKindBtn('productAttrCate')">取 消</el-button>
            <el-button type="primary" @click="handleConfirm('productAttrCate')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
    import {fetchList,createProductAttrCate,deleteProductAttrCate,updateProductAttrCate} from '@/api/productAttrCate'
    import {addGoodsCategory, deleteGoodsCategoryById,
            updateGoodsCategoryById, selectGoodsCategoryById,
            selectAllGoodsCategory
    } from '@/api/api';
  export default {
    name: 'productAttrCateList',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        dialogVisible: false,
        dialogTitle:'',
        editingCategroy: false,
        goodsCategoryLists: [],
        productAttrCate:{
            name:'',
            type:'',
            id: ''
        },
        rules: {
            name: [
                { required: true, message: '请输入类型名称', trigger: 'blur' }
            ],
            type:[
                { required: true, message: '请输入序号', trigger: 'blur' }
            ]
        }
      }
    },
    created() {
        this.getGoodsCategory();
    //   this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      addProductAttrCate() {
        this.dialogVisible = true;
        this.dialogTitle = "添加类型";
        this.editingCategroy = false;
        this.productAttrCate.name = '';
        this.productAttrCate.type = '';
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteGoodsCategoryById({id: row}).then(res =>{
                if (res.data.code) {
                    this.$message.error(res.data.msg || '删除分类失败');
                    return
                }
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration:1000
                });
                this.getGoodsCategory();
            });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.editingCategroy = true;
        this.dialogTitle = "编辑类型";
        this.productAttrCate.name = row.categoryName;
        this.productAttrCate.id = row.id;
        this.productAttrCate.type = row.type;
      },
      getAttrList(index, row) {
        this.$router.push({path: '/pms/productAttrList',query:{cid:row.id,cname:row.name,type:0}})
      },
      getParamList(index, row) {
        this.$router.push({path: '/pms/productAttrList',query:{cid:row.id,cname:row.name,type:1}})
      },
        cancelKindBtn (formName) {
            // this.$refs[formName].resetFields();
            this.dialogVisible = false;
            this.productAttrCate.name = '';
            this.productAttrCate.type = '';
            this.productAttrCate.id = '';
        },
        handleConfirm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    categoryName: this.productAttrCate.name
                };
                if(this.dialogTitle==="添加类型"){
                    params.type = this.productAttrCate.type;
                    addGoodsCategory(params).then(res => {
                        console.log(res);
                        if (res.data.code) {
                            this.$message.error(res.data.msg || '新增分类失败');
                            return
                        }
                        this.$message({
                            message: '类型添加成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.dialogVisible = false;
                        this.getGoodsCategory();
                    });
                } else {
                    params.id = this.productAttrCate.id;
                    updateGoodsCategoryById(params).then(res=>{
                        if (res.data.code) {
                            this.$message.error(res.data.msg || '更新分类失败');
                            return
                        }
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration:1000
                        });
                        this.dialogVisible = false;
                        this.getGoodsCategory();
                    });
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        getGoodsCategory () {
            selectAllGoodsCategory().then(res => {
                if (res.data.code) {
                    this.$message.error(res.data.msg || '查询所有分类失败');
                }
                this.goodsCategoryLists = res.data.data;      
                this.listLoading = false;              
            });
        },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


