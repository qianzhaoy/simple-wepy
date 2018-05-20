/**
 * 表单验证
 * 在页面内引用后，加入mixins
 * 再在class内定义一个 vuelidation 字段来做验证配置。具体配置请参考如下:
 * vuelidation = {
 *      password: [
 *          { type: 'required', msg: '请输入密码' },
 *          ...
 *          ...
 *      ]
 * }
 *      
 *      调用 validate(cb) 用作验证，传入一个回调函数，如果被验证是一个对象，validate(key, cb)
 *      如 data = { fromData: { password: ''} }; validate('fromData', cb)
 */

import wepy from 'wepy'
import _get from 'lodash.get'

import { mobileTest, passwordTest, inputYuan, usernameTest, idCard } from '../util/regexp'

const methods = {
    required(value, msg = '必填') {
        if (value === null || value === undefined) {
            return [false, msg]
        }

        if (typeof value === 'string') {
            value = value.trim()
        }
        value = value.toString()
        return [!!value, msg]
    },
    username(value, msg = '用户名内不能含有非法字符,且长度必须大于3小于20') {
        const valid = usernameTest.test(value)
        return [valid, msg]
    },
    password(value, msg = '密码必须大于6位小于12位的数字或字母， 且不包含特殊字符') {
        const valid = passwordTest.test(value)
        return [valid, msg]
    },
    mobile(value, msg = '请填写正确的手机号') {
        const valid = mobileTest.test(value)
        return [valid, msg]
    },
    idCard(value, msg = '请填写正确的身份证号码') {
        const valid = idCard.test(value)
        return [valid, msg]
    }
}

function setErrMsg(obj, key, msg) {
    if (obj[key]) {
        obj[key].push(msg)
    } else {
        obj[key] = [msg]
    }
}

export default class Validation extends wepy.mixin {
    validate(path, cb) {
        const vm = this
        const { vuelidation } = vm
        const errMsgs = {}
        let isValid = true

        if (!vuelidation) {
            console.error('请先在class内定义vuelidation字段')
        }

        if (!cb && typeof path === 'function') {
            cb = path
            path = void 6
        }

        for (const key in vuelidation) {
            const validConfig = vuelidation[key]
            validConfig.forEach(config => {
                const message = vm.targetValid(key, path, config)
                if (message) {
                    setErrMsg(errMsgs, key, message)
                    isValid = false
                }
            })
        }
        cb && cb(isValid, errMsgs)
    }

    /**
     * 验证表单字段
     * @param {String} key 需要验证的字段
     * @param {String} path data内需要做验证的对象path
     * @param {Object} config 被验证字段设置的一个配置
     */
    targetValid(key, path, config) {
        const targetVal = _get(this.data, path, this.data)[key]
        const { type, msg } = config

        const [ isValid, errMsg ] = methods[type] ? methods[type](targetVal, msg) : []

        if (isValid === undefined) {
            throw new Error(`找不到${type}的验证方法，请配置一个${type}验证方法`)
        }
        return !isValid && errMsg
    }
}
