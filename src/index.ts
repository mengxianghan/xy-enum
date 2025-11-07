import type { EnumItem } from './types'
import Enum from './enum'

export * from './types'

export function createEnum(items: EnumItem[]): Enum {
  return new Enum(items)
}
