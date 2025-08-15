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
  highestBid: number;
  confirmAndPlaceBid: () => Promise<void>;
  resetForm: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  isSubmitting?: boolean;
  error?: string | null;
  allBids?: any[];
  isLoading?: boolean;
  fetchAllBids?: () => Promise<any[]>;
  clearAllBids?: () => Promise<void>;
  generateReport?: (format: "csv" | "excel") => Promise<void>;
  bidsVersion?: number;
}