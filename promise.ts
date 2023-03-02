import { Promise } from 'es6-promise';

type Initializer<T> = (resolve: Resolve<T>, reject: Reject) => void;

type AnyFunction = (...args: any[]) => void;
type Resolve<T> = (value: T) => void;
type Reject = (reason?: any) => void;
type Status = 'fulfilled' | 'rejected' | 'pending';

// Custom promise
class MyPromise<T> {
	thenCbs: [AnyFunction, Resolve<T>][] = [];
	catchCbs: [AnyFunction, Reject][] = [];
	status: Status = 'pending';
	value: T | null = null;
	error?: any;
	constructor(initializer: Initializer<T>) {
		initializer(this.resolve, this.reject);
	}
	then = (thenCb: (value: T) => void) => {
		return new MyPromise((resolve, _reject) => {
			this.thenCbs.push([thenCb, resolve]);
		});
	};
	catch = (catchCb: (reason?: any) => void) => {
		return new MyPromise((_resolve, reject) => {
			this.catchCbs.push([catchCb, reject]);
		});
	};
	private processNextTasks = () => {
		if (this.status === 'pending') {
			return;
		}
		if (this.status === 'fulfilled') {
			const thenCbs = this.thenCbs;
			this.thenCbs = [];

			thenCbs.forEach(([thenCb, resolve]) => {
				const value = thenCb();
				resolve(value);
			});
			// success
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
		this.status = 'rejected';

		this.processNextTasks();
		// this.catchCbs?.forEach((cb) => cb(reason));
	};
}

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
console.log('before fromise');
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
});
