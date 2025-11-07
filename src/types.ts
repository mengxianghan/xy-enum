interface EnumItemWithKey { label: string | number, key: EnumValue, value?: EnumValue, desc?: EnumValue, [key: string]: any }
interface EnumItemWithValue { label: string | number, key?: EnumValue, value: EnumValue, desc?: EnumValue, [key: string]: any }

export type EnumItem = EnumItemWithKey | EnumItemWithValue

export type EnumValue = string | number
