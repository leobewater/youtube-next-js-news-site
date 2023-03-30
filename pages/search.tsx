import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {
    // Set type to searchResults, it could be articles or null
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

    // Handle it on the client side
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Casting form data
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get("searchQuery")?.toString().trim();

        if (searchQuery) {
            // Set up a backend to handle the query search using the /pages/api
            try {
                // Reset previous search results
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);

                // Make request and set results to variable
                const response = await fetch(`/api/search-news?q=${searchQuery}`)
                const articles: NewsArticle[] = await response.json();
                setSearchResults(articles);

            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }
        }
    }

    return (
        <>
            {/* Override page title */}
            <Head>
                <title key="title">Search News - NextJS News App</title>
            </Head>
            <main>
                <h1>Search News</h1>
                
                <Alert>
                    This page uses client-side data fetching to show fresh data for every search. Requests are handled by our backend via API routes.
                </Alert>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="search-input">
                        <Form.Label>Search query</Form.Label>
                        <Form.Control name="searchQuery" placeholder="E.G. politics, sports, ..." />
                    </Form.Group>
                    <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
                </Form>

                <div className="d-flex flex-column align-items-center">
                    {/* When fetching data from api */}
                    {searchResultsLoading && <Spinner animation="border" />}

                    {/* Show error message */}
                    {searchResultsLoadingIsError && <p>Something went wrong. Please try again.</p>}

                    {/* Show 0 results */}
                    {searchResults?.length === 0 && <p>Nothing found. Try a different query.</p>}

                    {searchResults && <NewsArticlesGrid articles={searchResults} />}

                </div>
            </main>
        </>
    );
}

export default SearchNewsPage;