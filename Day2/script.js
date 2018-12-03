//	------------------- PART ONE ---------------------------
const fs = require('fs');

const boxChecksum = () => {
	fs.readFile('./boxID.txt', (err, data) => {
		const boxIDs = data.toString().split('\n');
		//	console.log(boxIDs);
		//let test = ['bababc', 'aabcdd', 'abcdee'];
		let pixie = 0;
		let dust = 0;
		boxIDs.forEach(ID => {
		let count = 0;
		let temp = [];
		let count2 = 0;
		let count3 = 0;

				let x = ID.split('').sort();		//	changed the string to an array of letters
				//console.log(x)
				for (let i = 0; i < x.length; i++) {
					if (temp.includes(x[i])) {			
		 				count++;
							if (i === x.length - 1) {
								if(count === 2) {
									count3++;
								} else if (count === 1) {
									count2++;
								}
							}
				 	} else {
				 		if(count === 2) {
							count3++;
						} else if (count === 1) {
							count2++;
						}
		 				count = 0;
		 			}
		 			temp.push(x[i]);
				
					// console.log('temp: ' + temp + 
					// 	' checking: ' + x[i] +
					// 	' count: ' + count +
					// 	' count2: ' + count2 + 
					// 	'. count3: ' + count3)	
				}
			//	used pixie dust to hold truthy nature of box ID occurance, instead of d actual letter frequency count
			if (count2) {
				pixie++;
			} if (count3) {
				dust++;
			}

		//	console.log(ID + ' count2: ' + countPerLetter2 + '. count3: ' + countPerLetter3 + ' count: ' + countPerLetter);	
		}); console.log(`boxChecksum is: ${pixie * dust}`);


		//	------------------- PART TWO ----------------------------------------------
		const commonBoxLetters = (arr) => {
		//	variable to store common letters
		let commonLetters = '';
		//	loop to access the words
		for (let wordIndexA = 0; wordIndexA < arr.length; wordIndexA++) {
			//	loop to access the remaining words for comparism one at a time
			//	NB: the word index will start on the next position from word A
			for (let wordIndexNext = wordIndexA + 1; wordIndexNext < arr.length; wordIndexNext++) {
				// loop to access the letters of each word
				// NB: word A and each next word will compare on thesame letter index
				//	the loop will be limited by the length of the current word
				for (let letterIndex = 0; letterIndex < arr[wordIndexA].length; letterIndex++) {
					//	perform the comparism on each letter on each words(A and next)
					//	if a match is found, add the letter to the commonletters string, else dont do any thing
					if (arr[wordIndexA][letterIndex] === arr[wordIndexNext][letterIndex]) {
						commonLetters += arr[wordIndexA][letterIndex];
					}
				}
				//	check the length of the word added, 
				//	if it is equal to the original word minus one, we return this word 
				//	else we set our commonLetters to an empty string and continue the loop for the next word
				if (commonLetters.length === arr[wordIndexA].length - 1) {
					return (`Common Letters is: ${commonLetters}`); //return commonLetters;	//	NB: if you dont return, the
				} else {
					commonLetters = '';
				}
			}
		} 
		commonBoxLetters(boxIDs);

		//commonBoxLetters(test);

	};
console.log(commonBoxLetters(boxIDs));
	});
};

boxChecksum();
