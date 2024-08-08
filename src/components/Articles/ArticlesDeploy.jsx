import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

function ArticlesDeploy() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar la noticia");
                }
                return response.json();
            })
            .then((data) => {
                setArticle(data);               
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return <p>Error al cargar la noticia</p>;
    }

    return (
        <div>
            <Header />
            <div>
                <h1>{article.title}</h1>
                <p>Fecha de creación: {article.created_at}</p>
                <p>Fecha de actualización: {article.updated_at}</p>
                <p>{article.content}</p>
                {article.image && <img src={article.image} alt={article.caption} />}
                <p>Autor: {article.author}</p>
                <p>Visitas: {article.view_count}</p>
                {/* Agregar la información de las tablas relacionadas aquí */}
            </div>
        </div>
    );
}

export default ArticlesDeploy;