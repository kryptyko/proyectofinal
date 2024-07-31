import React, { useEffect, useState } from 'react';
//import './Home.css';

function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/?page=${page}&page_size=${pageSize}`);
                if (!response.ok) {
                    const errorMessage = `Error ${response.status}: ${response.statusText}`;
                    throw new Error(errorMessage);
                }
                const data = await response.json();
                setArticles(data.results);
                setTotalPages(Math.ceil(data.count / pageSize));
            } catch (error) {
                console.error('Error al cargar los artículos:', error);
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        if (page > 0 && pageSize > 0) {
            fetchArticles();
        } else {
            setError('Página o tamaño de página inválidos');
        }
    }, [page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    if (loading) return <p>Cargando artículos...</p>;
    if (error) return <p>Error al cargar los artículos: {error}</p>;

    return (
        <div>
        <h1>Noticias</h1>
        <div className="cards-container">
            {articles.map((article) => (
                <div className="card" key={article.id}>
                    <img src={article.image || 'https://via.placeholder.com/150'} alt={article.title} />
                    <div className="card-content">
                        <h2>{article.title}</h2>
                        <p>{article.abstract || article.content.substring(0, 100)}...</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Leer más</a>
                    </div>
                </div>
            ))}
        </div>
        <div className="pagination">
            <label htmlFor="page-size">Mostrar:</label>
            <select
                id="page-size"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
            noticias por página
            <div className="page-controls">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Anterior
                </button>
                <span>
                    Página {page} de {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    </div>
    );
}

export default Home;