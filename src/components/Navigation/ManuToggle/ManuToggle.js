import React from 'react'
import classes from './ManuToggle.css'

const ManuToggle = props => {

  const cls = [
    classes.MenuToggle,
    'fa'
  ]
    if(props.isOpen) {
      cls.push('fa-times')
      cls.push(classes.open)
    } else {
      cls.push('fa-bars')
    }

  return (
    <i
      className={cls.join(' ')}
      onClick={props.onToggle}
    />
  )
}

export default ManuToggle