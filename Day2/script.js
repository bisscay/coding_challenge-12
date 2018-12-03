//	PART ONE
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
	});
};

boxChecksum();