// Modules

import React from 'react'
import SideNav from 'react-simple-sidenav'

// Components
// Styling
// Logic

const SideNavigation = props => {
  return (
    <div>
      <SideNav showNav={props.showNav} onHideNav={props.onHideNav}>
        Options
      </SideNav>
    </div>
  )
}

export default SideNavigation
