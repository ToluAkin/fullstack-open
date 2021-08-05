import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async content => {
    const payload = { content, votes: 0 }
    const response = await axios.post(baseUrl, payload)
    return response.data
}

const voteUp = async content => {
    const response = await axios.put(`${ baseUrl }/${ content.id }`, content)
    return response.data
}

const query = { getAll, createNew, voteUp }

export default query