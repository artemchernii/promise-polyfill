"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var genPromise = function () {
    return new es6_promise_1.Promise(function (resolve, reject) {
        if (Math.random() > 0.5) {
            resolve('success');
        }
        else {
            reject('fail');
        }
    });
};
var promise = genPromise();
promise
    .then(function (value) {
    console.log(value);
})["catch"](function (error) {
    console.log(error);
});
