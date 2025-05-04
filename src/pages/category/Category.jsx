import { useState } from "react";


export const Category = () => {
    const { categories, loading} = useCategory();

    if (loading) return <p> Cargando categorias ....</p>;

    return (

        <div>
            <h2> Categorias </h2>
            <ul>
                {categories.map((cat) => (
                    <li key={cat._id}>
                        <h3>{cat.nameCategory}</h3>
                        
                    </li>
                ))}
             </ul>
         </div>
    )

}