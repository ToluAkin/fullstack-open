import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    let voteArray = new Array(anecdotes.length).fill(0)
    
    const [selected, setSelected] = useState(0)
    const [copy, setCopy] = useState(voteArray)
    voteArray = copy //keeping the value of the array when the browser refreshes

    const handleNextValue = () => {
        let random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    const handleVote = () => {
        let position = anecdotes.indexOf(anecdotes[selected])
        let copyVote = [...copy]
        copyVote[position]++
        setCopy(copyVote)
    }

    let max = Math.max(...voteArray)
    let maxValue = voteArray.indexOf(max)

    let handleMostVotes;
    if (max > 0) {
        handleMostVotes =
        <div>
            <h1>Anecdotes with most votes</h1>
            <p>{ anecdotes[maxValue] }</p>
            <p> has { max } votes</p>
        </div>
    }

    return (
        <div>
            <p>{ anecdotes[selected] }</p>
            <p>has { voteArray[selected] } votes</p>
            <button onClick={ handleVote }>Vote</button>
            <button onClick={ handleNextValue }>Next Anecdote</button>
            { handleMostVotes }
        </div>
    )
}

export default App