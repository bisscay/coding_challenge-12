const fs = require('fs');

const alchemicalReduction = () => {
	fs.readFile('./input.txt', (err, data) => {

		//	PART 2
		let polymerImproved = data.toString().split('');

		const x = polymerImproved.filter( letter => !(letter.charCodeAt(0) === 67 || letter.charCodeAt(0) === 99));
		console.log(x);
	});
};

alchemicalReduction();