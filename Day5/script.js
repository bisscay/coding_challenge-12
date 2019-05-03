const fs = require('fs');

const alchemicalReduction = () => {
	fs.readFile('./input.txt', (err, data) => {
		let polymer = data.toString().split('');

		const reduction = (polymer) => {

			// same alphabets with different capitalization cancel out,
			//	all other polymer combinations remain thesame
			//	 moving from left to right check if your current alphabet is equal to the next (make them both capital when comparing)
			//	also make sure that the current and next alphabets have oposing capitalization using RegExp
			const capitalRegExp = /[A-Z]/;
			const smallRegExp = /[a-z]/;
			//console.log('before', polymer);
			for (let i = 0; i < polymer.length; i++) {
				let currentLetter = polymer[i];
				let nextLetter = '';
				if (i === polymer.length - 1) {
					nextLetter = currentLetter;
				}	else{
					nextLetter = polymer[i+1];
				}
				//console.log(currentLetter, nextLetter);
				if (currentLetter.toUpperCase() === nextLetter.toUpperCase() && 
				 	(capitalRegExp.test(currentLetter) && smallRegExp.test(nextLetter) || 
				 		smallRegExp.test(currentLetter) && capitalRegExp.test(nextLetter))) {
				 	polymer.splice(i, 2);

				 //	initially, i tried to knock of all redundancies in a loop before the next, 
				//	but i can't determine the number of loops required to attain the polymer. 
				//	Hence, I started a new loop after every first reaction.
				//	fixed the iterator, but prevented it from going as low as -2 
				 	if (i > 0) {
				 		i -= 2;
				 	} else {
				 		i--;
				 	}
				 } else {
				 	//console.log('test');
				 }
			};
			
			//console.log('after', polymer);
			const reducedPolymer = polymer.join(''); 
			return reducedPolymer.length;
		}
		reduction(polymer);

		//	PART 2
		// the final goal is to have an array of objects with letter and length properties
		//	define a class for the objects
		class letterOutcome {
			constructor(letter, length){
				this.letter = letter;
				this.length = length;
			}
		}

		//	define an array to store the objects
		let outcomeArray = [];

		let letterLabel = ''; //	define a label for the letter to be passed into class
		let polymerImproved = data.toString().split('');
		let upperCaseLetter = 65;	// first upper case letter in unicode
		let lowerCaseLetter = 97; // first lower case letter in unicode
		let polymerInput = null;

		//	remove both cases of each alphabet starting at A till Z, 
		//console.log('before', polymerImproved);
			for (let i = 0; i < 26; i++) {
				polymerImproved.forEach( (letter, index) => {
					if (letter.charCodeAt(0) === upperCaseLetter || letter.charCodeAt(0) === lowerCaseLetter) {
	  					polymerInput = polymerImproved.filter(letter => !(letter.charCodeAt(0) === upperCaseLetter || letter.charCodeAt(0) === lowerCaseLetter));
						letterLabel = letter;
				//console.log('after', polymerInput, '.\n');
					}
				});

				upperCaseLetter++;
				lowerCaseLetter++;
				//	reduce the polymer on each alphabet and store the legth
				let letterLength = reduction(polymerInput);
				const currentOutcome = new letterOutcome (
					letterLabel.toUpperCase(),	// some of the letters might be lower case
					letterLength
					);
				outcomeArray.push(currentOutcome);
				polymerImproved = data.toString().split('');
			}
			// make sure there's only one instance of an alphabet in the array
			
		//  compare the lengths of each polymer instance, print out the least
		let leastPolymer = outcomeArray[0];
			outcomeArray.forEach(letter => {
				//	check if the comparing minute's tot is greater than the
				//	minute recorded as "most asleep" so far
				if (leastPolymer.length > letter.length) {
					leastPolymer = letter;
				}
			});
		console.log(leastPolymer);
	});
};

alchemicalReduction();

// lol, with large input code takes a while to run