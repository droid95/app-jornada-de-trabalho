import Container from '@mui/material/Container'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'
import capitalize from '../libs/capitalize'

const WeekTime = (props) => {
  const { days, onSelectEndAt, onSelectStartAt } = props

  const onSelectStartAtHandler = (day, newTime) => {
    if (typeof onSelectStartAt === 'function') onSelectStartAt(day, newTime)
  }

  const onSelectEndAtHandler = (day, newTime) => {
    if (typeof onSelectEndAt === 'function') onSelectEndAt(day, newTime)
  }

  return (
    <Container maxWidth="sm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TransitionGroup>
          {days.map(day => (
            <Collapse key={day.day}>
              <Grid container key={day} mb={3}>
                <Grid item xs={1} display="flex" justifyContent="end">
                  <Typography component="span" mr={2}>
                    { capitalize(day.day.slice(0, 3)) }
                  </Typography>
                </Grid>
                <Grid item display="flex" xs={11}>
                  <TimePicker
                    label="Início"
                    value={day.startAt}
                    onChange={(newTime) => onSelectStartAtHandler(day, newTime)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Typography component="span" mx={2}>Até</Typography>
                  <TimePicker
                    label="Fim"
                    value={day.endAt}
                    onChange={(newTime) => onSelectEndAtHandler(day, newTime)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
            </Collapse>
          ))}
        </TransitionGroup>
      </LocalizationProvider>
    </Container>
  )
}

WeekTime.defaultProps = {
  days: [],
  onSelectEndAt: undefined,
  onSelectStartAt: undefined
}

export default WeekTime