//	resulting frequency
const fs = require('fs');

const freqAdjust = () => {
	//	accept freqInput	-->	convert it to a String -->	split the string at an new line and \r 
	fs.readFile('./freqInput.txt', (err, data) => {
		const changes = data.toString().split('\r\n');
		const frequencyArray = changes.map(splitV => Number(splitV));	//	--> convert this split string to an array of numbers

		const resultingFreq = frequencyArray.reduce((acc, currentV) => acc + currentV);

		console.log(resultingFreq);
	})
};

freqAdjust();