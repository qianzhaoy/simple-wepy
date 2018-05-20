const Fly = require('../util/wx.umd.min')
const Qs = require('qs')
const fly = new Fly()

fly.config.timeout = 8000
fly.config.parseJson = true

fly.interceptors.request.use((config) => {
    !config.hideLoading && wx.showLoading()

    if (config.method === 'POST' || config.method === 'PUT') {
        config.body = Qs.stringify(config.body)
    }

    const Authorization = wx.getStorageSync('Authorization')
    if (Authorization) {
        config.headers.Authorization = 'Bearer ' + (Authorization || '')
    }

    return config
}, (err) => {
    return Promise.reject(err)
})

fly.interceptors.response.use((res) => {
    wx.hideLoading()
    if (!res.data.success) {
        switch (res.data.code) {
        case 422:
            const flag = Array.isArray(res.data.data) && res.data.data.length
            showDialog(flag ? res.data.data[0].message : (res.data.message || '网络错误'))
            break
        case 401:
            showDialog('您还未登录~')
            break
        default:
            showDialog(res.data.message || '服务器抽风了~')
            break
        }
        return Promise.reject(res)
    }
    return res
}, (err) => {
    wx.hideLoading()
    return err
})

function showDialog(content) {
    wx.showModal({
        content,
        showCancel: false,
        confirmColor: '#db3d3c'
    })
}

export default fly
