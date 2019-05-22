'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://127.0.0.1:8089/"',
    BASE_URL: '"http://127.0.0.1:8089/"',
    RongYunKey: '"qd46yzrfqhb0f"'
})