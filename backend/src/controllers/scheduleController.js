const scheduleRepository = require('../repositories/schedule')

const get = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await scheduleRepository.findById(id)
    return res.send(data)
  } catch (error) {
    next(error)
  }
}

const edit = async (req, res, next) => {
  try {
    const { body } = req
    const { id } = req.params
    const data = await scheduleRepository.editById(id, body)
    return res.send(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
  edit
}