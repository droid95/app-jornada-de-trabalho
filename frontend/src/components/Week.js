import Grid from '@mui/material/Grid'
import ButtonCircle from './ButtonCircle'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grow from '@mui/material/Grow'
import { useEffect, useState } from 'react'
import constants from '../configs/constants'

const Week = (props) => {
  const { onSelectDay, selecteds } = props
  const [animate, setAnimate] = useState(false)

  const isSmall = useMediaQuery('(max-width: 600px)')

  const onSelectDayHandler = (day = null) => {
    if (typeof onSelectDay === 'function') onSelectDay(day)
  }

  const days = constants.DAYS.map(day => day.name)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <Grid container spacing={isSmall ? 0.5 : 3} justifyContent="center">
      {days.map((day, index) => (
        <Grid item key={day}>
          <Grow 
            in={animate}
            style={{ transformOrigin: '0 0 0' }}
            {...(index > 0 ? { timeout: index * 200 } : {})}
          >
            <ButtonCircle 
              onClick={() => onSelectDayHandler(day)}
              selected={selecteds.find(value => value.day === day)}
            >
              { day[0].toUpperCase() }
            </ButtonCircle>
          </Grow>
        </Grid>
      ))}
    </Grid>
  )
}

Week.defaultProps = {
  onSelectDay: undefined,
  selecteds: []
}

export default Week