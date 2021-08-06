import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/NewAnecdote'

const App = () => {
    const [notification, setNotification] = useState('')
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`A new anecdote ${ anecdote.content } created!`)
        setTimeout(() => setNotification(''), 10 * 1000)
    }

    const anecdoteById = (id) => anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)
        const voted = { ...anecdote, votes: anecdote.votes + 1 }
        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <BrowserRouter>
            <Switch>
                <div>
                    <h1>Software anecdotes</h1>
                    <Menu />
                    <strong>{ notification }</strong>
                    <Route exact path="/">
                        <AnecdoteList anecdotes={ anecdotes } />
                    </Route>
                    <Route path="/about" component={ About } />
                    <Route path="/create">
                        <CreateNew addNew={ addNew } />
                    </Route>
                    <Route path="/anecdotes/:id">
                        <Anecdote anecdotes={ anecdotes } />
                    </Route>
                    <Footer />
                </div>
            </Switch>
        </BrowserRouter>
        
    )
}

export default App;