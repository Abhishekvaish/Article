import React from "react"
import PropTypes from "prop-types"
import {Link } from "gatsby"
import "./Layout.css"
import "materialize-css/dist/css/materialize.min.css"


const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav className="deep-purple lighten-1">
            <div className="nav-wrapper container">
              <Link style = {{fontSize:"2.5rem"}} to="/" className="brand-logo">Article</Link>
            </div>
        </nav>
      </header>
      <main className="container">{children}</main>
      <footer className="page-footer deep-purple">
          <div className="footer-copyright">
            <div className="container">
              © {new Date().getFullYear()}, Built with 
              <a className="white-text" href="https://www.gatsbyjs.com">&nbsp; Gatsby, </a>
              <a className="white-text" href="https://materializecss.com/">Materialize CSS</a>
            </div>
          </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
