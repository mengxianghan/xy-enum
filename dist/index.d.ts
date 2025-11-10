interface EnumItemWithKey {
    label: string | number;
    key: EnumValue;
    value?: EnumValue;
    desc?: EnumValue;
    [key: string]: any;
}
interface EnumItemWithValue {
    label: string | number;
    key?: EnumValue;
    value: EnumValue;
    desc?: EnumValue;
    [key: string]: any;
}
type EnumItem = EnumItemWithKey | EnumItemWithValue;
type EnumValue = string | number;

declare class Enum {
    #private;
    constructor(items: EnumItem[]);
    /**
     * 验证输入数据的完整性
     */
    private validateItems;
    /**
     * 使用 key 或 value 获取一条完整数据
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    get(searchValue: EnumValue, defaultValue?: EnumItem): EnumItem | undefined;
    /**
     * 使用 key 或 value 获取 label 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    getLabel(searchValue: EnumValue, defaultValue?: EnumValue): EnumValue | undefined;
    /**
     * 使用 key 或 value 获取 value 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    getKey(searchValue: EnumValue, defaultValue?: EnumValue): EnumValue | undefined;
    /**
     * 使用 key 或 value 获取 value 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     * @param defaultValue 当找不到时返回的默认值
     */
    getValue(searchValue: EnumValue, defaultValue?: EnumValue): EnumValue | undefined;
    /**
     * 使用 key 或 value 获取 desc 值
     * @param searchValue 搜索值（自动匹配 key 或 value）
     */
    getDesc(searchValue: EnumValue): EnumValue | undefined;
    /**
     * 获取数据列表，支持条件过滤
     * @param filter 过滤函数或过滤条件对象
     */
    getList(filter?: ((item: EnumItem) => boolean) | Partial<EnumItem>): EnumItem[];
    /**
     * 获取 options 数组，支持自定义返回字段名和条件过滤
     * @param options 配置选项
     * @param options.labelField 自定义 label 字段名，默认为 'label'
     * @param options.valueField 自定义 value 字段名，默认为 'value'
     * @param options.filter 过滤函数或过滤条件对象
     */
    getOptions<T extends Record<string, any> = {
        label: string;
        value: string;
    }>(options?: {
        labelField?: keyof EnumItem;
        valueField?: keyof EnumItem;
        filter?: ((item: EnumItem) => boolean) | Partial<EnumItem>;
    }): T[];
    /**
     * 判断源数据中是否存在指定的 key 或 value
     * @param searchValue 搜索值（自动匹配 key 或 value）
     */
    has(searchValue: EnumValue): boolean;
    /**
     * 判断源数据中是否存在指定的多个 label 或 value
     * @param searchValues 搜索值数组（自动匹配 label 或 value）
     * @param value 需要判断的值
     */
    includes(searchValues: EnumValue | EnumValue[], value: EnumValue | undefined): boolean;
}

declare function createEnum(items: EnumItem[]): Enum;

export { createEnum };
export type { EnumItem, EnumValue };
