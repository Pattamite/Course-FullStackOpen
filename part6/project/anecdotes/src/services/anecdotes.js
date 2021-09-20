import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  const response = await axios.get(baseUrl)
  return response.data
}

async function getById(id) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data
}

async function createNew(text) {
  const object = { text: text, vote: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
}

async function update(id, newObject) {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}

const anecdotesService = {
  getAll,
  getById,
  createNew,
  update
}

export default anecdotesService;