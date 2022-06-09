import React, {Component} from 'react'
import classes from '../Layout/Layout.css'
import ManuToggle from '../../components/Navigation/ManuToggle/ManuToggle'
import Drower from '../../components/Navigation/Drover/Drower'
import { connect } from 'react-redux'

class Layout extends Component {

  state = {
    menu: false
  }

  togleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
       <Drower
        isOpen={this.state.menu}
        onToggle={this.togleMenuHandler}
        isAuthenticated={this.props.isAuthenticated}
       />
       <ManuToggle
       isOpen={this.state.menu}
       onToggle={this.togleMenuHandler}/>
        <main >
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout) 