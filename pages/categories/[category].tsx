import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";

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
        }
    }
}

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
    return (<>
        <main>
            <NewsArticlesGrid articles={newsArticles} />
        </main>
    </>);
}

export default CategoryNewsPage;