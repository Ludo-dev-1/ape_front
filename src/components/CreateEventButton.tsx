// CreateArticleButton.tsx
import CreateEventModal from "./CreateEventModal.tsx";

export default function CreateEventButton() {
    const role = typeof window !== "undefined" ? localStorage.getItem("role_id") : null;

    if (role !== "2") return null; // affichage conditionnel

    return (
        <CreateEventModal onEventCreated={() => window.dispatchEvent(new Event("event-created"))} />
    );
}
