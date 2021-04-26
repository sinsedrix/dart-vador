import React from 'react'
import PropTypes from 'prop-types'
import '../assets/scss/main.scss'

const Layout = ({ children }) => {

  return (
    <div className="page">
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
