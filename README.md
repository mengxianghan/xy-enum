# xy-enum 枚举

## 安装

### 1.NPM 方式（推荐）

```shell
pnpm add xy-enum
```

### 2.CDN 方式：

```html
<script src="https://cdn.jsdelivr.net/npm/xy-enum/dist/index.global.js"></script>
```

## 使用方法

### 1. 导入函数

```typescript
import { createEnum } from 'xy-enum'
```

### 2. 创建 Enum 实例

```typescript
import { createEnum } from 'xy-enum'

const myEnum = createEnum([
  { label: '启用', value: 1, key: 'enable', desc: '账号已启用' },
  { label: '禁用', value: 0, key: 'disable', desc: '账号已禁用' },
  { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
  { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' }
])
```

### 3. 基本使用方法

所有方法都**自动匹配 key 和 value**，无需指定 key 参数。查找顺序是先匹配 value，如果没找到再匹配 key。

#### getList 方法

获取数据列表，支持条件过滤：

```typescript
// 获取所有数据
console.log(statusEnum.getList())
// [
//     { label: '启用', value: 1, desc: '账号已启用' },
//     { label: '禁用', value: 0, desc: '账号已禁用' },
//     { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
//     { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' }
// ]

// 使用函数过滤（只获取有 color 属性的数据）
console.log(statusEnum.getList(item => 'color' in item))
// [
//     { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' },
//     { label: '已删除', key: 'deleted', desc: '账号已删除', color: 'red' }
// ]

// 使用对象过滤（只获取 value 为 1 的数据）
console.log(statusEnum.getList({ value: 1 }))
// [
//     { label: '启用', value: 1, desc: '账号已启用' }
// ]

// 使用对象过滤（只获取 isPublic 为 true 的数据）
console.log(statusEnum.getList({ isPublic: true })) // []
```

#### get 方法

获取完整的数据对象，支持默认值：

```typescript
// 使用 value 获取数据
console.log(statusEnum.get(1)) // { label: '启用', value: 1, desc: '账号已启用' }

// 使用 key 获取数据（自动识别）
console.log(statusEnum.get('reviewing')) // { label: '审核中', key: 'reviewing', desc: '账号审核中', color: 'yellow' }

// 使用不存在的值获取数据
console.log(statusEnum.get(99)) // undefined

// 使用不存在的值获取数据并设置默认值
console.log(statusEnum.get(99, { label: '未知', key: 'unknown', desc: '未知状态' })) // { label: '未知', key: 'unknown', desc: '未知状态' }
```

#### getLabel 方法

获取 label 值，支持可选的默认值：

```typescript
// 使用 value 获取 label
console.log(statusEnum.getLabel(0)) // '禁用'

// 使用 key 获取 label（自动识别）
console.log(statusEnum.getLabel('deleted')) // '已删除'

// 使用不存在的值获取 label
console.log(statusEnum.getLabel(99)) // undefined

// 使用不存在的值获取 label 并设置默认值
console.log(statusEnum.getLabel(99, '未知状态')) // '未知状态'
```

#### getValue 方法

获取 value 值，支持可选的默认值：

```typescript
// 使用 value 获取 value（自身，自动识别）
console.log(statusEnum.getValue(1)) // 1

// 使用 key 获取 value（自动识别，返回 key）
console.log(statusEnum.getValue('reviewing')) // 'reviewing'

// 使用不存在的值获取 value
console.log(statusEnum.getValue(99)) // undefined

// 使用不存在的值获取 value 并设置默认值
console.log(statusEnum.getValue(99, 'N/A')) // 'N/A'
```

#### getOptions 方法

获取 options 数组，支持自定义返回字段名和条件过滤，适用于下拉选择框等场景：

```typescript
// 默认 options（label 和 value）
console.log(statusEnum.getOptions())
// [
//   { label: '启用', value: 1 },
//   { label: '禁用', value: 0 },
//   { label: '审核中', value: 'reviewing' },
//   { label: '已删除', value: 'deleted' }
// ]

// 自定义字段名（text 和 id）
console.log(statusEnum.getOptions({
  labelField: 'text',
  valueField: 'id'
}))
// [
//   { text: '启用', id: 1 },
//   { text: '禁用', id: 0 },
//   { text: '审核中', id: 'reviewing' },
//   { text: '已删除', id: 'deleted' }
// ]

// 条件过滤（只获取有 color 属性的数据）
console.log(statusEnum.getOptions({
  filter: item => 'color' in item
}))
// [
//   { text: '审核中', id: 'reviewing' },
//   { text: '已删除', id: 'deleted' }
// ]

// 条件过滤（只获取 isPublic 为 true 的数据）
console.log(statusEnum.getOptions({
  filter: { isPublic: true }
})) // []

// 综合使用（自定义字段名 + 条件过滤）
console.log(statusEnum.getOptions({
  labelField: 'text',
  valueField: 'id',
  filter: item => 'color' in item
}))
// [
//   { text: '审核中', id: 'reviewing' },
//   { text: '已删除', id: 'deleted' }
// ]

// TypeScript 类型推断
const customOptions = statusEnum.getOptions<{ text: string, id: string | number }>({
  labelField: 'text',
  valueField: 'id'
})
```

