import { resolve } from 'path'

import PAGES from 'routes'
import { normalizeArray } from 'utils/graphql/normalize'

interface Video {
  id: string
  slug: string
}

interface Book {
  id: string
  slug: string
}

export const createPagesStatefully = async ({
  graphql,
  actions,
  reporter,
}): Promise<boolean> => {
  const { createPage } = actions

  const {
    data: { allVideos: videoData, allMarkdownRemark: bookData },
  } = await graphql(`
    query {
      allVideos {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const videos = normalizeArray(videoData) as Video[]
  const books = normalizeArray(bookData) as Book[]

  /**
   * Video pages
   */

  videos.forEach((video) => {
    const { slug, id } = video

    const activity = reporter.activityTimer(`createPage ${slug}`)
    activity.start()
    createPage({
      path: slug,
      component: resolve(`./src/views/${PAGES.VIDEO.VIEW}/index.tsx`),
      context: {
        id,
      },
    })
    activity.end()
  })

  /**
   * Book pages
   */

  books.forEach((book) => {
    const { slug, id } = book

    const activity = reporter.activityTimer(`createPage ${slug}`)
    activity.start()
    createPage({
      path: slug,
      component: resolve(`./src/views/${PAGES.BOOK.VIEW}/index.tsx`),
      context: {
        id,
      },
    })
    activity.end()
  })

  /**
   * Flat pages
   */
  type PagesAsEntries = [string, { PATH: string; VIEW: string }]
  Object.entries(PAGES).forEach(([PAGE, { PATH, VIEW }]: PagesAsEntries) => {
    if (['BOOK', 'VIDEO'].includes(PAGE)) return

    const activity = reporter.activityTimer(`createPage ${PATH}`)
    activity.start()
    createPage({
      path: PATH,
      component: resolve(`./src/views/${VIEW}/index.tsx`),
    })
    activity.end()
  })

  return true
}
