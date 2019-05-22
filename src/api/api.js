import axios from '@/utils/request';
const _env = process.env.NODE_ENV === 'production' ? 'pro' : 'dev';
let config = {
    headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
    }
};

// 登录注册

// 用户登录
export const userLogin = params => {
    return axios.post(`/RedWineMallGit/login/userLogin`, params, config)
};
// 检查账户名时候存在
export const registerUser = params => {
    return axios.post(`/RedWineMallGit/register/registerUser`, params, config)
};
// 检查账户名时候存在
export const checkUserName = params => {
    return axios.post(`/RedWineMallGit/register/checkExistUserName`, params, config)
};

// 
// 商品分类接口文档
// 
// 新增商品分类
export const addGoodsCategory = params => {
    return axios.post(`/RedWineMallGit/goodsCategory/addGoodsCategory`, params, config)
};
// 根据Id删除商品分类
export const deleteGoodsCategoryById = params => {
    return axios.post(`/RedWineMallGit/goodsCategory/deleteGoodsCategoryById`, params, config)
};
// 根据Id更新商品分类名称
export const updateGoodsCategoryById = params => {
    return axios.post(`/RedWineMallGit/goodsCategory/updateGoodsCategoryById`, params, config)
};
// 根据Id查找商品分类
export const selectGoodsCategoryById = params => {
    return axios.post(`/RedWineMallGit/goodsCategory/selectGoodsCategoryById`, params, config)
};
// 查找所有的商品分类
export const selectAllGoodsCategory = params => {
    return axios.post(`/RedWineMallGit/goodsCategory/selectAllGoodsCategory`, params, config)
};

/**
 * 
 * 红酒商城-商品品牌接口文档
 */

// 新增商品品牌
export const addGoodsBrand = params => {
    return axios.post(`/RedWineMallGit/goodsBrand/addGoodsBrand`, params, config)
};
// 根据Id删除商品品牌
export const deleteGoodsBrandById = params => {
    return axios.post(`/RedWineMallGit/goodsBrand/deleteGoodsBrandById`, params, config)
};
// 根据Id更新商品品牌名称
export const updateGoodsBrandById = params => {
    return axios.post(`/RedWineMallGit/goodsBrand/updateGoodsBrandById`, params, config)
};
// 根据Id查找商品品牌
export const selectGoodsBrandById = params => {
    return axios.post(`/RedWineMallGit/goodsBrand/selectGoodsBrandById`, params, config)
};
// 根据Id查找商品品牌
export const selectAllGoodsBrand = params => {
    return axios.post(`/RedWineMallGit/goodsBrand/selectAllGoodsBrand`, params, config)
};

/**
 * 
 * 红酒商城-文章标签接口文档
 */

//  新增文章标签
export const addArticleTag = params => {
    return axios.post(`/RedWineMallGit/articleTag/addArticleTag`, params, config)
};
//  根据Id更新博客标签名称
export const updateArticleTagById = params => {
    return axios.post(`/RedWineMallGit/articleTag/updateArticleTagById`, params, config)
};
//  根据Id查找博客标签
export const selectArticleTagById = params => {
    return axios.post(`/RedWineMallGit/articleTag/selectArticleTagById`, params, config)
};
//  根据Id删除博客标签
export const deleteArticleTagById = params => {
    return axios.post(`/RedWineMallGit/articleTag/deleteArticleTagById`, params, config)
};
//  查找所有的博客标签
export const selectAllArticleTag = params => {
    return axios.post(`/RedWineMallGit/articleTag/selectAllArticleTag`, params, config)
};

/**
 * 
 * 红酒商城-商品接口文档
 */
// 新增商品(只包含商品)
export const addGoods = params => {
    return axios.post(`/RedWineMallGit/goods/addGoods`, params, config)
};
// 新增商品图片（三张展示图）
export const addGoodsPhoto = params => {
    return axios.post(`/RedWineMallGit/goods/addGoodsPhoto`, params, config)
};
// 新增商品详情
export const addGoodsDetail = params => {
    return axios.post(`/RedWineMallGit/goods/addGoodsDetail`, params, config)
};
// 根据Id更新商品(只包含商品)
export const updateGoodsById = params => {
    return axios.post(`/RedWineMallGit/goods/updateGoodsById`, params, config)
};
// 根据Id更新商品图片
export const updateGoodsPhotoById = params => {
    return axios.post(`/RedWineMallGit/goods/updateGoodsPhotoById`, params, config)
};
// 根据Id更新商品详情
export const updateGoodsDetailById = params => {
    return axios.post(`/RedWineMallGit/goods/updateGoodsDetailById`, params, config)
};
// 根据Id查询商品(包括商品、商品标签、商品图片、商品详情)
export const selectGoodsById = params => {
    return axios.post(`/RedWineMallGit/goods/selectGoodsById`, params, config)
};
// 首页：查询符合筛选条件的上架商品列表(只包含商品、商品标签)
export const selectGoodsList = params => {
    return axios.post(`/RedWineMallGit/goods/selectGoodsList`, params, config)
};

// 获取商品总数、已上架商品总数、库存低于10的商品数
export const getGoodsData = params => {
    return axios.post(`/RedWineMallGit/goods/getGoodsData`, params, config)
};
// 获取今日下单量、今日销售额、订单总量
export const getOrderData = params => {
    return axios.post(`/RedWineMallGit/order/getOrderData`, params, config)
};

/**
 * 
 * 
 */
// 后台根据收货人姓名和订单状态筛选订单：name+statusList 
export const selectOrderList = params => {
    return axios.post(`/RedWineMallGit/order/selectOrderList`, params, config)
};
 
