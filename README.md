# XYEnum 枚举

## 安装

使用 npm：

```shell
npm install xy-enum -S
```

使用 jsDelivr CDN：

```html

<script src="https://cdn.jsdelivr.net/npm/xy-enum/dist/index.min.js"></script>
```

## 示例

### 基础用法

```js
import XYEnum from "xy-enum";

const myEnum = new XYEnum([
  { key: "key1", value: 1, desc: "选项1" },
  { key: "key2", value: 2, desc: "选项2" },
  { key: "key3", value: 3, desc: "选项3" },
  { key: "key4", value: 4, desc: "选项4" }
]);

// 通过 value 获取 key
myEnum.getKey("key1");

// 通过 key 获取 value
myEnum.getValue(1);

// 通过 key 获取 desc
myEnum.getDesc("key1");

// 通过 value 获取 desc
myEnum.getDesc(1);

// 通过 key 获取 record
myEnum.get(1);

// 通过 value 获取 record
myEnum.get("key1");

// 通过 options
myEnum.getOptions();

// 获取列表
myEnum.getList();

// 判断 key 是否存在
myEnum.has("key1");

// 判断 value 是否存在
myEnum.has(1);

// 对比
myEnum.is(1, "key1");

// 对比多个
myEnum.is([1, 2, 3], "key1");
```

### 自定义字段名

```js
import XYEnum from "xy-enum";

const myEnum = new XYEnum(
  [
    { key: "key1", value: 1, desc: "选项1" },
    { key: "key2", value: 2, desc: "选项2" },
    { key: "key3", value: 3, desc: "选项3" },
    { key: "key4", value: 4, desc: "选项4" }
  ]);

const options = myEnum.getOptions({
  id: "value",
  title: "desc"
});

console.log(options)
// 输出
[
  { id: 1, title: "选项1" },
  { id: 2, title: "选项2" },
  { id: 3, title: "选项3" },
  { id: 4, title: "选项4" }
];
```

## API

### 参数

| 名称   | 说明   | 默认值 |
|------|------|-----|
| data | 枚举数据 | `-` |

### 方法

**创建实例**

new XYEnum(data[, options])

**实例方法**

instance.get(content)

instance.getKey(content)

instance.getValue(content)

instance.getDesc(content)

instance.getOptions([config])

instance.getList()

instance.is(content, target)

instance.has(content)
