import { NewsArticle } from "@/models/NewsArticles";

// Set up component prop
interface NewsArticleEntryProps {
    article: NewsArticle
}

const NewsArticleEntry = ({ article: { title, description, url, urlToImage } }: NewsArticleEntryProps) => {
    const validImageUrl = (urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')) ? urlToImage : undefined;

    return (
        <h1>{title}</h1>
    );
}

export default NewsArticleEntry;