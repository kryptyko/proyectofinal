import { useState, useEffect } from "react";
import ArticlesCard from "./ArticlesCard";
import Header from "./Header";
import NavBar from "./NavBar";


export default function ArticlesList() {
    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [articles, setArticles] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    

    const fetchArticles = async () => {
        setIsLoading(true);
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}infosphere/articles/?page=${page}&page_size=5${selectedCategory ? `&category=${selectedCategory}` : ''}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las Noticias");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setArticles((prevArticles) => [...prevArticles, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setArticles([]);
        setPage(1);
        fetchArticles();
    }, [selectedCategory]);

    useEffect(() => {
        fetchArticles();
    }, [page]);

    function handleLoadMore() {
        if (nextURL) {
            setPage((currentPage) => currentPage + 1);
        }
    }

    function handleCategorySelect(categoryId) {
        setSelectedCategory(categoryId);
    }

    return (
        <div>
            <Header />
            <NavBar onSelectCategory={handleCategorySelect} />
            <div className="my-5">
                <h2 className="title">Lista de Noticias</h2>
                <ul>
                    {articles.map((article, index) => (
                        <div key={article.id || index} className="column is-two-thirds">
                            <ArticlesCard article={article} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
                {nextURL && !isLoading && (
                    <button
                        className="button is-primary"
                        onClick={handleLoadMore}
                    >
                        Cargar más
                    </button>
                )}
            </div>
        </div>
    );
}