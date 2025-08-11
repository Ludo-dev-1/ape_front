import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';


interface LoginFormProps {
    onLoginSuccess?: () => void; // Optionnel, callback après login réussi
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fonction de connexion issue du store d'authentification
    const loadFromStorage = useAuthStore((state) => state.loadFromStorage);

    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Exemple d'appel API vers backend pour login
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erreur lors de la connexion');
            }

            // Si succès
            if (onLoginSuccess) onLoginSuccess();
            // Sinon, tu peux rediriger ici ou gérer la suite
            window.location.href = "/"; // Redirection vers la page de connexion après l'inscription
            login(await response.text()); // Appel de la fonction de login du store avec le token reçu

        } catch (err: any) {
            setError(err.message || 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

            {error && (
                <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="exemple@domaine.com"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block mb-1 font-semibold">Mot de passe</label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Votre mot de passe"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 font-semibold rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    );
};

export default LoginForm;
function login(arg0: string) {
    throw new Error('Function not implemented.');
}

