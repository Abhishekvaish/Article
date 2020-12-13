import React from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/Layout/Layout.js"

const BlogPage = ({data}) => {
	const post = data.markdownRemark
	return (
		<Layout>
			<div className = "card-panel " style={{marginTop:"30px",marginBottom:"50px",paddingLeft:"5%",paddingRight:"5%"}}>
				<h2>{post.frontmatter.title} </h2>
				<p>by <b>{post.frontmatter.author}</b><br/>{post.frontmatter.date }</p>
				<br/>
				<Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
				<br/>
				<div dangerouslySetInnerHTML={{__html:post.html}} />			
			</div>
		</Layout>
	)
}

export const pageQuery = graphql`
query BlogPage($id:String) {
	markdownRemark(id: {eq:$id}) {
		id
		frontmatter {
			author
			date(formatString: "MMM DD, YYYY")
			path
			title
			featuredImage {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
		html
	}
}	
`


export default BlogPage;