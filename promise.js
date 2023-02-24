"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
// Custom promise
var MyPromise = /** @class */ (function () {
    function MyPromise(initializer) {
        var _this = this;
        this.thenCbs = [];
        this.catchCbs = [];
        this.status = 'pending';
        this.then = function (thenCb) {
            return new MyPromise(function (resolve, reject) {
                _this.thenCbs.push([thenCb, resolve]);
            });
        };
        this["catch"] = function (catchCb) {
            return new MyPromise(function (resolve, reject) {
                _this.catchCbs.push([catchCb, reject]);
            });
        };
        this.processNextTasks = function () {
            if (_this.status === 'pending') {
                return;
            }
            if (_this.status === 'fulfilled') {
            }
            else {
                //rejected
            }
        };
        this.resolve = function (value) {
            _this.status = 'fulfilled';
            _this.processNextTasks();
            // this.thenCbs?.forEach((cb) => cb(value));
        };
        this.reject = function (reason) {
            _this.status = 'rejected';
            _this.processNextTasks();
            // this.catchCbs?.forEach((cb) => cb(reason));
        };
        initializer(this.resolve, this.reject);
    }
    return MyPromise;
}());
// Simple promise generator
var genPromise = function () {
    return new es6_promise_1.Promise(function (resolve, _reject) {
        resolve(5);
    });
};
// const promise: Promise<number> = genPromise();
// promise
// 	.then((value) => {
// 		console.log(value);
// 		return sleep(5000);
// 	})
// 	.then(() => console.log('22222222222'))
// 	.catch((error) => {
// 		console.log(error);
// 	});
var sleep = function (ms) {
    return new es6_promise_1.Promise(function (resolve) {
        setTimeout(function () {
            console.log('111111111');
            resolve();
        }, ms);
    });
};
var customPromise = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve('My original promise');
    }, 1000);
});
var promise2 = customPromise.then(function (value) {
    console.log('promise 2:', value);
    console.log('----------2---------');
});
var promise3 = customPromise.then(function (value) {
    console.log('promise 3:', value);
    console.log('----------3---------');
});
var promise4 = customPromise.then(function (val) {
    console.log('test val 4:', val);
});
console.log('EXAM STUFF');
// async function name() {
// 	return 50;
// }
// console.log(performance.now());
// async function hello() {
// 	return await name();
// }
// console.log(hello());
// console.log(performance.now());
var cnt = 1;
console.log(cnt);
var id = setInterval(function () {
    cnt++;
    console.log('inside intercal:', cnt);
    if (cnt > 5) {
        clearInterval(id);
    }
    console.log('end of int: ', cnt);
}, 0);
console.log('after func', cnt);
while (cnt < 5) {
    cnt++;
}
console.log('after while');
console.log('1');
function givemetwo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('super 2');
            return [2 /*return*/, 2];
        });
    });
}
givemetwo().then(function (res) { return console.log(res); });
console.log(3);
console.log('SHOW EVENT LOOP');
function showEventLoop(num) {
    if (num === void 0) { num = 5; }
    num++;
    console.log('num1', num);
    setTimeout(function () {
        console.log('num2', num);
        console.log((num *= 10));
    }, 1000);
    num++;
}
showEventLoop();
// reject multiple promises
function giveMeFive(res) {
    return "Here is your res ".concat(res);
}
function giveMeTen(res) {
    return "Here is your res ".concat(res);
}
es6_promise_1.Promise.reject('fail').then(giveMeFive, giveMeTen);
