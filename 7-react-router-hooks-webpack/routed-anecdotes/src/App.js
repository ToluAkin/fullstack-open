import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link, useParams, useHistory } from 'react-router-dom'

const Menu = () => {
    const padding = { paddingRight: 5 }
    return (
        <nav>
            <Link to='/' style={padding}>anecdotes</Link>
            <Link to='/create' style={padding}>create new</Link>
            <Link to='/about' style={padding}>about</Link>
        </nav>
    )
}

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            { anecdotes.map(anecdote =>
                <li key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            ) }
        </ul>
    </div>
)

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(content => content.id === id )
    return (
        <>
            <h1>{ anecdote.content } by { anecdote.author }</h1>
            <p>has { anecdote.votes } votes</p>
            <p>for more info see { anecdote.info }</p>
        </>
    )
}

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is
            not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate
            an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."
        </em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        <p>Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.</p>

        <p>See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
            https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
        </p>
    </div>
)

const CreateNew = ({ addNew }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    const history = useHistory()
    
    const handleSubmit = e => {
        e.preventDefault()
        addNew({ content, author, info, votes: 0 })
        history.push('/')
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={ handleSubmit }>
                <p>
                    <label htmlFor="content">content</label><br />
                    <input name='content' value={content} onChange={ e => setContent(e.target.value) } />
                </p>
                <p>
                    <label htmlFor="author">author</label><br />
                    <input name='author' value={author} onChange={ e => setAuthor(e.target.value) } />
                </p>
                <p>
                    <label>url for more info</label><br />
                    <input name='info' value={info} onChange={ e => setInfo(e.target.value) } />
                </p>
                    
                <div><button type="submit">create</button></div>
            </form>
        </div>
    )
}

const App = () => {
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

    const [notification, setNotification] = useState('')

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