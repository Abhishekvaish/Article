const path = require('path')

exports.createPages = ({actions,graphql}) => {
	const {createPage } = actions

	const postTemplate = path.resolve('src/templates/blog-template.js')

	return graphql(`
		query MyQuery {
			allMarkdownRemark {
				edges {
					node {
						id
						frontmatter {
							path
						}
					}
				}
			}
		}
	`).then(res => {
		if (res.errors)
			return Promise.reject(res.errors)
		res.data.allMarkdownRemark.edges.forEach(edge => {
			createPage({
				path:edge.node.frontmatter.path,
				component:postTemplate,
				context: {
					id: edge.node.id
				},
			})
		})

	})
}