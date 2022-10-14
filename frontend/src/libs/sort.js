import constants from '../configs/constants'

const weekDays = {}
constants.DAYS.forEach(day => weekDays[day.name] = day.number)

const weekDay = (a, b) => {
  return weekDays[a.day] - weekDays[b.day]
}

export default {
  weekDay
}