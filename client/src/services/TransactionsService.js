import http from '../helpers/http-common';

//retorna todas as transacoes de um periodo de ano-mes
const getAll = (period) => {
  return http.get(`/transaction/${period}`);
};

const get = (id) => {
  return http.get(`/transaction/byId/${id}`);
};

const create = (data) => {
  return http.post('/transaction', data);
};

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/transaction/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};