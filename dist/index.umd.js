(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Enum = factory());
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
      Object.defineProperty(target, descriptor.key, descriptor);
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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
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

  var _opts = /*#__PURE__*/new WeakMap();

  var _enumMap = /*#__PURE__*/new WeakMap();

  var Enum = /*#__PURE__*/function () {
    function Enum(map, options) {
      var _this = this;

      _classCallCheck(this, Enum);

      _classPrivateFieldInitSpec(this, _opts, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _enumMap, {
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

      _classPrivateFieldSet(this, _enumMap, map.map(function (item) {
        var _classPrivateFieldGet2, _classPrivateFieldGet3, _classPrivateFieldGet4;

        return _objectSpread2(_objectSpread2({}, item), {}, {
          key: item[(_classPrivateFieldGet2 = _classPrivateFieldGet(_this, _opts).fieldNames) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.key],
          value: item[(_classPrivateFieldGet3 = _classPrivateFieldGet(_this, _opts).fieldNames) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.value],
          desc: item[(_classPrivateFieldGet4 = _classPrivateFieldGet(_this, _opts).fieldNames) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.desc]
        });
      }));
    }
    /**
     * 获取对象
     */


    _createClass(Enum, [{
      key: "get",
      value: function get(key) {
        return _classPrivateFieldGet(this, _enumMap).find(function (v) {
          return v.key === key || v.value === key;
        });
      }
      /**
       * 获取 key
       * @param key
       * @param def
       * @return {*}
       */

    }, {
      key: "getKey",
      value: function getKey(key) {
        var _this$get$key, _this$get;

        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return (_this$get$key = (_this$get = this.get(key)) === null || _this$get === void 0 ? void 0 : _this$get.key) !== null && _this$get$key !== void 0 ? _this$get$key : def;
      }
      /**
       * 获取 value
       * @param key
       * @param def
       * @return {*}
       */

    }, {
      key: "getValue",
      value: function getValue(key) {
        var _this$get$value, _this$get2;

        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return (_this$get$value = (_this$get2 = this.get(key)) === null || _this$get2 === void 0 ? void 0 : _this$get2.value) !== null && _this$get$value !== void 0 ? _this$get$value : def;
      }
      /**
       * 获取 desc
       * @param key
       * @param def
       * @return {*}
       */

    }, {
      key: "getDesc",
      value: function getDesc(key) {
        var _this$get$desc, _this$get3;

        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return (_this$get$desc = (_this$get3 = this.get(key)) === null || _this$get3 === void 0 ? void 0 : _this$get3.desc) !== null && _this$get$desc !== void 0 ? _this$get$desc : def;
      }
      /**
       * 获取数据作为选项使用
       * 使用场景：checkbox，radio，select
       */

    }, {
      key: "getOptions",
      value: function getOptions() {
        var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          label: 'desc',
          value: 'value'
        };
        var keys = Object.keys(fieldNames);
        return _classPrivateFieldGet(this, _enumMap).map(function (item) {
          var record = {};

          var _iterator = _createForOfIteratorHelper(keys),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var key = _step.value;
              record[key] = item[fieldNames[key]];
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
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
        return _classPrivateFieldGet(this, _enumMap);
      }
      /**
       * 检查
       */

    }, {
      key: "has",
      value: function has(key) {
        return _classPrivateFieldGet(this, _enumMap).some(function (v) {
          return v.key === key || v.value === key;
        });
      }
      /**
       * 对比
       */

    }, {
      key: "is",
      value: function is(key, value) {
        var _this2 = this;

        var list = [];

        if (Array.isArray(key)) {
          key.forEach(function (item) {
            list.push.apply(list, [_this2.getKey(item), _this2.getValue(item)]);
          });
        } else {
          list.push.apply(list, [this.getKey(key), this.getValue(key)]);
        }

        return list.includes(value);
      }
    }]);

    return Enum;
  }();

  return Enum;

}));
