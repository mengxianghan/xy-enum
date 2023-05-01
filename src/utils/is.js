export const is = (val, type) => Object.prototype.toString.call(val).slice(8, -1) === type

/**
 * 是否为空
 * @param {*} val 
 * @returns 
 */
export const isEmpty = (val) => val === null || val === undefined || val === ''
