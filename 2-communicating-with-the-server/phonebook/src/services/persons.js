import axios from 'axios'
const baseUrl = 'https://fullstackopen-phone-book-api.herokuapp.com/api/persons'
// const baseUrl = 'http://localhost:3001/api/persons'

// get all persons
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// save data of a person
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// update the data of a person
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// delete the data of a person
const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const queries = {
    getAll,
    create,
    update,
    remove
}

export default queries