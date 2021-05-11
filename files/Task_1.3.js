"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _readline = require("readline");

var _fs = require("fs");

var _path = require("path");

var _os = require("os");

var _csvtojson = _interopRequireDefault(require("csvtojson"));

// const csvFilePath = join(__dirname,'../files/info.csv');
var csvFilePath = 'files/info.csv';

var convertIntoJSON = () => {
  return new Promise((resolve, reject) => {
    (0, _csvtojson.default)({
      ignoreEmpty: true,
      downstreamFormat: 'line'
    }).fromFile(csvFilePath).then(jsonObj => {
      (0, _fs.writeFile)((0, _path.join)(__dirname, './JSONfile.json'), JSON.stringify(jsonObj), err => {
        if (err) {
          reject('failed');
        }

        resolve('success');
      });
    });
  });
};

var writeToTextFile = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* () {
    try {
      var response = yield convertIntoJSON();

      if (response === 'success') {
        var fileStream = (0, _fs.createReadStream)((0, _path.join)(__dirname, './JSONfile.json'));
        var readFile = (0, _readline.createInterface)({
          input: fileStream,
          crlfDelay: Infinity
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;

        var _iteratorError;

        try {
          for (var _iterator = (0, _asyncIterator2.default)(readFile), _step, _value; _step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
            var line = _value;
            var readData = JSON.parse(line);

            for (var data of readData) {
              console.log(JSON.stringify(data));
              (0, _fs.appendFile)((0, _path.join)(__dirname, './outputText.txt'), JSON.stringify(data) + _os.EOL, err => {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              yield _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  });

  return function writeToTextFile() {
    return _ref.apply(this, arguments);
  };
}();

writeToTextFile();