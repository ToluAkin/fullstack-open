interface exerciseValues {
    trainingData: Array<number>
    targetNumber: number
}

const parseExerciseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const trainingDays = args.slice(3).map(hour => Number(hour));
    if (!isNaN(Number(args[2])) && !trainingDays.filter(day => isNaN(day))) {
        return { trainingData: trainingDays, targetNumber: Number(args[2]) };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (trainingData: Array<number>, targetNumber: number): object => {
    const periodLength = trainingData.length;
    const sum = trainingData.reduce((a,b) => a + b);
    const trainingDays = trainingData.filter(day => day !== 0).length;
    const averageValue = sum / periodLength;

    const exerciseResult = {
        periodLength,
        trainingDays,
        success: false,
        rating: 0,
        ratingDescription: '',
        target: targetNumber,
        average: averageValue
    };

    if (averageValue < targetNumber ) {
        exerciseResult.rating = 2;
        exerciseResult.ratingDescription = 'not too bad but could be better';
    } else {
        exerciseResult.rating = 3;
        exerciseResult.ratingDescription = 'job well done';
        exerciseResult.success = true;
    }

    return exerciseResult;
};

try {
    const { targetNumber, trainingData } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(trainingData, targetNumber));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));