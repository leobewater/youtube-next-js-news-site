import { NewsArticle } from "@/models/NewsArticles";
import { Card } from "react-bootstrap";

// Set up component prop
interface NewsArticleEntryProps {
    article: NewsArticle
}

const NewsArticleEntry = ({ article: { title, description, url, urlToImage } }: NewsArticleEntryProps) => {
    const validImageUrl = (urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')) ? urlToImage : undefined;

    return (
        <a href={url}><Card className="h-100">
            <Card.Img src={validImageUrl} variant="top" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card></a>
    );
}

export default NewsArticleEntry;