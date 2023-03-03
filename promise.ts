import { Promise } from 'es6-promise';
import { isPromiseLike, asap } from './utils';
type Initializer<T> = (resolve: Resolve<T>, reject: Reject) => void;

// callbacks types
type thenCb<T> = (value: T) => any;
type catchCb = (reason?: any) => any;

type Resolve<T> = (value: T) => void;
type Reject = (reason?: any) => void;

type Status = 'fulfilled' | 'rejected' | 'pending';

type AllSettledResult<T> =
	| {
			status: 'fulfilled';
			value: T;
	  }
	| {
			status: 'rejected';
			reason: any;
	  };

// Custom promise
class MyPromise<T> {
	thenCbs: [
		thenCb<T> | undefined,
		catchCb | undefined,
		Resolve<T>,
		Reject
	][] = [];
	status: Status = 'pending';
	value: T | null = null;
	error?: any;

	constructor(initializer: Initializer<T>) {
		try {
			initializer(this.resolve, this.reject);
		} catch (error) {
			this.reject(error);
		}
	}

	static all<U>(promises: MyPromise<U>[]) {
		const result: U[] = Array(promises.length);
		let count = 0;

		return new MyPromise<U[]>((resolve, reject) => {
			promises.forEach((p, index) => {
				MyPromise.resolve(p)
					.then((value) => {
						result[index] = value;
						count++;

						if (count === promises.length) {
							resolve(result);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		});
	}
	static allSettled<U>(promises: MyPromise<U>[]) {
		return MyPromise.all<AllSettledResult<U>>(
			promises.map((p) =>
				p
					.then((value) => ({ status: 'fulfilled' as const, value }))
					.catch((reason) => ({
						status: 'rejected' as const,
						reason,
					}))
			)
		);
	}
	static race<U>(promises: MyPromise<U>[]) {
		return new MyPromise((res, rej) => {
			promises.forEach((p) => {
				MyPromise.resolve(p).then(res).catch(rej);
			});
		});
	}
	static resolve<U>(value: U) {
		return new MyPromise<U>((res) => {
			res(value);
		});
	}
	static reject(reason?: any) {
		return new MyPromise((rej) => {
			rej(reason);
		});
	}

	then(thenCb?: (value: T) => void, catchCb?: catchCb) {
		const promise = new MyPromise((resolve, reject) => {
			this.thenCbs.push([thenCb, catchCb, resolve, reject]);
		});
		this.processNextTasks();
		return promise;
	}
	catch(catchCb?: catchCb) {
		const promise = new MyPromise((resolve, reject) => {
			this.thenCbs.push([undefined, catchCb, resolve, reject]);
		});
		this.processNextTasks();
		return promise;
	}
	private processNextTasks() {
		asap(() => {
			if (this.status === 'pending') {
				return;
			}

			const thenCbs = this.thenCbs;
			this.thenCbs = [];

			thenCbs.forEach(([thenCb, catchCb, resolve, reject]) => {
				try {
					if (this.status === 'fulfilled') {
						const value = thenCb ? thenCb(this.value) : this.value;
						resolve(value);
					} else {
						if (catchCb) {
							const value = catchCb(this.error);
							resolve(value);
						} else {
							reject(this.error);
						}
					}
				} catch (error) {
					reject(error);
				}
			});
		});
	}

	private resolve(value: T | PromiseLike<T>) {
		if (isPromiseLike(value)) {
			value.then(this.resolve, this.reject);
		} else {
			this.status = 'fulfilled';
			this.value = value;

			this.processNextTasks();
		}
	}
	private reject(reason?: any) {
		this.status = 'rejected';
		this.error = reason;

		this.processNextTasks();
	}
}

const customPromise: MyPromise<number> = new MyPromise((resolve, _reject) => {
	setTimeout(() => {
		resolve(1000);
		// reject('error');
	}, 1000);
}).then(
	(val) => {
		console.log('val', val);
	},
	(val) => {
		console.log('=======', val);
	}
);
