

import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import ArticlesCard from './ArticleCard';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/?ordering=-view_count&page=${page}&page_size=${pageSize}`);
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
        <div className="container">
            <Banner />
            <Navbar />
            <div className="columns is-multiline">
                {articles.map((article) => (
                    <div className="column is-4" key={article.id}>
                        <ArticlesCard article={article} />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <label htmlFor="page-size" className="label">Mostrar:</label>
                <div className="select">
                    <select
                        id="page-size"
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
                    >
                        <option value="9">9</option>
                        <option value="18">18</option>
                        <option value="36">36</option>
                    </select>
                </div>
                <span>noticias por página</span>
                <div className="page-controls">
                    <button
                        className={`button ${page === 1 ? 'is-disabled' : ''}`}
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Anterior
                    </button>
                    <span>
                        Página {page} de {totalPages}
                    </span>
                    <button
                        className={`button ${page === totalPages ? 'is-disabled' : ''}`}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArticleList;
