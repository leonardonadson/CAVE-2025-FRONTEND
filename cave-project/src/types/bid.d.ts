// src/types/bid.d.ts

export interface UserData {
  name: string;
  cpf: string;
  phone: string;
}

export interface BidContextType {
  bidValue: number;
  setBidValue: (value: number) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
  highestBid: number; // Renomeado de 'lastBid'
  confirmAndPlaceBid: () => void; // Nova função para confirmar o lance
  resetForm: () => void; // Renomeado de 'resetState'
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}
