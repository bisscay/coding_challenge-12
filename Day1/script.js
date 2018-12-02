// //	PART ONE	(adjusting frequency drift)
 const fs = require('fs');

const freqAdjust = () => {
	//	accept freqInput	-->	convert it to a String -->	split the string at an new line and \r 
	fs.readFile('./freqInput.txt', (err, data) => {
		const changes = data.toString().split('\r\n');
		const frequencyArray = changes.map(splitV => Number(splitV));	//	--> convert this split string to an array of numbers

		const resultingFreq = frequencyArray.reduce((acc, currentV) => acc + currentV);

		console.log('PART 1: ', resultingFreq);
	})
};



//	PART TWO	(frequency calibration)
const freqCalibrate = () => {
	//	finding the first frequency that occurs twice
	fs.readFile('./freqInput.txt', (err, data) => {
	const changes = data.toString().split('\r\n');
	const frequencyArray = changes.map(splitV => Number(splitV));
	 
	let reloop = true;
	let currentLevel = 0;
	let freqLevels = [];
	let repeatLevels = [];	
	while (reloop) {
		frequencyArray.forEach(freq => {
			currentLevel += freq;
			if (freqLevels.includes(currentLevel)) {
				repeatLevels.push(currentLevel);
				reloop = false;
			}
			freqLevels.push(currentLevel);
		});
	}

		console.log('PART 2: ', repeatLevels[0]);
	})

}

freqAdjust();

freqCalibrate();