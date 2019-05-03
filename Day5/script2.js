const fs = require('fs');

const alchemicalReduction = () => {
	fs.readFile('./input.txt', (err, data) => {
		// PART ONE

		// Get array from string
		const inputArray = data.toString().split("");

		// Loop over each letter of the array
		function getReducedString(arr) {
		  const arrCopy = arr.slice();
		  for (let i = 0; i < arrCopy.length; i++) {
		    // check if next letter is the same of the current, but opposite case
		    if (
		      (arrCopy[i] === arrCopy[i].toUpperCase() &&
		        arrCopy[i + 1] === arrCopy[i].toLowerCase()) ||
		      (arrCopy[i] === arrCopy[i].toLowerCase() &&
		        arrCopy[i + 1] === arrCopy[i].toUpperCase())
		    ) {
		      // if so, remove both from the array
		      arrCopy.splice(i, 2);
		      // fix the iterator, but prevent it from going as low as -2;
		      if (i > 0) {
		        i -= 2;
		      } else {
		        i--;
		      }
		    }
		  }
		  return arrCopy.join("").length;
		}
		const resultOne = getReducedString(inputArray);
		console.log(`First answer: ${resultOne}`);
	});
};

alchemicalReduction();