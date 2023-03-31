import { NewsArticle } from "@/models/NewsArticles";
import Image from "next/image";
import { Card } from "react-bootstrap";
import placeHolderImage from '@/assets/images/newsarticle_placeholder.jpg'

// Set up component prop
interface NewsArticleEntryProps {
    article: NewsArticle
}

const NewsArticleEntry = ({ article: { title, description, url, urlToImage } }: NewsArticleEntryProps) => {
    const validImageUrl = (urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')) ? urlToImage : undefined;

    return (
        <a href={url}><Card className="h-100">
            {/* <Card.Img src={validImageUrl} variant="top" /> */}
            {/* Use Next.js Image for better performance */}
            <Image
                src={validImageUrl || placeHolderImage}
                width={500}
                height={200} 
                alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card></a>
    );
}

export default NewsArticleEntry;