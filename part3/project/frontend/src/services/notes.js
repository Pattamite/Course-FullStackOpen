import axios from 'axios'

const baseUrl = '/api/notes';

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => {return response.data;});
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {return response.data;});
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {return response.data;});
}

const notes = {
  getAll,
  create,
  update
};

export default notes;