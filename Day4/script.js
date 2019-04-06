const fs = require('fs');

const mostAsleepGuard = () => {
	fs.readFile('./input.txt', (err, data) => {
		const sleepRoster = data.toString().split('\r\n').sort();
		// create a guard object with each property labelled, we do this to give meaning to input, defining names for input for manipulation
		// store these objects in a time stamp array
		let timeStampArray = [];
		// create a class with these properties for easy object creation
		class TimeStamp {
			constructor(guard, time, isAsleep) {
				this.guard = guard;
				this.hour = time;
				this.isAsleep = isAsleep;
			}

		}
		// define regular expressions to identify IDs, dates and sleep actions
		const guardRegExp = /#\d+/;
		const dateRegExp = /1518-\d{2}-\d{2}\s\d{2}:\d{2}/;
		const sleepFlag = /falls asleep/;
		let currentGuard = null; 
		sleepRoster.forEach(note => {
			//	get the IDs
			if(guardRegExp.test(note)) {
				currentGuard = note.match(guardRegExp)[0];
			}
			//	get the dates 
			const currentDate = new Date(note.match(dateRegExp)[0]);
			// define each object as time stamps
			const timeStamp = new TimeStamp (
				currentGuard,
				currentDate,
				sleepFlag.test(note) ? true : false
				);
			// store each stamp in an array
			timeStampArray.push(timeStamp);
		})		//	calculate the total sleep time for each guard ID
		//	create an array that stores each guard and the sum of sleep time
		let guardSleepTime = [];
		for (let i = 0; i < timeStampArray.length; i++) {
			const guardID = timeStampArray[i].guard;
			//	check if guard already exist in array
			if (!guardSleepTime.some(guard => guard.id === guardID)) {
				const guard = timeStampArray[i].guard;
				guardSleepTime.push({ id: guard, sumSleepMinutes: 0, sleepMinutes: [] });
			}
			if (timeStampArray[i].isAsleep) {
				const startTime = timeStampArray[i].hour;	//	current sleep timeStamp
				const endTime = timeStampArray[i+1].hour;	//	end of current sleep timeStamp 
				
				const diff = (endTime.getTime() - startTime.getTime()) / 1000 / 60 ; 
				/*	NOTE: diff can be calculated without getTime fnc, 
									but the properties of date are assumed to be private (_hour); 
									hence, to access these properties a get func is defined. 
									The return value of date is in milisec hence the division by 1000, 
									the question requires results to be in minutes hence division by 60
									One could simply call a getMinutes() function on the time stamps and avoid the division by 1000 and 60
				*/
				//	sleepID is the index for guards asleep
				const sleepID = guardSleepTime.findIndex(guard => guard.id === guardID);
				guardSleepTime[sleepID].sumSleepMinutes += diff;
				//	create an array of start-end time for each time the guard fell asleep
				guardSleepTime[sleepID].sleepMinutes.push([
						startTime.getMinutes(),
						endTime.getMinutes()
					]);
			}
		}
		//	find out the guard who slept the most 
		let sleepiestGuard = ""; //	at the end, this will be an object
		guardSleepTime.forEach(guard => {
			if (
				sleepiestGuard === "" ||
				sleepiestGuard.sumSleepMinutes < guard.sumSleepMinutes
				) {
				sleepiestGuard = guard;
			}
		});
		console.log(`The sleepiest guard is ${sleepiestGuard.id}`);
		/*	Returns an object containing 1) the guard's ID,
				2) an arrray containing objects with the number of times (days)
				a guard has slept through each minute (from 0 to 59)
				(ex --> {minute: 1, tot: 10})
		*/
		const getMinutesLog = (guard) => {
			let guardLog = { id: guard.id };
			let minuteArray = [];
			guard.sleepMinutes.forEach(periodAsleep => {
				for (let i = periodAsleep[0]; i < periodAsleep[1]; i++) { //	what's the use of a loop that runs explicitly once?!
					if (!minuteArray.some(value => value.minute === i)) {
						minuteArray.push({minute: i, tot: 1});
					} else {
						const index = minuteArray.findIndex(value => value.minute === i);
						minuteArray[index].tot++;
					}
				}
			});
			guardLog.minuteArray = minuteArray;
			return guardLog;
		};

		const sleepiestGuardLog = getMinutesLog(sleepiestGuard);

		//	filter array to delete undefined
		const filteredGuardSleepTime = guardSleepTime.filter(
				guard => guard.sleepMinutes.length > 0
			);
		const minuteArray = filteredGuardSleepTime.map(guard => getMinutesLog(guard));
		
		//	Find the minute more frequent for the guard to be asleep
		//	by making an array of enteries for each asleep minute
		const sleepiestMinute = (id, arr) => {
			let mostMinuteAsleep ="";
			arr.forEach(minute => {
				//	check if the comparing minute's tot is greater than the
				//	minute recorded as "most asleep" so far
				if (mostMinuteAsleep === "" || mostMinuteAsleep.tot < minute.tot) {
					mostMinuteAsleep = minute;
				}
			});
			console.log(
				`Minute ${mostMinuteAsleep.minute} was the sleepiest minute for guard ${id} (Slept ${mostMinuteAsleep.tot} times).`
				);
			const obj = { id: id, mostMinuteAsleep: mostMinuteAsleep  };
			return obj;
		}

		const mostMinuteAsleepSleepyGuard = sleepiestMinute(
				sleepiestGuardLog.id,
				sleepiestGuardLog.minuteArray
			).mostMinuteAsleep.minute;

		//	Variable that records the minute when each guard was asleep the most
		const mostMinuteAsleepAll = minuteArray.map(entry =>
				sleepiestMinute(entry.id, entry.minuteArray)
			);

		//	Get the final result for part one
		const resultOne =
		sleepiestGuard.id.match(/\d+/)[0] * mostMinuteAsleepSleepyGuard;
		console.log(resultOne);

		//	Get the guard that sleeps on the same minute the most
		const resultTwoInitial = mostMinuteAsleepAll.reduce((a, b) =>
				a.mostMinuteAsleep.tot > b.mostMinuteAsleep.tot ? a : b
			);

		//Get the final result for part two
		const resultTwo = 
		resultTwoInitial.id.match(/\d+/)[0] * resultTwoInitial.mostMinuteAsleep.minute;
		console.log(resultTwo);
	});
};

mostAsleepGuard();