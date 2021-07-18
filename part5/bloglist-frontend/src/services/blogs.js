import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `bearer ${newToken}`

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response
}

const create = async newObject => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject, blogId) => {
    const response = await axios.put(`${ baseUrl }/${ blogId }`, newObject)
    return response.data
}

const remove = async blogId => {
    const config = { headers: { Authorization: token } }
    const request = await axios.delete(`${ baseUrl }/${ blogId }`, config)
    return request.data
}

const query = { getAll, create, setToken, update, remove }
export default query