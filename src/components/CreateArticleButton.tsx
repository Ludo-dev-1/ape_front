// CreateArticleButton.tsx
import CreateArticleModal from "./CreateArticleModal.tsx";

export default function CreateArticleButton() {
    const role = typeof window !== "undefined" ? localStorage.getItem("role_id") : null;

    if (role !== "2") return null; // affichage conditionnel

    return (
        <CreateArticleModal onArticleCreated={() => window.dispatchEvent(new Event("article-created"))} />
    );
}
