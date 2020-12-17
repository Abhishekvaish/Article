import React from "react"
import PropTypes from "prop-types"
import {Link } from "gatsby"
import "./Layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav>
            <div className="container">
              <Link to="/" className="brand-logo">Article</Link>
            </div>
        </nav>
      </header>
      <main className="container">{children}</main>
      <footer>
            <div className="container">
              © {new Date().getFullYear()}, Built with 
              <a className="white-text" href="https://www.gatsbyjs.com">&nbsp; Gatsby, </a>
            </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
