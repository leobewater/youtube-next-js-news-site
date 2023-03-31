import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Alert } from 'react-bootstrap'

// Set up component props interface
interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

// Get data on server side, API key not going to be exposed
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  // Delay - simulate server side loading data from api
  // await new Promise(r => setTimeout(r, 3000));

  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles
    }
  }
  // let error go to 500 page
}

// Set the prop and its type
export default function BreakingNewsPage({ newsArticles }: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - NextJS News APp</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page uses getServerSideProps to fetch data server-side on every request. This allows search engines to crawl the page content and improves SEO.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
