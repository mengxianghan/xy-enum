## 安装

### CDN

```html

<script src="https://cdn.jsdelivr.net/npm/xy-enum@{version}/dist/index.umd.min.js"></script>
```

### NPM

```shell
npm install xy-enum -S
```

## 使用

```javascript
import Enum from 'xy-enum'

const options = {
    fieldNames: {
        key: 'key',
        value: 'value',
        desc: 'desc'
    }
}

const myEnum = new Enum([
    {key: 'key1', value: 1, desc: 'this is key1'},
    {key: 'key2', value: 2, desc: 'this is key2'},
    {key: 'key3', value: 3, desc: 'this is key3'}
], options)

myEnum.get('key1')
// or
myEnum.get(1)
// 输出 {key: 'key1', value: '1', desc: 'this is key1'}

myEnum.getKey('key1'[, 'def'])
// or
myEnum.getKey(1[, 'def'])
// 输出 key1

myEnum.getValue('key1'[, 'def'])
// or
myEnum.getValue(1[, 'def'])
// 输出 1

myEnum.getDesc('key1'[, 'def'])
// or
myEnum.getDesc(1[, 'def'])
// 输出 this is key1

myEnum.getOptions()
// 输出 [{label: 'this is key1', value: 1}, {label: 'this is key2', value: 2}, ...]

// 自定义字段名
myEnum.getOptions({name: 'desc', id: 'value'})
// 输出 [{name: 'this is key1', id: 1}, {name: 'this is key2', id: 2}, ...]

// 全部列表
myEnum.getList()
// 输出 [{key: 'key1', value: 1, desc: 'this is key1'},{key: 'key2', value: 2, desc: 'this is key2'},{key: 'key3', value: 3, desc: 'this is key3'}]

myEnum.has('key1')
// or
myEnum.has(1)
// 输出 true

myEnum.is('key1', 1)
// or
myEnum.is('key1', 'key1')
// or
myEnum.is(1, 'key1')
// or
myEnum.is(1, 1)
// or
myEnum.is(['key1', 'key2'], 1)
// 输出 true

```

## API
| 名称 | 必填 | 说明 |
|:----|:----|:----|
| fieldNames | 否 | 替换 Enum 中 key,value,desc 字段为 Enum 对应的字段，默认：{key: 'key', value: 'value', desc: 'desc'} |
