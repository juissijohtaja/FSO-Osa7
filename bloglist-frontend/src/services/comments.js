import axios from 'axios'
const baseUrl = '/api/blogs'

const createComment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  //const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { createComment }