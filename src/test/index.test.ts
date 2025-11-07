import { describe, expect, it } from 'vitest'
import { createEnum } from '../index'

const statusEnum = createEnum([
  { label: '启用', value: 1, desc: '账号已启用' },
  { label: '禁用', value: 0, desc: '账号已禁用' },
  { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
  { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' },
  { label: '男', value: 'man', key: 'male', desc: '男性' },
  { label: '女', value: 'women', key: 'female', desc: '女性' },
])

describe('enum', () => {
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
  })
})
