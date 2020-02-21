import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { BookCardType } from 'types/book/card'
import StarRating from 'components/StarRating'
import { COLOR } from 'styles/tokens'

interface BookCardProps {
  big: boolean
}

const StyledBookCard = styled(Link)<BookCardProps>`
  display: block;
  margin: 0;
  height: 100%;
  padding: 10% 20% calc(10% + 1em);
  position: relative;
  background: ${COLOR.BACKGROUND_CARD};
  border-radius: 2px;
`

interface StyledImgProps {
  background: string
}

const StyledImg = styled(Img)<StyledImgProps>`
  background: ${({ background }): string => background};
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.1), 0 0 0.3em rgba(0, 0, 0, 0.05);
`

const StyledStarRating = styled.div`
  position: absolute;
  left: 0;
  bottom: 0.5em;
  width: 100%;
  text-align: center;
`

interface Props {
  book: BookCardType
  big?: boolean
}

const BookCard: React.FC<Props> = ({ book, big }) => {
  return (
    <StyledBookCard
      to={book.slug}
      big={big}
      style={
        {
          background: big && book.image.colors.lightMuted,
          color: book.image.colors.darkVibrant,
          '--primary-color': book.image.colors.vibrant,
        } as object
      }
      title={`${book.title} by ${book.author}`}
    >
      <StyledImg
        key={book.image.childImageSharp.fluid.src}
        fluid={book.image.childImageSharp.fluid}
        background={book.image.colors.muted}
      />
      <StyledStarRating>
        <StarRating of7={book.rating7} />
      </StyledStarRating>
    </StyledBookCard>
  )
}

export default BookCard
