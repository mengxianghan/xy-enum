export default class Enum {
    #opts
    #enumMap

    constructor(map, options) {
        this.#opts = {
            fieldNames: {
                key: 'key',
                value: 'value',
                desc: 'desc',
            },
            ...options,
        }

        this.#enumMap = map.map((item) => ({
            ...item,
            key: item[this.#opts.fieldNames?.key],
            value: item[this.#opts.fieldNames?.value],
            desc: item[this.#opts.fieldNames?.desc],
        }))
    }

    /**
     * 获取对象
     */
    get(key) {
        return this.#enumMap.find((v) => v.key === key || v.value === key)
    }

    /**
     * 获取 key
     * @param key
     * @param def
     * @return {*}
     */
    getKey(key, def = null) {
        return this.get(key)?.key ?? def
    }

    /**
     * 获取 value
     * @param key
     * @param def
     * @return {*}
     */
    getValue(key, def = null) {
        return this.get(key)?.value ?? def
    }

    /**
     * 获取 desc
     * @param key
     * @param def
     * @return {*}
     */
    getDesc(key, def = null) {
        return this.get(key)?.desc ?? def
    }

    /**
     * 获取数据作为选项使用
     * 使用场景：checkbox，radio，select
     */
    getOptions(fieldNames = { label: 'desc', value: 'value' }) {
        const keys = Object.keys(fieldNames)
        return this.#enumMap.map((item) => {
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
        return this.#enumMap
    }

    /**
     * 检查
     */
    has(key) {
        return this.#enumMap.some((v) => v.key === key || v.value === key)
    }

    /**
     * 对比
     */
    is(key, value) {
        const list = []
        if (Array.isArray(key)) {
            key.forEach((item) => {
                list.push(...[this.getKey(item), this.getValue(item)])
            })
        } else {
            list.push(...[this.getKey(key), this.getValue(key)])
        }
        return list.includes(value)
    }
}
