import React, {useMemo} from 'react'
import USAMap from 'react-usa-map'
import './index.css'
import {useTheme} from '@mui/material'

const UsaMap = (props) => {
  const {states} = props
  const mapHandler = (event) => {
    alert(event.target.dataset.name)
  }
  const theme = useTheme()

  const statesCustomConfig = useMemo(() => {
    if (states) {
      let object = {}
      Object.keys(states).map((item) => {
        object[item] = {fill: theme.palette.primary.main}
        return true
      })
      return object
    }
  }, [states, theme.palette.primary.main])

  return (
    <div>
      <USAMap style={{width: '100px'}} customize={statesCustomConfig} onClick={mapHandler} />
    </div>
  )
}

export default UsaMap
