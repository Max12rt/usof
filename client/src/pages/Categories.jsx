import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div>
            <h2>All Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
