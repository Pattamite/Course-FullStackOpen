import axios from 'axios'

const baseUrl = '/api/persons';

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

function remove(id){
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {return response;});
}

const PhonebookDb = {
  getAll,
  create,
  update,
  remove
};

export default PhonebookDb;