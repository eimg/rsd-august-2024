function a() {
	return "Function A";
}

function b(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (x) resolve("Function B");
			else reject("Something wrong");
		}, 2000);
	});
}

function c() {
	return "Function C";
}

// console.log( a() );

// b(false)
//     .then(output => {
//         console.log(output);
//         console.log(c());
//     })
//     .catch(err => {
//         console.log(err);
//     });

async function app() {
	console.log(a());
	try {
		console.log(await b(false));
        console.log(c());
	} catch (e) {
		console.log(e);
	}
}

app();
