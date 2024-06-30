
While pushing 100 Prop5 objects at a time, there is **more than** 2x speedup recollecting them every 100ns instead of 100ms.
![[Prop5 100ms to 100ns.png|364]]

While pushing 100 Prop10 objects at a time, there is **almost 3x** speedup recollecting them every 100ns instead of 100ms.
![[Prop10 100ms to 100ns.png|364]]

While collecting them every 100ns, increasing the number of objects processed at a time also gave performance improvements, albeit **less than 2x**:
![[Prop5 100 to 8100 objects.png|399]]
![[Prop10 100 to 6650 objects.png|400]]

Therefore order of priority for performance optimisation seems to follow as so:
- recollecting used objects as often as possible (seems to have no diminishing returns)
- processing alot of objects in one shot (although this does seem to have diminishing returns)
```Typescript TI:"Benchmark code" HL:"105-128,141-149,167-183" "FOLD"
// -- you can change these --- //
const style = 1; // allocate and return = 0, mutate target object = 1
const propCount = 5; // how many props per object, 10 or 5
const count = 100000; // how many times to call collect() before exiting
const collectInterval = .1; // interval in ms to call collect()
// Prop10: 6650; Prop5: 8100
const objectsPushedCount = 8100; // how many objects to push at a time
class Foo2 {
	myItem;
	constructor(a, b) {
		if (a instanceof Foo2) {
			this.myItem = a.myNumber * b % 42069;
		}
		else {
			this.myItem = a * b;
		}
	}
	get myNumber() {
		return this.myItem;
	}
}
function objProp5() {
	return {
		prop1: true,
		prop2: "its a string",
		prop3: 0xBabeCafe,
		prop420: 69,
		prop1337: new Foo2(6, 9),
	};
}
function objProp10() {
	return {
		prop1: true,
		prop2: "its a string",
		prop3: 0xBabeCafe,
		prop420: 69,
		prop1337: new Foo2(6, 9),
		prop69420: ["an", "array"],
		prop694202: [0xC0FFEE],
		prop6942024: { bad: "item here" },
		prop69420249: 8080,
		prop694202496: NaN,
	};
}
class Prop5 {
	prop1;
	prop2;
	prop3;
	prop420;
	prop1337;
	constructor() {
		this.prop1 = true;
		this.prop2 = "its a string";
		this.prop3 = 0xBabeCafe;
		this.prop420 = 69;
		this.prop1337 = new Foo2(6, 9);
	}
	from(prop) {
		this["prop1"] = prop["prop1"];
		this["prop2"] = prop["prop2"];
		this["prop3"] = prop["prop3"];
		this["prop420"] = prop["prop420"];
		this["prop1337"] = prop["prop1337"];
	}
}
class Prop10 {
	prop1;
	prop2;
	prop3;
	prop69;
	prop420;
	prop1337;
	prop69420;
	prop694202;
	prop6942024;
	prop69420249;
	prop694202496;
	constructor() {
		this.prop1 = true;
		this.prop2 = "its a string";
		this.prop3 = 0xBabeCafe;
		this.prop69 = 420;
		this.prop420 = 69;
		this.prop1337 = new Foo2(6, 9);
		this.prop69420 = ["an", "array"];
		this.prop694202 = [0xC0FFEE];
		this.prop6942024 = { bad: "item here" };
		this.prop69420249 = 8080;
		this.prop694202496 = NaN;
	}
	from(prop) {
		this["prop1"] = prop["prop1"];
		this["prop2"] = prop["prop2"];
		this["prop3"] = prop["prop3"];
		this["prop69"] = prop["prop69"];
		this["prop420"] = prop["prop420"];
		this["prop1337"] = prop["prop1337"];
		this["prop69420"] = prop["prop69420"];
		this["prop694202"] = prop["prop694202"];
		this["prop6942024"] = prop["prop6942024"];
		this["prop69420249"] = prop["prop69420249"];
		this["prop694202496"] = prop["prop694202496"];
	}
}
class ObjectStore {
	factory;
	pool;
	len;
	constructor(factory) {
		this.factory = factory;
		this.pool = new Array;
		this.len = 0;
	}
	get() {
		if (this.len > 0) {
			const out = this.pool[this.len - 1];
			this.len--;
			return out;
		}
		console.log(`pool is empty -> allocating new object and returning it`);
		return this.factory();
	}
	releaseBulk(items) {
		for (let j = 0; j < items.length; ++this.len, ++j) {
			this.pool[this.len] = items[j];
		}
	}
}
function createProp5() {
	return new Prop5();
}
function createProp10() {
	return new Prop10();
}
//@ts-ignore
const store = propCount === 10 ?
	//@ts-ignore
	new ObjectStore(style === 0 ? objProp10 : createProp10) :
	//@ts-ignore
	new ObjectStore(style === 0 ? objProp5 : createProp5);
function copyViaSomething(prop) {
	//@ts-ignore
	if (style === 0) {
		return { ...prop };
	}
	const nextProp = store.get();
	nextProp.from(prop);
	return nextProp;
}
const temporaryMemory = [];
function result() {
	const now = Date.now();
	//@ts-ignore
	const log = [(style === 0 ? "allocating and returning" : "mutating target obj") + " - " + (propCount == 5 ? "Prop5" : "Prop10"), "collect() called every " + collectInterval + " ms", "collect() called " + count + " times", objectsPushedCount + " objects pushed at a time", "took " + (now - start) / 1000 + " seconds", totalCount / 1000000 + " million total objects created", totalCount / (now - start) / 1000 + " thousand objects per second", "///////////////////////////////"];
	try {
		console.table(log);
		//@ts-ignore
		process.exit();
	}
	catch (e) {
		//@ts-ignore
		console.log(...log);
		throw 0;
	}
}
;
let collectCount = 0;
function collect() {
	//@ts-ignore
	if (style === 1) {
		store.releaseBulk(temporaryMemory);
	}
	temporaryMemory.length = 0;
	if (collectCount === count) {
		result();
		try {
			//@ts-ignore
			process.exit();
		}
		catch (e) {
			throw 0;
		}
	}
}
let totalCount = 0;
let start = Date.now();
function run() {
	//@ts-ignore
	const props = propCount === 5 ? createProp5() : createProp10();
	let collectTime = start + collectInterval;
	while (true) {
		for (let i = 0; i < objectsPushedCount; ++i) {
			temporaryMemory.push(copyViaSomething(props));
		}
		totalCount += objectsPushedCount;
		if (collectTime < Date.now()) {
			console.log(`collect() ${collectCount+1} -- temporaryMemory.length after ${temporaryMemory.length / objectsPushedCount} iterations = ${temporaryMemory.length}`);
			collectTime += collectInterval;
			collectCount++;
			collect();
		}
	}
}
run();
```

It would make sense to make a library that takes care of memory allocation and which smartly decides when to collect objects, when to allocate new objects and when to reuse existing ones. The main benefit should be that the v8 GC is triggered less.

Maybe it also splits large objects into smaller ones? Although that would possibly create extra allocations on object creation and when accessing objects.

Of course, macros would help massively, hiding optimized GC aware JS behind simple interfaces.