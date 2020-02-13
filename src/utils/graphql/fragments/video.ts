import { graphql } from 'gatsby'

export const query = graphql`
  fragment VideoFields on Videos {
    title
    youtubeId
    description
    datePublished
    # fields {
    #   timestamps {
    #     t
    #     text
    #     book
    #   }
    # }
    image {
      childImageSharp {
        fluid(maxWidth: 915, quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }

  fragment VideoCardFields on Videos {
    id
    title
    datePublished
    fields {
      slug
    }
    image {
      childImageSharp {
        fluid(maxWidth: 915, quality: 70) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
