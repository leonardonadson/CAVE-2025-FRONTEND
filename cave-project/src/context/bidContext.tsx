import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";
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

  useEffect(() => {
    if (currentStep === 0) {
      setBidValue(highestBid + MINIMUM_INCREMENT);
    }
  }, [highestBid, currentStep]);

  const confirmAndPlaceBid = () => {
    setHighestBid(bidValue);
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
  };

  return <BidContext.Provider value={value}>{children}</BidContext.Provider>;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
