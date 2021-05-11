import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
	return (
		<button onClick={ handleClick }>
			{ text }
		</button>
	);
}

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>{ text }</td>
			<td>{ value }</td>
		</tr>
	);
}

const Statistics = (props) => {
	let feedback = props.feedback
	let percentage = feedback.positive
	let average = feedback.average

	if (isNaN(percentage)) percentage = 0 
	if (isNaN(average)) average = 0

	let statistics;
	if (feedback.all < 1) {
		statistics = <p>No feedback given</p>
	} else {
		statistics =
			<table>
				<tbody>
					<Statistic text={'good'} value={ feedback.good } />
					<Statistic text={'neutral'} value={ feedback.neutral } />
					<Statistic text={'bad'} value={feedback.bad} />
					<Statistic text={'all'} value={ feedback.all } />
					<Statistic text={'average'} value={ average } />
					<Statistic text={'positive'} value={ percentage + '%'} />
				</tbody>
			</table>
	}

	return (
		<div>
			<h1>Statistics</h1>
			{statistics}
		</div>
	);
}

const App = () => {
	const [good, setGood] = useState(0)
  	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleClicks = (setValue, value) => {
		setValue(value + 1)
	}

	let sum = good + bad + neutral

	const feedback = {
		'good': good,
		'neutral': neutral,
		'bad': bad,
		'all': sum,
		'average': (good  -bad) / sum,
		'positive': good/sum * 100
	}
	
	return (
		<div>
			<h1>Give Feedback</h1>
			<Button handleClick={() => handleClicks(setGood, good)} text={'good'} />
			<Button handleClick={() => handleClicks(setNeutral, neutral)} text={'neutral'} />
			<Button handleClick={() => handleClicks(setBad, bad)} text={'bad'} />
			<Statistics feedback={feedback} />
		</div>
	);
}

export default App;
