import React,{useState} from "react"
import { Link,graphql } from "gatsby"
import Layout from "../components/Layout/Layout.js"

const IndexPage = ({data}) => {

	const [allMarkdownRemark,setAllMarkdownRemark ] = useState(data.allMarkdownRemark.edges)
	const search = (e) => {
		const searchString = e.target.value.toLowerCase().trim();
		const filteredData  = data.allMarkdownRemark.edges.filter((edge) => {
			return edge.node.frontmatter.title.toLowerCase().includes(searchString) ||
			edge.node.frontmatter.tags.toLowerCase().includes(searchString) 
		})
		setAllMarkdownRemark(filteredData);
	}
	return (
		<Layout>
			<div id="searchwrapper">
	            <input type="text" onChange={(e) => search(e)}/>
            </div>
			{allMarkdownRemark.map((edge)=>(
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
			<br/><br/><br/>
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

