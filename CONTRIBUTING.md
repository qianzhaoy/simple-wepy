# 开发指南

## Git分支

日常开发分支请在 `origin/dev` 分支下开发

## 编辑器

建议使用 [`Visual Studio Code`](https://code.visualstudio.com/Download)，将`.wpy`文件关联`Vue`，并利用好代码片段，快速生成页面初始模板，并开启ESLint代码风格检查。

## 目录结构
> 开发前请先了解所有目录结构

    │  .editorconfig
    │  .eslintignore
    │  .eslintrc.js
    │  .gitignore
    │  .prettierrc
    │  .wepycache
    │  .wepyignore
    │  CONTRIBUTING.md
    │  min.config.json // minui 组件配置文件
    │  package.json
    │  project.config.json
    │  README.md
    │  wepy.config.js
    │
    └─src
        │  app.wpy
        │
        ├─api // 接口地址
        │
        ├─components // wepy 静态组件
        │  ├─tabbar
        │
        ├─images // 图片
        │
        ├─mixins // page 的 mixins
        |      validation.js
        │
        ├─pages // 所有页面
        |  |
        ├─style
        │  │  app.less // 全局样式（引入了公共样式和所有组件样式）
        |  |
        │  ├─common // 公共样式 以及 变量
        |  |
        │  ├─components // 静态组件样式
        |  |
        │  ├─home // 页面样式
        │
        └─util // 工具类
            │  created.js // 页面全局功能，需在页面引入并调用，参考现有页面 ( 注意，component无法使用全局方法，建议用event或者$parent )
            |  fly.config.js // 请求拦截器配置
            │  template.js
            │  tool.js // 工具
            │  wx.umd.min.js // fly.js源码，对标Vue的axios
            │
            └─wxs
                    filter.wxs // 过滤器

## created.js

在这个js内，封装全局的使用方法，比mixins更加灵活，但更麻烦。
- 内部增加了一个`onBack`生命周期，可以用在`navigateBack`时来传递数据。但是同样必须要用js内部封装的navigateBack方法来回退页面。为了API使用一致性，同样增加了`navigateTo`、`redirectTo`方法。
- 为了方便使用RESTful使用场景和方便接口请求。增加了四个全局方法。`reqGet`、`reqPost`、`reqPut`、`reqDel`
- 还有自定义转发`onShareAppMessage`

## 开发规范

### 预编译
- html -> Pug
- css -> Less (建议使用BEM命名规范)
- js -> ES6

### class Page
```javascript
// script 模板

<script>
import wepy from 'wepy'
import created from '../../util/created.js'

// 类名首字母大写
class Login extends wepy.page {
    // 每个属性之间空一行， 并严格按照以下顺序书写
    config = {}

    mixins = []

    data = {}

    ...自定义属性

    computed = {}

    watch = {}

    ...生命周期钩子

    methods = {}

    events = {}

    ...内部函数方法

    wxs = {}

    components = {}
}

// 直接 export default created(Login) 编译后会报错
const HOC = created(Login)
export default HOC
</script>
```

### class Component

与Page一样，多了一个 `props` 属性并且没有 `config`， 把 `props` 放置顺序代替 `config` 即可。

### class Mixins

参考Page

### ESLint

本项目使用了 `ESLint` 来做代码规范校验，写代码时需要严格执行该规范。`.eslintrc.js` 文件为规范的配置文件。
[官方代码规则文档](http://eslint.cn/docs/rules/)

## 组件

现在 wepy 不支持原生组件，所以使用wepy编译组件的时候的一些注意事项。

- 父组件传值时，使用 `.sync` 同步组件数据时，父组件的数据必须放在 `data` 下一级，不能放在 `data` 下的对象内。

- wepy 组件为静态组件，故使用时若要循环，要放在 `repeat` 标签内，若要用多个就要在 `components` 再加一个ID

- 项目使用了第三方组件库（[minui](https://meili.github.io/min/docs/minui/index.html)）,此组件库为原生组件，所以不适用以上注意点。

-  关于编译的问题，因为组件样式是在 `app.less` 内引入的，所以直接修改组件样式不会立即更新，需要在修改 `app.less` 保存，才行（如打个空格保存）。


## 表单验证

表单验证方法放在了 `mixins/vuelidation.js` , 需要页面内引入并加入 `mixins: [ vuelidation ]` , 然后在 `Class` 内增加一个 自定义属性 `vuelidation` 来配置校验方法。例：

```javascript
    class Login extends wepy.page {
        vuelidation = {
            username: [
                { type: 'required', msg: '请输入账号' },
                { type: 'username' }
            ],
            password: [
                { type: 'required', msg: '请输入密码' }
            ]
        }
    }
```

关于 `type`，可以在 `mixins/vuelidation.js` 内的 `methods` 对象里添加验证方法
