// src/components/EditArticleForm.tsx
import React, { useState } from "react";

interface EditArticleFormProps {
    articleId: string;
    initialTitre: string;
    initialContenu: string;
    initialImage: string;
}

const EditArticleForm: React.FC<EditArticleFormProps> = ({
    articleId,
    initialTitre,
    initialContenu,
    initialImage,
}) => {
    const [titre, setTitre] = useState(initialTitre);
    const [contenu, setContenu] = useState(initialContenu);
    const [image, setImage] = useState(initialImage);

    const handleEdit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = { titre, contenu, image };

        try {
            const response = await fetch(
                `http://localhost:5000/bureau/articles/${articleId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                alert("Article mis à jour !");
                window.location.href = `/news/${articleId}`;
            } else {
                alert("Erreur lors de la mise à jour.");
            }
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <form onSubmit={handleEdit} className="space-y-4">
            <div>
                <label className="block font-medium">Titre</label>
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    name="titre"
                />
            </div>
            <div>
                <label className="block font-medium">Contenu</label>
                <textarea
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    name="contenu"
                />
            </div>
            <div>
                <label className="block font-medium">Image (URL)</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    name="image"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
                Mettre à jour
            </button>
            <div className="mt-8">
                <a href="/news" className="text-blue-600 hover:underline">
                    ← Retour aux actualités
                </a>
            </div>
        </form>
    );
};

export default EditArticleForm;
