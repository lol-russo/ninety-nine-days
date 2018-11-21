import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import AuthorBio from "../components/AuthorBio";

import Content, { HTMLContent } from "../components/Content";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  featuredImage,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <article className="pb5">
        {helmet || ""}
        <img src={featuredImage} alt="" className="pl2 pr2" />
        <div>
          <h1 className="tc normal f1-ns f2 mt5 tc lh-title">{title}</h1>

          <p className="tc mb5 f5 tc helvetica fw3 black-60">
            — {description} —
          </p>

          <div className="measure-wide lh-copy center f4-ns f5 pl2 pr2">
            <div className="content">
              <PostContent content={content} />
            </div>
            {tags && tags.length ? (
              <ul className="list flex justify-start items-center flex-wrap mt4 ma0 pl1 black-60">
                <li className="mt0 lh-solid">
                  <Link
                    className="black-60 f5 tc helvetica fw3 bb-0 flex items-center"
                    to={`/tags/`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w1 mr2"
                    >
                      <title>view tags</title>
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    </svg>{" "}
                  </Link>
                </li>

                {tags.map(tag => (
                  <li className="mt0 lh-solid" key={tag + `tag`}>
                    <Link
                      className="black-60 f5 helvetica fw3 bb-0 pa3 flex items-center link"
                      to={`/tags/${kebabCase(tag)}/`}
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>
      <AuthorBio />
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet)
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet title={`${post.frontmatter.title} | ninety-nine days`}>
            <meta name="description" content={post.excerpt} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        featuredImage={post.frontmatter.featuredImage}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredImage
      }
    }
  }
`;
