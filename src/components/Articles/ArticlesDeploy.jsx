import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';


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

//     return (
//         <div>
//             <Banner/>
//             <Navbar/>
//             <h1>{article.title}</h1>
//             <p>Fecha de creación: {article.created_at}</p>
//             <p>Fecha de actualización: {article.updated_at}</p>
//             <p>{article.content}</p>
//             {article.image && <img src={article.image} alt={article.caption} />}
//             <p>Autor: {article.author}</p>
//             <p>Visitas: {article.view_count}</p>
//             {/* ver como agregamos la info de las tablas relaciionadas */}
//         </div>
//     );
// }

// export default ArticlesDeploy;

// formatear la fecha y hora que devuelve {article.updated_at}
const formattedDate = new Date(article.updated_at).toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
});
return (
    <div className="container my-6">
        <Banner/>
        <Navbar/>
        <div className="box">
        <h1 className="title">{article.title}</h1>
            
            
            <p className="subtitle is-6 mb-4">{article.abstract}</p>
            <div className="level">
                <div className="level-left">
                    <p className="level-item">Actualizado: {formattedDate}</p>
                </div>
                <div className="level-right">
                    <p className="level-item">Autor: {article.author}</p>
                </div>
            </div>
            {article.image && <img src={article.image} alt={article.caption} className="mb-4" />}
            <div className="content">
                {article.content}
            </div>
            {article.image && <p className="has-text-grey-light has-text-right">{article.caption}</p>} {/*si no tiene imagen no rendirza el article.caption */}
            <div className="level">
                <div className="level-right">
                    <p className="level-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-eye"></i>
                            </span>
                            <span>Visitas: {article.view_count}</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}

export default ArticlesDeploy;