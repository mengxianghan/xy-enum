/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _Enum_items;
class Enum {
    constructor(items) {
        _Enum_items.set(this, void 0);
        // 验证数据完整性
        this.validateItems(items);
        __classPrivateFieldSet(this, _Enum_items, [...items], "f");
    }
    /**
     * 验证输入数据的完整性
     */
    validateItems(items) {
        if (!Array.isArray(items)) {
            throw new TypeError('输入数据必须是数组');
        }
        items.forEach((item, index) => {
            // 必填字段验证
            const requiredFields = ['label'];
            const missingRequiredFields = requiredFields.filter(field => !(field in item));
            if (missingRequiredFields.length > 0) {
                throw new Error(`第 ${index + 1} 项缺少必要字段: ${missingRequiredFields.join(', ')}`);
            }
            // 虽然类型定义已经确保了 key 或 value 至少有一个存在，
            // 但为了在运行时也能捕获错误，保留这个检查
            if (!('key' in item) && !('value' in item)) {
                throw new Error(`第 ${index + 1} 项必须包含 key 或 value 字段中的至少一个`);
            }
        });
    }
    /**
     * 使用 key 或 value 获取一条完整数据
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    get(searchValue, defaultValue) {
        // 先尝试匹配 value
        let item = __classPrivateFieldGet(this, _Enum_items, "f").find(item => item.value === searchValue);
        // 如果没找到，再尝试匹配 key
        if (!item) {
            item = __classPrivateFieldGet(this, _Enum_items, "f").find(item => item.key === searchValue);
        }
        return item !== null && item !== void 0 ? item : defaultValue;
    }
    /**
     * 使用 key 或 value 获取 label 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    getLabel(searchValue, defaultValue) {
        var _a;
        const item = this.get(searchValue);
        return (_a = item === null || item === void 0 ? void 0 : item.label) !== null && _a !== void 0 ? _a : defaultValue;
    }
    /**
     * 使用 key 或 value 获取 value 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    getKey(searchValue, defaultValue) {
        var _a;
        const item = this.get(searchValue);
        // 如果 item 存在但 key 不存在，则返回 defaultValue
        if (item && !('key' in item)) {
            return defaultValue;
        }
        return (_a = item === null || item === void 0 ? void 0 : item.key) !== null && _a !== void 0 ? _a : defaultValue;
    }
    /**
     * 使用 key 或 value 获取 value 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    getValue(searchValue, defaultValue) {
        var _a;
        const item = this.get(searchValue);
        // 如果 item 存在但 value 不存在，则返回 defaultValue
        if (item && !('value' in item)) {
            return defaultValue;
        }
        return (_a = item === null || item === void 0 ? void 0 : item.value) !== null && _a !== void 0 ? _a : defaultValue;
    }
    /**
     * 使用 key 或 value 获取 desc 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     */
    getDesc(searchValue) {
        const item = this.get(searchValue);
        return item === null || item === void 0 ? void 0 : item.desc;
    }
    /**
     * 获取数据列表，支持条件过滤
     * @param filter 过滤函数或过滤条件对象
     */
    getList(filter) {
        let result = [...__classPrivateFieldGet(this, _Enum_items, "f")];
        if (filter) {
            if (typeof filter === 'function') {
                // 如果是函数，直接使用函数过滤
                result = result.filter(filter);
            }
            else {
                // 如果是对象，使用对象的每个属性进行过滤
                result = result.filter((item) => {
                    return Object.entries(filter).every(([key, value]) => {
                        return item[key] === value;
                    });
                });
            }
        }
        return result;
    }
    /**
     * 获取 options 数组，支持自定义返回字段名和条件过滤
     * @param options 配置选项
     * @param options.labelField 自定义 label 字段名，默认为 'label'
     * @param options.valueField 自定义 value 字段名，默认为 'value'
     * @param options.filter 过滤函数或过滤条件对象
     */
    getOptions(options) {
        const { labelField = 'label', valueField = 'value', filter, } = options || {};
        // 先过滤数据
        const result = this.getList(filter);
        // 然后转换格式
        return result.map((item) => {
            var _a;
            return {
                [labelField]: item.label,
                [valueField]: (_a = item.value) !== null && _a !== void 0 ? _a : item.key,
            };
        });
    }
    /**
     * 判断源数据中是否存在指定的 key 或 value
     * @param searchValue 搜索值（自动匹配 key 或 value）
     */
    has(searchValue) {
        return __classPrivateFieldGet(this, _Enum_items, "f").some(item => item.value === searchValue || item.key === searchValue);
    }
    /**
     * 判断源数据中是否存在指定的多个 label 或 value
     * @param searchValues 搜索值数组（自动匹配 label 或 value）
     * @param value 需要判断的值
     */
    includes(searchValues, value) {
        const set = new Set();
        if (Array.isArray(searchValues)) {
            searchValues.forEach((item) => {
                set.add(this.getKey(item));
                set.add(this.getValue(item));
            });
        }
        else {
            set.add(this.getKey(searchValues));
            set.add(this.getValue(searchValues));
        }
        return [...set].includes(value);
    }
}
_Enum_items = new WeakMap();

function createEnum(items) {
    return new Enum(items);
}

export { createEnum };
