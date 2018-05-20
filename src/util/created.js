import fly from './fly.config'
import wepy from 'wepy'

export default function(wrapComponent) {
    return class HOC extends wrapComponent {
        onLoad (options, data) {
            super.onLoad && super.onLoad(options, data)
            // 重命名组件名，不然所有页面都会叫 HOC
            this.$name = wrapComponent.name

            super.onInfoBack && setTimeout(() => {
                super.onInfoBack({a: 1})
            }, 1000)
        }

        onShow() {
            super.onShow && super.onShow()
        }

        onReady() {
            super.onReady && super.onReady()
        }

        onHide() {
            super.onHide && super.onHide()
        }

        onBack(...rest) {
            super.onBack && super.onBack(...rest)
        }

        reqGet(url, data, config) {
            return fly.get(url, data, config)
        }

        reqPost(url, data, config) {
            return fly.post(url, data, config)
        }

        reqPut(url, data, config) {
            return fly.put(url, data, config)
        }

        reqDel(url, data, config) {
            return fly.delete(url, data, config)
        }

        navigateBack(delta = 1, ...rest) {
            if (typeof delta !== 'number') throw new Error('delta必须为数字')

            const Pages = this.getCurrentPages()
            let targetPage = Pages[Pages.length - 1 - delta]

            if (!targetPage) {
                targetPage = Pages[0]
            }
            targetPage.onBack(...rest)
            wx.navigateBack({ delta })
        }

        navigateTo(url, params = {}) {
            this.$navigate(url, {
                ...params
            })
        }

        redirectTo(url, params = {}) {
            this.$redirect(url, {
                ...params
            })
        }

        showModel(msg, options) {
            return wepy.showModal({
                content: msg,
                confirmColor: '#db3d3c',
                showCancel: false,
                ...options
            })
        }

        onShareAppMessage() {
            if (super.onShareAppMessage) {
                return super.onShareAppMessage()
            }
            return {
                title: '妈卖批',
                path: '/page/home/tab-home'
            }
        }
    }
}
