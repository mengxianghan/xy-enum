import { describe, expect, it } from 'vitest'
import { createEnum } from '../src'

const statusEnum = createEnum([
  { label: '启用', value: 1, desc: '账号已启用' },
  { label: '禁用', value: 0, desc: '账号已禁用' },
  { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
  { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' },
  { label: '男', value: 'man', key: 'male', desc: '男性' },
  { label: '女', value: 'women', key: 'female', desc: '女性' },
])

describe('get', () => {
  it('使用存在的 value 获取数据', () => {
    expect(statusEnum.get(1)).toEqual({ label: '启用', value: 1, desc: '账号已启用' })
  })
  it('使用存在的 key 获取数据', () => {
    expect(statusEnum.get('reviewing')).toEqual({ label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' })
  })
  it('使用不存在的值获取数据', () => {
    expect(statusEnum.get(99)).toBe(undefined)
  })
  it('使用不存在的值获取数据并设置默认值', () => {
    expect(statusEnum.get(99, { label: '未知', key: 'unknown', desc: '未知状态' })).toEqual({ label: '未知', key: 'unknown', desc: '未知状态' })
  })
  it('使用 key、value 并存的 key 获取数据', () => {
    expect(statusEnum.get('male')).toEqual({ label: '男', value: 'man', key: 'male', desc: '男性' })
  })
  it('使用 key、value 并存的 value 获取数据', () => {
    expect(statusEnum.get('women')).toEqual({ label: '女', value: 'women', key: 'female', desc: '女性' })
  })
})

describe('getLabel', () => {
  it('使用存在的 value 获取 label', () => {
    expect(statusEnum.getLabel(0)).toBe('禁用')
  })
  it('使用存在的 key 获取 label', () => {
    expect(statusEnum.getLabel('deleted')).toBe('已删除')
  })
  it('使用不存在的值获取 label', () => {
    expect(statusEnum.getLabel(99)).toBe(undefined)
  })
  it('使用不存在的值获取 label 并设置默认值', () => {
    expect(statusEnum.getLabel(99, '未知状态')).toBe('未知状态')
  })
})

describe('getValue', () => {
  it('使用存在的 value 获取 value', () => {
    expect(statusEnum.getValue(1)).toBe(1)
  })
  it('使用存在的 key 获取 value', () => {
    expect(statusEnum.getValue('reviewing')).toBe(undefined)
  })
  it('使用不存在的值获取 value', () => {
    expect(statusEnum.getValue(99)).toBe(undefined)
  })
  it('使用不存在的值获取 value 并设置默认值', () => {
    expect(statusEnum.getValue(99, -1)).toBe(-1)
  })
})

describe('getDesc', () => {
  it('使用 value 获取 desc', () => {
    expect(statusEnum.getDesc(2)).toBe(undefined)
  })
  it('使用 key 获取 desc', () => {
    expect(statusEnum.getDesc('deleted')).toBe('账号已删除')
  })
})

describe('getOptions', () => {
  it('获取 options', () => {
    expect(statusEnum.getOptions()).toEqual([
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
      { label: '审核中', value: 'reviewing' },
      { label: '已删除', value: 'deleted' },
      { label: '男', value: 'man' },
      { label: '女', value: 'women' },
    ])
  })
  it('自定义字段名（text 和 id）', () => {
    expect(statusEnum.getOptions({
      labelField: 'text',
      valueField: 'id',
    })).toEqual([
      { text: '启用', id: 1 },
      { text: '禁用', id: 0 },
      { text: '审核中', id: 'reviewing' },
      { text: '已删除', id: 'deleted' },
      { text: '男', id: 'man' },
      { text: '女', id: 'women' },
    ])
  })
  it('过滤有 color 属性的 options', () => {
    expect(statusEnum.getOptions({
      filter: item => 'color' in item,
    })).toEqual([
      { label: '审核中', value: 'reviewing' },
      { label: '已删除', value: 'deleted' },
    ])
  })
})

describe('getList', () => {
  it('使用函数过滤（只获取有 color 属性的数据）', () => {
    expect(statusEnum.getList(item => 'color' in item)).toEqual([
      { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
      { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' },
    ])
  })
  it('使用对象过滤（只获取 value 为 1 的数据）', () => {
    expect(statusEnum.getList({ value: 1 })).toEqual([
      { label: '启用', value: 1, desc: '账号已启用' },
    ])
  })
})

describe('has', () => {
  it('检查 value 是否存在', () => {
    expect(statusEnum.has(3)).toBeFalsy()
  })
  it('检查 key 是否存在', () => {
    expect(statusEnum.has('deleted')).toBeTruthy()
  })
})

describe('includes', () => {
  it('检查多个 values 和 keys 是否都存在', () => {
    expect(statusEnum.includes([1, 0, 'reviewing', 'man'], 'male')).toBeTruthy()
  })
  it('检查多个 values 是否都存在', () => {
    expect(statusEnum.includes([1, 0, 99], 'reviewing')).toBeFalsy()
  })
})
