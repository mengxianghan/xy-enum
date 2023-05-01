(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.XYEnum = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }

  /**
   * 是否为空
   * @param {*} val 
   * @returns 
   */
  var isEmpty = function isEmpty(val) {
    return val === null || val === undefined || val === '';
  };

  var _opts = /*#__PURE__*/new WeakMap();
  var _list = /*#__PURE__*/new WeakMap();
  var Enum = /*#__PURE__*/function () {
    function Enum(data, options) {
      _classCallCheck(this, Enum);
      _classPrivateFieldInitSpec(this, _opts, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _list, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldSet(this, _opts, _objectSpread2({
        fieldNames: {
          key: 'key',
          value: 'value',
          desc: 'desc'
        }
      }, options));
      _classPrivateFieldSet(this, _list, data);
    }

    /**
     * 获取对象
     * @param {string|number} val
     */
    _createClass(Enum, [{
      key: "get",
      value: function get(val) {
        var _this = this;
        return _classPrivateFieldGet(this, _list).find(function (item) {
          return item[_classPrivateFieldGet(_this, _opts).fieldNames.key] === val || item[_classPrivateFieldGet(_this, _opts).fieldNames.value] === val;
        });
      }

      /**
       * 获取 key
       * @param {string|number} val
       * @param {*} def 默认值，获取不到任何内容时返回
       * @return {*}
       */
    }, {
      key: "getKey",
      value: function getKey(val) {
        var _this$get, _classPrivateFieldGet2;
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var content = (_this$get = this.get(val)) === null || _this$get === void 0 ? void 0 : _this$get[(_classPrivateFieldGet2 = _classPrivateFieldGet(this, _opts).fieldNames) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.key];
        return !isEmpty(content) ? content : def;
      }

      /**
       * 获取 value
       * @param {string|number} val
       * @param {*} def 默认值，获取不到任何内容时返回
       * @return {*}
       */
    }, {
      key: "getValue",
      value: function getValue(val) {
        var _this$get2, _classPrivateFieldGet3;
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var content = (_this$get2 = this.get(val)) === null || _this$get2 === void 0 ? void 0 : _this$get2[(_classPrivateFieldGet3 = _classPrivateFieldGet(this, _opts).fieldNames) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.value];
        return !isEmpty(content) ? content : def;
      }

      /**
       * 获取 desc
       * @param {string|number} val
       * @param {*} def 默认值，获取不到任何内容时返回
       * @return {*}
       */
    }, {
      key: "getDesc",
      value: function getDesc(val) {
        var _this$get3, _classPrivateFieldGet4;
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var content = (_this$get3 = this.get(val)) === null || _this$get3 === void 0 ? void 0 : _this$get3[(_classPrivateFieldGet4 = _classPrivateFieldGet(this, _opts).fieldNames) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.desc];
        return !isEmpty(content) ? content : def;
      }

      /**
       * 获取选项列表
       * 获取到的内容适用于 checkbox，radio，select 组件
       * @param {object} fieldNames 自定义节点 label、value 的字段
       * @param {string} fieldNames.label
       * @param {string} fieldNames.value
       */
    }, {
      key: "getOptions",
      value: function getOptions() {
        var _classPrivateFieldGet5, _classPrivateFieldGet6;
        var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          label: (_classPrivateFieldGet5 = _classPrivateFieldGet(this, _opts).fieldNames) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.desc,
          value: (_classPrivateFieldGet6 = _classPrivateFieldGet(this, _opts).fieldNames) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.value
        };
        var keys = Object.keys(fieldNames);
        return _classPrivateFieldGet(this, _list).map(function (item) {
          var record = {};
          for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
            var key = _keys[_i];
            record[key] = item[fieldNames[key]];
          }
          return record;
        });
      }

      /**
       * 获取列表
       */
    }, {
      key: "getList",
      value: function getList() {
        return _classPrivateFieldGet(this, _list);
      }

      /**
       * 检查是否存在
       * @params {string|number} val
       */
    }, {
      key: "has",
      value: function has(val) {
        var _this2 = this;
        return _classPrivateFieldGet(this, _list).some(function (item) {
          var _classPrivateFieldGet7, _classPrivateFieldGet8, _classPrivateFieldGet9;
          return item[(_classPrivateFieldGet7 = _classPrivateFieldGet(_this2, _opts).fieldNames) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7[(_classPrivateFieldGet8 = _classPrivateFieldGet(_this2, _opts).fieldNames) === null || _classPrivateFieldGet8 === void 0 ? void 0 : _classPrivateFieldGet8.key]] === val || item[(_classPrivateFieldGet9 = _classPrivateFieldGet(_this2, _opts).fieldNames) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.value] === val;
        });
      }

      /**
       * 是否相等
       * @param {string|number} val
       * @param {string|number} value
       */
    }, {
      key: "is",
      value: function is(val, value) {
        var _this3 = this;
        var list = [];
        if (Array.isArray(val)) {
          val.forEach(function (item) {
            list.push.apply(list, [_this3.getKey(item), _this3.getValue(item)]);
          });
        } else {
          list.push.apply(list, [this.getKey(val), this.getValue(val)]);
        }
        return list.includes(value);
      }
    }]);
    return Enum;
  }();

  return Enum;

}));
