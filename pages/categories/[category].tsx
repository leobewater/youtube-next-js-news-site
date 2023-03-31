import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

interface CategoryNewsPageProps {
    newsArticles: NewsArticle[]
}

// Define the paths before fetching static data
export const getStaticPaths: GetStaticPaths = async () => {
    const categorySlugs = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology',
    ];

    // Need specific format with params{}
    const paths = categorySlugs.map(slug => ({ params: { category: slug } }))

    return {
        paths,
        fallback: false
    }
}

// Get data at compile time using GetStaticProps
export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
    const category = params?.category?.toString().trim();

    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
    const newsResponse: NewsResponse = await response.json();

    return {
        props: {
            newsArticles: newsResponse.articles
        },
        revalidate: 5 * 60,// refresh every 5 mins when someone open the pages and cached in server
    }
    // let error go to 500 page
}

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
    const router = useRouter();
    const categoryName = router.query.category?.toString();

    const title = "Category: " + categoryName;

    return (<>
        <Head>
            <title key="title">{`${title} - NextJs News App`}</title>
        </Head>
        <main>
            <h1>{title}</h1>

            <Alert>
                This page uses getStaticProps for very high page loading speed and incremental static regeneration to show data not older than 5 minutes.
            </Alert>

            <NewsArticlesGrid articles={newsArticles} />
        </main>
    </>);
}

export default CategoryNewsPage;