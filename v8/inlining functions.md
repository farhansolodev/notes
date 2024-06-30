```Typescript 
const count = 100;

//------------------------------------------------------------//

function higherOrderFunction1(lambda: () => void) {
	// Before loop
	console.log("before");

	// Loop execution
	for (let i = 0; i < count; i++) {
		lambda(); // Directly invoked -> can be inlined.
	}

	lambda(); // Another direct invocation -> can be inlined.

	// After loop
	console.log("after");
}

function main1() {
	higherOrderFunction1(() => {
		console.log(`doing stuff`);
	});
}

main1();

// Output
console.log("before");
for (let i = 0; i < count; i++) {
	console.log("doing stuff");
}
console.log("doing stuff");
console.log("after");

//------------------------------------------------------------//

function higherOrderFunction2(lambda2: () => void) {
	// Before loop
	console.log("before");

	// Function assigned to a variable -> needs to be allocated
	const lambda_ref = lambda2;

	// Loop execution
	for (let i = 0; i < count; i++) {
		lambda2(); // inlined
	}

	// Reference being invoked -> reference to lambda needed -> cannot inline lambda.
	// If it was never invoked then the assignment could
	// have been optimized away and lambda inlined.
	lambda_ref();

	// After loop
	console.log("after");
}

function main2() {
	higherOrderFunction2(() => {
		console.log(`doing stuff`);
	});
}

main2();

// Output
console.log("before");
const lambda2 = () => {
	console.log(`doing stuff`);
};
for (let i = 0; i < count; i++) {
	lambda2(); // derefs every iteration -> lots of indirection
}
lambda2();
console.log("after");

//------------------------------------------------------------//

function higherOrderFunction3(lambda3: (param: number) => void) {
	// Before loop
	console.log("before");

	let parametrized_func: () => void;

	// Loop execution
	for (let i = 0; i < count; i++) {
		parametrized_func = () => {
			// Variable reinitialized every iteration
			lambda3(i);
		};

		parametrized_func(); // Runs parametrized lambda
	}

	// After loop
	console.log("after");
}

function main3() {
	higherOrderFunction3((param: number) => {
		console.log(`doing stuff ${param}`);
	});
}

main3();

// Output
console.log("before");
let parametrized_func;
const lambda3 = (param) => console.log(`doing stuff ${param}`);
for (let i = 0; i < count; i++) {
	parametrized_func = () => {
		// Allocation every iteration
		lambda3(i); // Probably this? -> derefs every iteration -> lots of indirection
		// console.log(`doing stuff ${i}`) // Probably not this?
	};

	parametrized_func(); // Derefs every iteration again
}
console.log("after");
```