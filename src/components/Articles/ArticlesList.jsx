import { useState, useEffect } from "react";
import ArticlesCard from "./ArticlesCard";

export default function ArticlesList() {
    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [articles, setArticle] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const doFetch = async () => {
        setIsLoading(true);
        fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }infosphere/articles/?ordering=-created_at&page=${page}&page_size=5`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se puedieron cargar las Noticias");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setArticle((prevArticle) => [...prevArticle, ...data.results]);
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

    function handleLoadMore() {
        if (nextURL) {
            setPage((currentPage) => currentPage + 1);
        }
    }

    function handleDelete(articleId) {
        setArticle(articles.filter((article) => article.id !== articleId));
    }

    useEffect(() => {
        doFetch();
    }, [page]);

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Noticias</h2>
                <ul>
                    {articles.map((article) => (
                        <div key={article.id} className="column is-two-thirds">
                            <ArticlesCard article={article} onDelete={handleDelete} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más Noticias...</p>}
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