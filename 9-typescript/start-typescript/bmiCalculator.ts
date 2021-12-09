interface BodyValues {
    height: number
    weight: number
}

const parseBmiArguments = (args: Array<string>): BodyValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, weight: number): string => {
    height *= 0.01
    const bmi = weight / (height * height)

    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)'
    } else if (bmi >= 25 && bmi <= 29.9) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
}

try {
    const { height, weight } = parseBmiArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}

// console.log(calculateBmi(180, 74))