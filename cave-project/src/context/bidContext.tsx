import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import type { BidContextType, UserData } from "../types/bid.d.ts";

const INITIAL_HIGHEST_BID = 700;
const MINIMUM_INCREMENT = 100;
const TOTAL_STEPS = 4;
const INITIAL_USER_DATA: UserData = {
  name: "",
  cpf: "",
  phone: "",
};

const BidContext = createContext<BidContextType | undefined>(undefined);

export const useBid = (): BidContextType => {
  const context = useContext(BidContext);
  if (!context) {
    throw new Error("useBid must be used within a BidProvider");
  }
  return context;
};

export const BidProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highestBid, setHighestBid] = useState(INITIAL_HIGHEST_BID);
  const [bidValue, setBidValue] = useState(highestBid + MINIMUM_INCREMENT);
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allBids, setAllBids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const bids = await fetchAllBids();
        if (bids.length > 0) {
          const maxBid = Math.max(...bids.map((bid: any) => bid.amount));
          setHighestBid(maxBid);
          setBidValue(maxBid + MINIMUM_INCREMENT);
        }
      } catch (err) {
        console.error("Error fetching initial bids:", err);
        setError(
          err instanceof Error ? err.message : "Error fetching initial bids"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (currentStep === 0) {
      setBidValue(highestBid + MINIMUM_INCREMENT);
    }
  }, [highestBid, currentStep]);

  const fetchAllBids = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/bids/`);
      if (!response.ok) {
        throw new Error("Erro ao buscar lances");
      }
      const data = await response.json();
      setAllBids(data);
      return data;
    } catch (err) {
      console.error("Erro ao buscar lances:", err);
      setError(err instanceof Error ? err.message : "Erro ao buscar lances");
      return [];
    }
  };

  const submitBidToAPI = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/bids/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: bidValue,
          cpf: userData.cpf.replace(/\D/g, ""),
          phone: userData.phone.replace(/\D/g, ""),
          name: userData.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar lance");
      }

      const data = await response.json();
      console.log("Lance enviado com sucesso:", data);

      await fetchAllBids();
      setHighestBid(bidValue);
      setCurrentStep(currentStep + 1);
    } catch (err) {
      console.error("Erro ao enviar lance:", err);
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAllBids = async () => {
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (!username || !password) {
        throw new Error("Credenciais não encontradas.");
      }
      const encodedCredentials = btoa(`${username}:${password}`);

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/bids/`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao limpar lances");
      }

      console.log("Todos os lances foram removidos");
      setAllBids([]);
      setHighestBid(INITIAL_HIGHEST_BID);
      setBidValue(INITIAL_HIGHEST_BID + MINIMUM_INCREMENT);
    } catch (err) {
      console.error("Erro ao limpar lances:", err);
      setError(err instanceof Error ? err.message : "Erro ao limpar lances");
    }
  };

  const generateReport = async (format: "csv" | "excel") => {
    try {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (!username || !password) {
        throw new Error("Credenciais não encontradas.");
      }
      const encodedCredentials = btoa(`${username}:${password}`);

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/reports/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify({ format }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar relatório");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio_lances.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
      setError(err instanceof Error ? err.message : "Erro ao gerar relatório");
    }
  };

  const confirmAndPlaceBid = async () => {
    await submitBidToAPI();
  };

  const resetForm = () => {
    setUserData(INITIAL_USER_DATA);
    setCurrentStep(0);
  };

  const value: BidContextType = {
    bidValue,
    setBidValue,
    userData,
    setUserData,
    highestBid,
    confirmAndPlaceBid,
    resetForm,
    currentStep,
    setCurrentStep,
    totalSteps: TOTAL_STEPS,
    isSubmitting,
    error,
    allBids,
    fetchAllBids,
    clearAllBids,
    generateReport,
    isLoading,
  };

  return <BidContext.Provider value={value}>{children}</BidContext.Provider>;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};