#### 其他方法

```typescript
// 获取 desc 值（自动匹配）
console.log(statusEnum.getDesc(1)) // '账号已启用'
console.log(statusEnum.getDesc('deleted')) // '账号已删除'

// 判断是否存在（自动匹配）
console.log(statusEnum.has(1)) // true
console.log(statusEnum.has('deleted')) // true

// 批量检查是否都存在（自动匹配，支持混合 value 和 key）
console.log(statusEnum.includes([1, 0, 'reviewing'], 'enable')) // true
console.log(statusEnum.includes([1, 0, 99]), 'reviewing') // false

// 批量检查是否存在（自动匹配，支持混合 value 和 key）
console.log(statusEnum.isEqual(1, 'enable')) // true
console.log(statusEnum.isEqual(1, 'reviewing')) // false
```

## API 文档

### 创建函数

#### createEnum

```typescript
declare function createEnum(
  items: EnumItem[]
): Enum
```

- `items`: 初始化数据数组，每个元素必须包含 `label` 字段，并且必须包含 `key` 或 `value` 字段中的至少一个。`desc` 字段为选填。
- 返回值: 创建的 Enum 实例

**示例：**

```typescript
const statusEnum = createEnum([
  { label: '启用', value: 1, desc: '账号已启用' },
  { label: '禁用', value: 0, desc: '账号已禁用' },
])
```

### 方法

#### getList

```
getList(
  filter?: ((item: EnumItem) => boolean) | Partial<EnumItem>
): EnumItem[]
```

- `filter`: 可选，过滤函数或过滤条件对象
  - 如果是函数，直接使用函数过滤
  - 如果是对象，使用对象的每个属性进行过滤
- 返回值: 过滤后的数据列表

#### get

```
get(
  searchValue: EnumValue,
  defaultValue?: EnumItem
): EnumItem | undefined
```

- `searchValue`: 搜索值（自动匹配 key 或 value）
- `defaultValue`: 找不到时返回的默认值

#### getLabel

```
getLabel(
  searchValue: EnumValue,
  defaultValue?: EnumValue
): EnumValue | undefined
```

- `searchValue`: 搜索值（自动匹配 key 或 value）
- `defaultValue`: 找不到时返回的默认值（可选）
- 返回值: label 值，如果找不到且没有设置默认值则返回 undefined

#### getValue

```
getValue(
  searchValue: EnumValue,
  defaultValue?: EnumValue
): EnumValue | undefined
```

- `searchValue`: 搜索值（自动匹配 key 或 value）
- `defaultValue`: 找不到时返回的默认值（可选）
- 返回值: value 值，如果找不到且没有设置默认值则返回 undefined

#### getDesc

```
getDesc(searchValue: EnumValue): EnumValue | undefined
```

- `searchValue`: 搜索值（自动匹配 key 或 value）

#### has

```
has(searchValue: EnumValue): boolean
```

- `searchValue`: 搜索值（自动匹配 key 或 value）

#### includes

```
includes(
  searchValues: EnumValue[],
  value: EnumValue
): boolean
```

- `searchValues`: 搜索值数组（自动匹配 key 或 value）
- `value`: 值

#### isEqual

```
isEqual(
  searchValue: EnumValue,
  value: EnumValue
): boolean
```

- `searchValue`: 搜索值数组（自动匹配 key 或 value）
- `value`: 值

#### getOptions

```
getOptions<T extends Record<string, any> = { label: string, value: string }>(
  options?: {
    labelField?: keyof EnumItem
    valueField?: keyof EnumItem
    filter?: ((item: EnumItem) => boolean) | Partial<EnumItem>
  }
): T[]
```

- `options`: 可选，配置选项
  - `labelField`: 自定义 label 字段名，默认为 'label'
  - `valueField`: 自定义 value 字段名，默认为 'value'
  - `filter`: 过滤函数或过滤条件对象
- 返回值: options 数组，结构可以通过泛型参数 T 指定

当指定的 valueField 不存在或没有值时，会依次尝试使用 value 字段和 key 字段。

## 数据结构

### EnumItem 类型

```typescript
type EnumItem
  = | { label: string, key: EnumValue, value?: EnumValue, desc?: EnumValue, [key: string]: any }
    | { label: string, key?: EnumValue, value: EnumValue, desc?: EnumValue, [key: string]: any }
```

- `label`: 必填，显示文本
- `key`: 可选，键值（与 value 二选一）
- `value`: 可选，数值（与 key 二选一）
- `desc`: 可选，描述
- `[key: string]: any`: 可选，支持其他自定义属性

**重要提示**：key 和 value 必须至少提供其中一个，TypeScript 编译器会在编译时进行强制校验。

## 类型定义

```typescript
import type {
  Enum,
  EnumItem,
  EnumValue
} from 'xy-enum'
```
