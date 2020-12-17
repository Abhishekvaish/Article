import React from "react"
import PropTypes from "prop-types"
import {Link } from "gatsby"
import "./Layout.css"

const search = () => {
  console.log(document.getElementById("search").value)
}


const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav>
            <div className="container">
              <Link to="/" className="brand-logo">Article</Link>
              <div id="searchwrapper">
                <input id="search" type="text" required/>
              </div>
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
