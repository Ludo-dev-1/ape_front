
import React from "react";

export default function Header() {
    const user = {
        role: "membre_bureau",
    };
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">

                {/* Logo */}
                <a href="/" className="text-xl font-bold text-blue-600">
                    <img src="../assets/apeLogo.jpg" alt="Logo Association" className="w-12 h-12" />
                </a>

                {/* Bouton Burger */}
                <input type="checkbox" id="menu-toggle" className="peer hidden" />
                <label
                    htmlFor="menu-toggle"
                    className="cursor-pointer md:hidden text-2xl"
                >
                    ☰
                </label>

                {/* Menu Desktop */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium">
                    <a href="/" className="hover:text-blue-600">
                        Accueil
                    </a>
                    <a href="/news" className="hover:text-blue-600">
                        Actualités
                    </a>
                    <a href="/events" className="hover:text-blue-600">
                        Événements
                    </a>
                    <a href="/contact" className="hover:text-blue-600">
                        Contact
                    </a>
                    {!user?.role && (
                        <>
                            <a href="/register" className="hover:text-blue-600">
                                Inscription
                            </a>
                            <a href="/login" className="hover:text-blue-600">
                                Connexion
                            </a>
                        </>
                    )}
                </nav>
            </div>

            {/* Menu Mobile */}
            <div className="peer-checked:block hidden md:hidden px-4 pb-4">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                    <li>
                        <a href="/" className="block hover:text-blue-600">
                            Accueil
                        </a>
                    </li>
                    <li>
                        <a href="/news" className="block hover:text-blue-600">
                            Actualités
                        </a>
                    </li>
                    <li>
                        <a href="/events" className="block hover:text-blue-600">
                            Événements
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className="block hover:text-blue-600">
                            Contact
                        </a>
                    </li>
                    {!user?.role && (
                        <>
                            <li>
                                <a href="/register" className="block hover:text-blue-600">
                                    Inscription
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="block hover:text-blue-600">
                                    Connexion
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}
