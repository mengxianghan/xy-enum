import type { EnumItem, EnumValue } from './types'

class Enum {
  #items: EnumItem[]

  constructor(items: EnumItem[]) {
    // 验证数据完整性
    this.validateItems(items)
    this.#items = [...items]
  }

  /**
   * 验证输入数据的完整性
   */
  private validateItems(items: EnumItem[]): void {
    if (!Array.isArray(items)) {
      throw new TypeError('输入数据必须是数组')
    }

    items.forEach((item, index) => {
      // 必填字段验证
      const requiredFields = ['label']
      const missingRequiredFields = requiredFields.filter(field => !(field in item))

      if (missingRequiredFields.length > 0) {
        throw new Error(`第 ${index + 1} 项缺少必要字段: ${missingRequiredFields.join(', ')}`)
      }

      // 虽然类型定义已经确保了 key 或 value 至少有一个存在，
      // 但为了在运行时也能捕获错误，保留这个检查
      if (!('key' in item) && !('value' in item)) {
        throw new Error(`第 ${index + 1} 项必须包含 key 或 value 字段中的至少一个`)
      }
    })
  }

  /**
   * 使用 key 或 value 获取一条完整数据
   * @param searchValue 搜索值（自动匹配 key 或 value）
   * @param defaultValue 当找不到时返回的默认值
   */
  get(
    searchValue: EnumValue,
    defaultValue?: EnumItem,
  ): EnumItem | undefined {
    // 先尝试匹配 value
    let item = this.#items.find(item => item.value === searchValue)

    // 如果没找到，再尝试匹配 key
    if (!item) {
      item = this.#items.find(item => item.key === searchValue)
    }

    return item ?? defaultValue
  }

  /**
   * 使用 key 或 value 获取 label 值
   * @param searchValue 搜索值（自动匹配 key 或 value）
   * @param defaultValue 当找不到时返回的默认值
   */
  getLabel(
    searchValue: EnumValue,
    defaultValue?: EnumValue,
  ): EnumValue | undefined {
    const item = this.get(searchValue)
    return item?.label ?? defaultValue
  }

  /**
   * 使用 key 或 value 获取 value 值
   * @param searchValue 搜索值（自动匹配 key 或 value）
   * @param defaultValue 当找不到时返回的默认值
   */
  getKey(
    searchValue: EnumValue,
    defaultValue?: EnumValue,
  ): EnumValue | undefined {
    const item = this.get(searchValue)
    // 如果 item 存在但 key 不存在，则返回 defaultValue
    if (item && !('key' in item)) {
      return defaultValue
    }
    return item?.key ?? defaultValue
  }

  /**
   * 使用 key 或 value 获取 value 值
   * @param searchValue 搜索值（自动匹配 key 或 value）
   * @param defaultValue 当找不到时返回的默认值
   */
  getValue(
    searchValue: EnumValue,
    defaultValue?: EnumValue,
  ): EnumValue | undefined {
    const item = this.get(searchValue)
    // 如果 item 存在但 value 不存在，则返回 defaultValue
    if (item && !('value' in item)) {
      return defaultValue
    }
    return item?.value ?? defaultValue
  }

  /**
   * 使用 key 或 value 获取 desc 值
   * @param searchValue 搜索值（自动匹配 key 或 value）
   */
  getDesc(searchValue: EnumValue): EnumValue | undefined {
    const item = this.get(searchValue)
    return item?.desc
  }

  /**
   * 获取数据列表，支持条件过滤
   * @param filter 过滤函数或过滤条件对象
   */
  getList(filter?: ((item: EnumItem) => boolean) | Partial<EnumItem>): EnumItem[] {
    let result = [...this.#items]

    if (filter) {
      if (typeof filter === 'function') {
        // 如果是函数，直接使用函数过滤
        result = result.filter(filter)
      }
      else {
        // 如果是对象，使用对象的每个属性进行过滤
        result = result.filter((item) => {
          return Object.entries(filter).every(([key, value]) => {
            return item[key as keyof EnumItem] === value
          })
        })
      }
    }

    return result
  }

  /**
   * 获取 options 数组，支持自定义返回字段名和条件过滤
   * @param options 配置选项
   * @param options.labelField 自定义 label 字段名，默认为 'label'
   * @param options.valueField 自定义 value 字段名，默认为 'value'
   * @param options.filter 过滤函数或过滤条件对象
   */
  getOptions<T extends Record<string, any> = { label: string, value: string }>(
    options?: {
      labelField?: keyof EnumItem
      valueField?: keyof EnumItem
      filter?: ((item: EnumItem) => boolean) | Partial<EnumItem>
    },
  ): T[] {
    const {
      labelField = 'label',
      valueField = 'value',
      filter,
    } = options || {}

    // 先过滤数据
    const result = this.getList(filter)

    // 然后转换格式
    return result.map((item) => {
      return {
        [labelField]: item.label,
        [valueField]: item.value ?? item.key,
      } as unknown as T
    })
  }

  /**
   * 判断源数据中是否存在指定的 key 或 value
   * @param searchValue 搜索值（自动匹配 key 或 value）
   */
  has(searchValue: EnumValue): boolean {
    return this.#items.some(item => item.value === searchValue || item.key === searchValue)
  }

  /**
   * 判断源数据中是否存在指定的多个 label 或 value
   * @param searchValues 搜索值数组（自动匹配 label 或 value）
   * @param value 需要判断的值
   */
  includes(
    searchValues: EnumValue[],
    value: EnumValue | undefined,
  ): boolean {
    const set = new Set()
    searchValues.forEach((item) => {
      set.add(this.getKey(item))
      set.add(this.getValue(item))
    })

    return [...set].includes(value)
  }

  /**
   * 判断源数据中是否存在指定的 label 或 value
   * @param searchValue 搜索值数组（自动匹配 label 或 value）
   * @param value 需要判断的值
   */
  isEqual(
    searchValue: EnumValue,
    value: EnumValue | undefined,
  ): boolean {
    const set = new Set()
    set.add(this.getKey(searchValue))
    set.add(this.getValue(searchValue))

    return [...set].includes(value)
  }
}

export default Enum
