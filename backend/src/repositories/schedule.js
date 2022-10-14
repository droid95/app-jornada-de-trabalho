const dbFake = require('../database/fakedb')

const findById = (id = '') => dbFake.find(data => Number(data.id) === Number(id))

const editById = (id = '', data) => {
  const recordIndex = dbFake.findIndex(d => Number(d.id) === Number(id))
  dbFake[recordIndex] = data
  return dbFake[recordIndex]
}

module.exports = {
  findById,
  editById
}