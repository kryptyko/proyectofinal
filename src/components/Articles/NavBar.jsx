import { useEffect, useState } from "react";

export default function NavBar({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/categories/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las Categorías");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setCategories(data.results);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <nav className="navbar">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className="button"
                >
                    {category.name}
                </button>
            ))}
        </nav>
    );
}
