import { NewsArticle } from "@/models/NewsArticles";
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

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
            alert(searchQuery)
        }
    }

    return (
        <main>
            <h1>Search News</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search query</Form.Label>
                    <Form.Control name="searchQuery" placeholder="E.G. politics, sports, ..." />
                </Form.Group>
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
            </Form>
        </main>
    );
}

export default SearchNewsPage;