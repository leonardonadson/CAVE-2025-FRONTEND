import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); 

    try {
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials);

      const response = await fetch(`${apiUrl}/auth/validate_auth`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (response.ok) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "/admin";
      } else {
        setError("Credenciais inválidas.");
      }
    } catch {
      setError("Erro ao conectar à API.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
  <form autoComplete="off"
        onSubmit={handleLogin}
        className="bg-black/40 p-6 rounded-xl w-80 border border-gray-700"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
        />

        {/* 3. Modificar o botão */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#F6648B] text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg shadow-[#f6648b]/20 hover:scale-105 transition-transform duration-300 disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? "Carregando..." : "Avançar"}
        </button>
      </form>
    </div>
  );
}