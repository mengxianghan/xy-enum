import { isEmpty } from './utils/is'

export default class Enum {
    #opts
    #list

    constructor(data, options) {
        this.#opts = {
            fieldNames: {
                key: 'key',
                value: 'value',
                desc: 'desc',
            },
            ...options,
        }

        this.#list = data
    }

    /**
     * 获取对象
     * @param {string|number} val
     */
    get(val) {
        return this.#list.find(
            (item) => item[this.#opts.fieldNames.key] === val || item[this.#opts.fieldNames.value] === val
        )
    }

    /**
     * 获取 key
     * @param {string|number} val
     * @param {*} def 默认值，获取不到任何内容时返回
     * @return {*}
     */
    getKey(val, def = null) {
        const content = this.get(val)?.[this.#opts.fieldNames?.key]
        return !isEmpty(content) ? content : def
    }

    /**
     * 获取 value
     * @param {string|number} val
     * @param {*} def 默认值，获取不到任何内容时返回
     * @return {*}
     */
    getValue(val, def = null) {
        const content = this.get(val)?.[this.#opts.fieldNames?.value]
        return !isEmpty(content) ? content : def
    }

    /**
     * 获取 desc
     * @param {string|number} val
     * @param {*} def 默认值，获取不到任何内容时返回
     * @return {*}
     */
    getDesc(val, def = null) {
        const content = this.get(val)?.[this.#opts.fieldNames?.desc]
        return !isEmpty(content) ? content : def
    }

    /**
     * 获取选项列表
     * 获取到的内容适用于 checkbox，radio，select 组件
     * @param {object} fieldNames 自定义节点 label、value 的字段
     * @param {string} fieldNames.label
     * @param {string} fieldNames.value
     */
    getOptions(fieldNames = { label: this.#opts.fieldNames?.desc, value: this.#opts.fieldNames?.value }) {
        const keys = Object.keys(fieldNames)
        return this.#list.map((item) => {
            const record = {}
            for (let key of keys) {
                record[key] = item[fieldNames[key]]
            }
            return record
        })
    }

    /**
     * 获取列表
     */
    getList() {
        return this.#list
    }

    /**
     * 检查是否存在
     * @params {string|number} val
     */
    has(val) {
        return this.#list.some(
            (item) =>
                item[this.#opts.fieldNames?.[this.#opts.fieldNames?.key]] === val ||
                item[this.#opts.fieldNames?.value] === val
        )
    }

    /**
     * 是否相等
     * @param {string|number} val
     * @param {string|number} value
     */
    is(val, value) {
        const list = []
        if (Array.isArray(val)) {
            val.forEach((item) => {
                list.push(...[this.getKey(item), this.getValue(item)])
            })
        } else {
            list.push(...[this.getKey(val), this.getValue(val)])
        }
        return list.includes(value)
    }
}
