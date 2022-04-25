import {pinyin} from "pinyin-pro";

const install = function (Vue) {
    // 向 Vue.prototype 上挂载方法
    Object.defineProperties(Vue.prototype, {
        $pinyin: {
            get() {
                return {
                    change: (word) => pinyin(word, {toneType: 'none', type: 'array'}).join(''),
                }
            }
        }
    })
}
export default install