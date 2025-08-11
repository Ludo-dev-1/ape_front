import { create } from "zustand";
import { jwtDecode } from "jwt-decode"; // attention à l'import par défaut, pas destructuré

interface DecodedToken {
    role_id: number;
    id: number;
}

interface IAuthState {
    token: string | null;
    isAdmin: boolean;
    isMember: boolean;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
    loadFromStorage: () => void;  // nouvelle fonction pour charger depuis localStorage
}

export const useAuthStore = create<IAuthState>((set) => ({
    token: null,
    isAdmin: false,
    isMember: false,
    userId: null,

    login: (token: string) => {
        localStorage.setItem("token", token);

        const decodedToken: DecodedToken = jwtDecode(token);
        const isAdmin = decodedToken.role_id === 1;
        const isParent = decodedToken.role_id === 2;
        const isMemberBureau = decodedToken.role_id === 3;
        const isMembre = decodedToken.role_id === 4;
        const userId = decodedToken.id;

        localStorage.setItem("isAdmin", String(isAdmin));
        localStorage.setItem("isMemberBureau", String(isMemberBureau));
        localStorage.setItem("isMembre", String(isMembre));
        localStorage.setItem("isMember", String(isParent || isMemberBureau || isMembre));
        localStorage.setItem("userId", String(userId));

        set({ token, isAdmin, isMember: isParent || isMemberBureau || isMembre, userId });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isMember");
        localStorage.removeItem("isMemberBureau");
        localStorage.removeItem("isParent");
        localStorage.removeItem("userId");

        set({ token: null, isAdmin: false, isMember: false, userId: null });
    },

    loadFromStorage: () => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const isAdmin = localStorage.getItem("isAdmin") === "true";
            const isMember = localStorage.getItem("isMember") === "true";
            const userIdStr = localStorage.getItem("userId");
            const userId = userIdStr ? Number(userIdStr) : null;

            set({ token, isAdmin, isMember, userId });
        }
    }
}));
