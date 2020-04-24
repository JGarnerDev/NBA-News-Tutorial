// Modules
// Components
// Styling
// Logic

import React, { Component } from 'react'
import './layout.css'
import Header from '../../components/Header/Header'

class Layout extends Component {
  state = {
    showNav: false
  }

  toggleSidenav = action => {
    this.setState({
      showNav: action
    })
  }

  render () {
    return (
      <div>
        <Header
          showNav={this.state.showNav}
          onHideNav={() => this.toggleSidenav(false)}
          onOpenNav={() => this.toggleSidenav(true)}
        />
        <div>{this.props.children}</div>
        <div>Footer</div>
      </div>
    )
  }
}

export default Layout
