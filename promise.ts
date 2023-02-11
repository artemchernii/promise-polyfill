import { Promise } from 'es6-promise';

type Initializer<T> = (resolve: Resolve<T>, reject: Reject) => void;

type AnyFunction = (...args: any[]) => void;
type Resolve<T> = (value: T) => void;
type Reject = (reason?: any) => void;
type Status = 'fulfilled' | 'resolved' | 'pending';

// Custom promise
class MyPromise<T> {
	thenCbs: [AnyFunction, Resolve<T>][] = [];
	catchCbs: [AnyFunction, Reject][] = [];
	status: Status = 'pending';
	constructor(initializer: Initializer<T>) {
		initializer(this.resolve, this.reject);
	}
	then = (thenCb: (value: T) => void) => {
		return new MyPromise((resolve, reject) => {
			this.thenCbs.push([thenCb, resolve]);
		});
	};
	catch = (catchCb: (reason?: any) => void) => {
		return new MyPromise((resolve, reject) => {
			this.catchCbs.push([catchCb, reject]);
		});
	};
	private processNextTasks = () => {
		if (this.status === 'pending') {
			return;
		}
		if (this.status === 'fulfilled') {
		} else {
			//rejected
		}
	};

	private resolve = (value?: T) => {
		this.status = 'fulfilled';

		this.processNextTasks();
		// this.thenCbs?.forEach((cb) => cb(value));
	};
	private reject = (reason?: any) => {
		// this.catchCbs?.forEach((cb) => cb(reason));
	};
}

// Simple promise generator
const genPromise = (): Promise<number> => {
	return new Promise((resolve, _reject) => {
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

const sleep = (ms: number) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			console.log('111111111');
			resolve();
		}, ms);
	});
};

const customPromise: MyPromise<string> = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('My original promise');
	}, 1000);
});

const promise2 = customPromise.then((value) => {
	console.log('promise 2:', value);
	console.log('----------2---------');
});

const promise3 = customPromise.then((value) => {
	console.log('promise 3:', value);
	console.log('----------3---------');
});
const promise4 = customPromise.then((val) => {
	console.log('test val 4:', val);
})

interface Salary {
	amount: number;
	currency: string;
}
const bigObj: {salary: Salary} = {
	salary: {
		amount: 3000,
		currency: "euro"
	}
}

function returnSomething(el: number = 1) {
	let something = el;

	return function (num: number = 10) {
		const result = num + something;
		console.log(result)
		return `Here is what we got: ${result}`
	}
}

const funcThatReturnSomething = returnSomething(100);

console.log(funcThatReturnSomething(50));
console.log(funcThatReturnSomething(100));
console.log(funcThatReturnSomething(300));

console.log(bigObj);


