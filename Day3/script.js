//	---------------------- PART ONE -------------------------------
//	find overlapping claims

// accept input and convert to string seperated by newline
const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
	const claims = data.toString().split('\r\n');
	
	//	define a test variable
	let test = ['#1 @ 1,3: 4x4', '#23 @ 3,1: 4x4', '#4 @ 5,5: 2x2'];
	//	define how to make sense of input
	const resolveArr = (item) => {
		//	replace symbols and spaces with a space using RegExp
		//	split the string on spaces to craete an array of srings for each claim
		let resolvedArr = item.replace(/#|\s|@|,|:|x/g, ' ').split(/\s+/g);
		// access values in array as numbers, defining input
		let fromLeft = parseInt(resolvedArr[2]);
		let fromTop = parseInt(resolvedArr[3]);
		let claimWidth = parseInt(resolvedArr[4]);
		let claimHeight = parseInt(resolvedArr[5]);
		//	Build a muiltilayer array of at least 1000 falsey items
		//	ALTERNATIVELY; resolve for fabWidth and fabHeight to get the dimension of array boarder
		//	let fabWidth = fromLeft + cutWidth;
		//	let fabHeight = fromTop + cutHeight;
		const fab = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
		//	replace for truthy values in multilayer array starting at fromTop and fromLeft for claimHeight and claimWidth respectively
		for (let topIndex = fromTop; topIndex < fromTop + claimHeight; topIndex++) {
			for(let leftIndex = fromLeft; leftIndex < fromLeft + claimWidth; leftIndex++) {
				fab[topIndex][leftIndex] = 1;	
			}
		}
		return fab;
	}

	//	claimOverlap function
	const claimOverlap = (arr) => {
		//	create a sum array that adds up all claims
		const sum = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
		//	create an array to store resolved cliams
		let resolvedClaim = [];
		//	access the claims from input.txt one at a time
		arr.forEach(claim => {
			// make sense of input
			resolvedClaim = resolveArr(claim);
			//	add vlaues in each claim to the sum array
			for(let i = 0; i < sum.length; i++) {
				for (let j = 0; j < sum.length; j++) {
					sum[i][j] += resolvedClaim[i][j];
				}
			}
		});
		//	count the number of values in the sum array that are 2 or  more
		let count = 0;
		for (let i = 0; i < sum.length; i++) {
			for (let j = 0; j < sum.length; j++) {
				if (sum[i][j] > 1) {
					count++
				}
			}
		}
		console.log('The number of overlapping complains is: ', count);
		//	------------------------ PART TWO ---------------------------
		//	find the ID of the only claim that doesn't overlap
		//	this will be the complement of claims that have an item that is truthy when its corresponding index in the sum array is greater than one
		
		// store current confilict count
		let conflictCount = count;
		//loop to access each value in sum and claim then perform subtraction
		arr.forEach(claim => {
			// make sense of input in claim
			let resolvedClaim = resolveArr(claim);
			//	perform subtraction between the sum and each claim
			//	define variable to store new sum
			let newSum = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
			for (let i = 0; i < newSum.length; i++) {
				for (let j = 0; j < newSum.length; j++) {
					if (sum[i][j] > 1 && resolvedClaim[i][j] === 1) {
						// console.log(claim);
					}
				}
			}
		}); 
		console.log(`Experiencing issues solving part two. 
					Further analysis is required. 
					Any suggestions would be helpful.
					I'm only able to determin every claim that overlaps. 
					Shockingly I can not determin the only isolated claim. 
							`);
	};

	claimOverlap(claims);
});