import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      setIsAuthenticated(false);
      return;
    }

    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    fetch(`${apiUrl}/reports/`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    })
      .then((res) => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
}
