module.exports = {
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
			name: `Content`,
			path: `${__dirname}/public`,
			}
		},
		`gatsby-transformer-remark`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-image`,
	],
}
