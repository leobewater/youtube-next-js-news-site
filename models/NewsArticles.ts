// Set up model for News Article
// https://newsapi.org/docs/endpoints/everything
export interface NewsArticle {
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage?: string,
    publishedAt: string,
    content: string
}

// Response with multiple articles
export interface NewsResponse {
    articles: NewsArticle[],
}