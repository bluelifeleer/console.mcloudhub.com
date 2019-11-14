/*
 * @Author: 'bluelife'
 * @Date:   2019-11-12 15:08:22
 * @Last Modified by:   'bluelife'
 * @Last Modified time: 2019-11-12 15:28:23
 */
export default {
  $cookie: {
    getItem: function(name) {
      var tmp, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "gi");
      tmp = reg.exec(document.cookie);
      return tmp ? tmp[2] : null;
    },
    setItem: function() {}
  },
  $sessionStorage: {
    setItem: function(...arg) {

    },
    getItem: function(name) {

    }
  },
  isArray: function(...arg) {
    if (Array.isArray) {
      return Array.isArray(obj)
    } else {
      return Object.prototype.toString.call(arg) == '[object Array]';
    }
  },
  isObject: function(...arg) {
    return Object.prototype.toString.call(arg) == '[object Object]';
  },
  getQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    return r ? unescape(r[2]) : null;
  }
}
