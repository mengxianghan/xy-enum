(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Enum = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
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

  var Enum = /*#__PURE__*/function () {
    function Enum(map, options) {
      var _this = this;

      _classCallCheck(this, Enum);

      this._opts = _objectSpread2({
        fields: {
          key: 'key',
          value: 'value',
          desc: 'desc'
        }
      }, options);
      this._enumMap = map.map(function (item) {
        var _this$_opts$fields, _this$_opts$fields2, _this$_opts$fields3;

        return {
          key: item[(_this$_opts$fields = _this._opts.fields) === null || _this$_opts$fields === void 0 ? void 0 : _this$_opts$fields.key],
          value: item[(_this$_opts$fields2 = _this._opts.fields) === null || _this$_opts$fields2 === void 0 ? void 0 : _this$_opts$fields2.value],
          desc: item[(_this$_opts$fields3 = _this._opts.fields) === null || _this$_opts$fields3 === void 0 ? void 0 : _this$_opts$fields3.desc]
        };
      });
    }
    /**
     * 获取对象
     */


    _createClass(Enum, [{
      key: "get",
      value: function get(key) {
        return this._enumMap.find(function (v) {
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
       * 获取所有
       * 使用场景：checkbox，radio，select
       */

    }, {
      key: "getOptions",
      value: function getOptions() {
        var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          label: 'desc',
          value: 'value'
        };
        var keys = Object.keys(fields);
        return this._enumMap.map(function (item) {
          var record = {};

          var _iterator = _createForOfIteratorHelper(keys),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var key = _step.value;
              record[key] = item[fields[key]];
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
       * 检查
       */

    }, {
      key: "has",
      value: function has(key) {
        return this._enumMap.some(function (v) {
          return v.key === key || v.value === key;
        });
      }
      /**
       * 对比
       */

    }, {
      key: "is",
      value: function is(key, value) {
        return this.getKey(key) === value || this.getValue(key) === value;
      }
    }]);

    return Enum;
  }();

  return Enum;

})));
