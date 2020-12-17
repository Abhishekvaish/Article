import React from "react"
import { Link,graphql } from "gatsby"
import Layout from "../components/Layout/Layout.js"

const IndexPage = ({data}) => {
	const allMarkdownRemark = data.allMarkdownRemark	
	return (
		<Layout>
			{allMarkdownRemark.edges.map((edge)=>(
				<div key = {edge.node.id} className="card-panel hoverable">
					<h3>{edge.node.frontmatter.title }</h3>
					<p>by <b>{edge.node.frontmatter.author}</b><br/>{edge.node.frontmatter.date }</p>
					<p>{edge.node.excerpt }</p>
					{edge.node.frontmatter.tags.split(",").map((tag)=>(
						<div key={tag} className="chip">{tag}</div>
					)) }
					<br/><br/>
					<Link to ={edge.node.frontmatter.path }>Read More</Link>
				</div>
			))}
		</Layout>
	)
}

export const pageQuery = graphql`
	query AllBlogPost {
		allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
			edges {
				node {
					frontmatter {
						author
						date(formatString: "MMM DD, YYYY")
						path
						title
						tags
					}
					id
					excerpt
				}
			}
		}
	}`


export default IndexPage;

