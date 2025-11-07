import { createEnum } from '../src'

// 使用示例
const statusEnum = createEnum([
  { label: '启用', value: 1, desc: '账号已启用' },
  { label: '禁用', value: 0, desc: '账号已禁用' },
  { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
  { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' },
  { label: '男', value: 'man', key: 'male', desc: '男性' },
  { label: '女', value: 'women', key: 'female', desc: '女性' },
])

console.log('=== 测试 get ===')
console.log('使用存在的 value 获取数据:', statusEnum.get(1)) // ✅
console.log('使用存在的 key 获取数据:', statusEnum.get('reviewing')) // ✅
console.log('使用不存在的值获取数据:', statusEnum.get(99)) // ✅
console.log('使用不存在的值获取数据并设置默认值:', statusEnum.get(99, { label: '未知', key: 'unknown', desc: '未知状态' })) // ✅
console.log('使用 key、value 并存的 key 获取数据:', statusEnum.get('male'))
console.log('使用 key、value 并存的 value 获取数据:', statusEnum.get('women'))

console.log('\n=== 测试 getLabel ===')
console.log('使用存在的 value 获取 label:', statusEnum.getLabel(0)) // ✅
console.log('使用存在的 key 获取 label:', statusEnum.getLabel('deleted')) // ✅
console.log('使用不存在的值获取 label:', statusEnum.getLabel(99)) // ''
console.log('使用不存在的值获取 label 并设置默认值:', statusEnum.getLabel(99, '未知状态')) // ✅

console.log('\n=== 测试 getValue ===')
console.log('使用存在的 value 获取 value:', statusEnum.getValue(1)) // ✅
console.log('使用存在的 key 获取 value:', statusEnum.getValue('reviewing')) // ✅
console.log('使用不存在的值获取 value:', statusEnum.getValue(99)) // ✅
console.log('使用不存在的值获取 value 并设置默认值:', statusEnum.getValue(99, -1)) // ✅

console.log('\n=== 测试 getDesc ===')
console.log('使用 value 获取 desc:', statusEnum.getDesc(2)) // ✅
console.log('使用 key 获取 desc:', statusEnum.getDesc('deleted')) // ✅

console.log('\n=== 测试 has ===')
console.log('检查 value 是否存在:', statusEnum.has(3)) // ✅
console.log('检查 key 是否存在:', statusEnum.has('deleted')) // ✅

console.log('\n=== 测试 isEqual ===')
console.log('检查多个 values 和 keys 是否都存在:', statusEnum.isEqual([1, 0, 'reviewing', 'man'], 'male')) // ✅
console.log('检查多个 values 是否都存在:', statusEnum.isEqual([1, 0, 99], 'reviewing')) // ✅

console.log('\n=== 测试 getOptions ===')
console.log('获取 options:', statusEnum.getOptions()) // ✅
console.log('自定义字段名（text 和 id）:', statusEnum.getOptions({
  labelField: 'text',
  valueField: 'id',
})) // ✅
console.log('过滤有 color 属性的 options:', statusEnum.getOptions({
  filter: item => 'color' in item,
})) // ✅

console.log('\n=== 测试 getList ===')
console.log('使用函数过滤（只获取有 color 属性的数据）:', statusEnum.getList(item => 'color' in item)) // ✅
console.log('使用对象过滤（只获取 value 为 1 的数据）:', statusEnum.getList({ value: 1 })) // ✅
