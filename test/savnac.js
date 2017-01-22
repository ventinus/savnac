// var assert = require('assert');

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

var expect  = require("chai").expect;
var assert  = require("chai").assert;
var savnac  = require("../utils/savnac");

describe('Savnac', function() {
  describe('capitalizeFirstLetter()', function() {
    var tests = [
      { arg: 'string', expected: 'String' },
      { arg: 'sTr_Ing', expected: 'STr_Ing' },
      { arg: 'string with spaces', expected: 'String with spaces' }
    ];

    tests.forEach(function(test) {
      it('capitalizes the first letter of "' + test.arg + '"', function() {
        var res = savnac.capitalizeFirstLetter(test.arg);
        assert.equal(res, test.expected);
      })
    })
  })
})
