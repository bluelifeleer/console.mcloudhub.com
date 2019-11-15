/*
 * @Author: bluelife
 * @Date:   2019-11-09 12:14:06
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-09 12:46:09
 */
module.exports = {
  sale: function(num) {
    num = num || 8;
    return this.getRandomString(num)
  },
  getRandomString: function(num) {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ0123456789=+-*$@#!',
      tmp = ''
    i = 0;
    for (let i = 0; i < num; i++) {
      tmp += str.substr(Math.random() * (str.length - 1), 1)
    }
    return tmp;
  },
  filter: function(obj, filter) {
    if (this.isArray(obj)) { // Array

    } else { // Object

    }
  },
  isArray: function(obj) {
    if (Array.isArray) {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj);
    }
  }
}
