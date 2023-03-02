"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es6_promise_1 = require("es6-promise");
// Custom promise
class MyPromise {
    thenCbs = [];
    catchCbs = [];
    status = 'pending';
    value = null;
    error;
    constructor(initializer) {
        initializer(this.resolve, this.reject);
    }
    then = (thenCb) => {
        return new MyPromise((resolve, _reject) => {
            this.thenCbs.push([thenCb, resolve]);
        });
    };
    catch = (catchCb) => {
        return new MyPromise((_resolve, reject) => {
            this.catchCbs.push([catchCb, reject]);
        });
    };
    processNextTasks = () => {
        if (this.status === 'pending') {
            return;
        }
        if (this.status === 'fulfilled') {
            const thenCbs = this.thenCbs;
            this.thenCbs = [];
            thenCbs.forEach(([thenCb, resolve]) => {
                const value = thenCb(this.value);
                console.log(value);
                // @ts-expect-error
                resolve(value);
            });
            // success
        }
        else {
            //rejected
            const catchCbs = this.catchCbs;
            this.catchCbs = [];
            catchCbs.forEach(([catchCb, reject]) => {
                const error = catchCb(this.error);
                reject(error);
            });
        }
    };
    resolve = (value) => {
        this.status = 'fulfilled';
        this.value = value ?? null;
        this.processNextTasks();
    };
    reject = (reason) => {
        this.status = 'rejected';
        this.error = reason;
        this.processNextTasks();
    };
}
const sleep = (ms) => {
    return new es6_promise_1.Promise((resolve) => {
        setTimeout(() => {
            console.log('111111111');
            resolve();
        }, ms);
    });
};
const customPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('My original promise');
    }, 1000);
});
console.log('custom promise ', customPromise);
// console.log('before fromise');
// const promise2 = customPromise.then((value) => {
// 	console.log('promise 2:', value);
// 	console.log('----------2---------');
// });
// const promise3 = customPromise.then((value) => {
// 	console.log('promise 3:', value);
// 	console.log('----------3---------');
// 	return 'promise 3 is lit';
// });
// const promise4 = promise3.then((val) => {
// 	console.log('test val 4:', val);
// });
