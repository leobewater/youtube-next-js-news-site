import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// Set up component props interface
interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

// Get data on server side, API key not going to be exposed
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: {
      newsArticles: newsResponse.articles
    }
  }
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
        {JSON.stringify(newsArticles)}
      </main>
    </>
  )
}
