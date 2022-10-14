const Validator = require('validatorjs')

const edit = (req, res, next) => {
  const rules = {
    id: 'required|numeric',
    active: 'boolean',
    todo: 'string',
    'days.*.day': 'required|string|in:segunda,terça,quarta,quinta,sexta,sábado,domingo',
    'days.*.timeStartAt': 'required|date',
    'days.*.timeEndAt': 'required|date'
  }
  const validation = new Validator(req.body, rules)
  const fail = validation.fails()

  if (fail) return res.status(400).send(validation.errors)

  next()
}

module.exports = {
  edit
}