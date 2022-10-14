import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import dayjs from 'dayjs'
import delay from 'delay'
import sort from '../libs/sort'
import capitalize from '../libs/capitalize'
import api from '../api'
import Week from '../components/Week'
import WeekTime from '../components/WeekTime'
import AlertMessage from '../components/AlertMessage'
import AlertDialogSimple from '../components/AlertDialogSimple'

const WeekSchedule = (props) => {
  const { scheduleId } = props

  const [scheduleTodo, setScheduleTodo] = useState('')
  const [scheduleActive, setScheduleActive] = useState(false)
  const [daysSelected, setDaysSelected] = useState([])
  const [lastDaySelected, setLastDaySelected] = useState(null)
  const [openAlertDialogDaySelected, setOpenAlertDialogDaySelected] = useState(false)
  const [openInfoSaveSuccess, setOpenInfoSaveSuccess] = useState(false)
  const [openInfoServerError, setOpenInfoServerError] = useState(false)
  const [savingSchedules, setSavingSchedules] = useState(false)
  const [loadingSchedules, setLoadingSchedules] = useState(false)

  const selectValues = [
    'Abortar',
    'Enviar no próximo expediente'
  ]

  const onSelectDayHandler = (day) => {
    const daySelected = daysSelected.find(d => d.day === day)
    setLastDaySelected(daySelected)

    if (daySelected) {
      setOpenAlertDialogDaySelected(true)
      return  
    }

    const today = dayjs()
    const newDaySelected = {
      day,
      startAt: today,
      endAt: today
    }
    const days = [...daysSelected.slice(), newDaySelected]
    days.sort(sort.weekDay)
    setDaysSelected(days)
  }

  const onSelectStartAtHandler = (schedule, newTime) => {
    const days = daysSelected.slice()
    const indexDay = findDayIndex(schedule.day, days)
    days[indexDay].startAt = newTime
    setDaysSelected(days)
  }

  const onSelectEndAtHandler = (schedule, newTime) => {
    const days = daysSelected.slice()
    const indexDay = findDayIndex(schedule.day, days)
    days[indexDay].endAt = newTime
    setDaysSelected(days)
  }

  const findDayIndex = (day, days) => {
    return days.findIndex(d => d.day === day)
  }

  const removeLastDaySelected = () => {
    const days = daysSelected.slice()
    const indexDay = findDayIndex(lastDaySelected.day, days)
    days.splice(indexDay, 1)
    setDaysSelected(days)
  }

  const getSchedules = async (id = '') => {
    try {
      setLoadingSchedules(true)
  
      const result = await api.schedule.get(id)
      const data = result?.data || null
  
      await delay(400)
      setLoadingSchedules(false)
  
      if (!data) return
  
      setDaysSelected(data?.days.map(day => ({
        day: day.day,
        startAt: dayjs(day.timeStartAt),
        endAt: dayjs(day.timeEndAt)
      })))
  
      setScheduleTodo(data?.todo)
      setScheduleActive(data?.active)

    } catch (error) {
      console.error(error)
      await delay(400)
      setLoadingSchedules(false)
      setOpenInfoServerError(true)
    }
  }

  const saveSchedules = async () => {
    try {
      setSavingSchedules(true)

      const id = scheduleId
      const days = daysSelected.map(day => ({
        day: day.day,
        timeStartAt: day.startAt['$d'],
        timeEndAt: day.endAt['$d']
      }))
      const active = scheduleActive
      const todo = scheduleTodo

      const data = {
        id,
        days,
        active,
        todo
      }

      const result = await api.schedule.edit(id, data)

      await delay(400)
      setSavingSchedules(false)
      if (result?.status === 200) setOpenInfoSaveSuccess(true)

    } catch (error) {
      console.error(error)
      await delay(400)
      setSavingSchedules(false)
      setOpenInfoServerError(true)
    }
  }

  useEffect(() => {
    getSchedules(scheduleId)
  }, [])

  return (
    <Box py={10}>
      <AlertDialogSimple 
        open={openAlertDialogDaySelected}
        onCancel={() => setOpenAlertDialogDaySelected(false)}
        onConfirmation={() => {
          removeLastDaySelected()
          setOpenAlertDialogDaySelected(false)
        }}
        title={`${capitalize(lastDaySelected?.day)} já está selecionado`}
        description="Deseja remover esse dia da jornada de trabalho?"
        buttonCancelText="Cancelar"
        buttonConfirmationText="Remover"
      />
      <AlertMessage 
        open={openInfoSaveSuccess}
        onClose={() => setOpenInfoSaveSuccess(false)}
        message="Jornada de trabalho salva"
      />
      <AlertMessage 
        open={openInfoServerError}
        onClose={() => setOpenInfoServerError(false)}
        message="Certifique-se que o servidor esteja executando na porta 8000."
        hideDuration={20000}
      />
      <Container maxWidth="md">
        <Container sx={{ maxWidth: '320px !important' }}>
          <FormGroup>
            <FormLabel component="legend">Configuração jornada de trabalho</FormLabel>
            <FormControlLabel 
              control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />} 
              label="Ativar horário de trabalho"
              onChange={(e) => setScheduleActive(e.target.checked)}
              checked={scheduleActive}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="legend">Configuração jornada de trabalho</FormLabel>
            <Select
              value={scheduleTodo}
              placeholder="Selecione"
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Selecione</span>
                }
    
                return selected
              }}
              onChange={(e) => setScheduleTodo(e?.target?.value)}
            >
              {selectValues.map(value => (
                <MenuItem key={value} value={value}>
                  { value }
                </MenuItem>
              ))}
            </Select>
          </FormGroup>
        </Container>
        <Box mt={3}>
          <Week 
            onSelectDay={onSelectDayHandler}
            selecteds={daysSelected}
          />
        </Box>
        <Box mt={3}>
          <WeekTime
            days={daysSelected}
            onSelectEndAt={onSelectEndAtHandler}
            onSelectStartAt={onSelectStartAtHandler}
          />
        </Box>
        <Box display="flex">
          <LoadingButton
            loading={savingSchedules || loadingSchedules}   
            onClick={() => saveSchedules()} 
            variant="contained"
            disabled={loadingSchedules}
          >
            SALVAR
          </LoadingButton>
        </Box>
      </Container>
    </Box>
  )
}

export default WeekSchedule