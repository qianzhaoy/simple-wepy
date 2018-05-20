export const idCard = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/

// 复杂版手机验证	^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
export const mobileTest = /^1[0-9]{10}$/

// 密码必须含有字母和数字	return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(val)
export const passwordTest = /^[a-zA-Z0-9]{6,12}$/

export const usernameTest = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/

export const emailTest = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
