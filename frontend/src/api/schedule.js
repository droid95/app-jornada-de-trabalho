import axios from 'axios'
import { endpoint } from '../configs/api'

const get = (id = '') => axios.get(`${endpoint}/schedule/${id}`)

const edit = (id = '', data = {}) => axios.put(`${endpoint}/schedule/${id}`, data)

export default {
  get,
  edit
}