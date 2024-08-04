import  { useEffect, useState } from 'react';
import Navbar from '/src/components/Navbar/Navbar';
import Banner from '/src/components/Banner/Banner';
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
            <Banner/>
            {/* <h1 className="title is-1">Noticias</h1> */}
            <Navbar/>
            <div className="columns is-multiline">
                {articles.map((article) => (
                    <div className="column is-4" key={article.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={article.image || 'https://via.placeholder.com/150'} alt={article.title} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{article.title} </p>
                                    </div>
                                </div>
                                
                                <div className="content">
                                    {article.abstract || article.content.substring(0, 100)}...
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Leer más</a>
                                </div>
                                
                            </div>
                        </div>
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
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <span>noticias por página</span>
                <div className="page-controls">
                    <button
                        className={`button ${page === 1 ? 'is-disabled' : ''}`}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Anterior
                    </button>
                    <span>
                        Página {page} de {totalPages}
                    </span>
                    <button
                        className={`button ${page === totalPages ? 'is-disabled' : ''}`}
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