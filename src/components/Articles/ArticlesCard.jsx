import { useAuth } from "../../contexts/AuthContext";

function ArticlesCard({ article, onDelete }) {
    const state = useAuth("state");
    const token = state.token

    const handleDelete = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${article.id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            },
        
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo eliminar el Artículo")
            }
            onDelete(article.id);
        })
        .catch((error) => {
            console.error("Error al eliminar", error);
        });
    };

    return (
        <div className={`card has-background-dark`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {article.title}
                            
                        </p>
                    </div>
                </div>
                <div className="content">
                      {article.content}
                </div> 
                {/* {state.isAuthenticated && article.author === state.user.id && ( */}
                    <button className="delete is-small" onClick={handleDelete}>
                        
                    </button>Eliminar
                {/* )} */}
            </div>
        </div>
    );
}

export default ArticlesCard;