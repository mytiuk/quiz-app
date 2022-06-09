import React, { Component } from 'react'
import classes from './Drower.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

class Drower extends Component {

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            end={link.exact}
            className={({ isActive }) => (isActive ? "Drower.active" : "")}
            onClick={this.props.onToggle}
          >{link.label}</NavLink>
        </li>
      )
    })
  }

  render () {

    const cls = [classes.Drower]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'List', exact: true},
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create test', exact: false})
      links.push({to: '/logout', label: 'Logout', exact: false})
    } else {
      links.push({to: '/auth', label: 'Authorization', exact: false})
    }

    return (
      <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>
            {this.renderLinks(links)}
        </ul>
      </nav>
      { this.props.isOpen ? <Backdrop onClose={this.props.onToggle}/> : null}
      </React.Fragment>
    )
  }
}

export default Drower