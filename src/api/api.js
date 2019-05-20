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


