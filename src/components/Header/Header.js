// Modules

import React from 'react'
import { Link } from 'react-router-dom'

// Components

import SideNav from './SideNav/SideNav'

// Styling

import style from './header.module.css'
import FontAwesome from 'react-fontawesome'

// Logic

const Header = props => {
  const Nav = () => (
    <div className={style.barsContainer}>
      <FontAwesome
        onClick={props.onOpenNav}
        name='bars'
        style={{ color: 'white', padding: '15px', cursor: 'pointer' }}
      />
    </div>
  )

  const logo = () => {
    return (
      <Link to='/' className={style.logo}>
        <img src='/images/nba_logo.png' alt='logo' />
      </Link>
    )
  }

  return (
    <header className={style.header}>
      <SideNav {...props} />
      <div className={style.header_options}>
        {Nav()}
        {logo()}
      </div>
    </header>
  )
}

export default Header
