import { createContext, useState, useContext, type ReactNode } from "react";
import type { Bid, Auction, BidContextType } from "../types/bid";

const BidContext = createContext<BidContextType | undefined>(undefined);

export const BidProvider = ({ children }: { children: ReactNode }) => {
  const [currentAuction, setCurrentAuction] = useState<Auction | null>(null);

  const [bids, setBids] = useState<Bid[]>([]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const loadAuction = async (id: string) => {
    const mockAuction: Auction = {
      id,
      name: "Example Auction",
      initialValue: 1000,
      image: "/path/to/image.jpg",
      description: "Detailed auction description",
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
      bids: [],
    };
    setCurrentAuction(mockAuction);
  };

  const addBid = (value: number) => {
    if (!currentAuction) return;

    setCurrentAuction({
      ...currentAuction,
      initialValue: value,
    });
  };

  const confirmBid = async (): Promise<boolean> => {
    if (!currentAuction) return false;

    try {
      const newBid: Bid = {
        id: Date.now().toString(),
        value: currentAuction.initialValue,
        user: userData.name,
        email: userData.email,
        phone: userData.phone,
        date: new Date(),
        auctionId: currentAuction.id,
      };

      setBids([...bids, newBid]);

      return true;
    } catch (error) {
      console.error("Error confirming bid:", error);
      return false;
    }
  };

  const value: BidContextType = {
    currentAuction,
    setCurrentAuction,
    bids,
    setBids,
    userData,
    setUserData,
    addBid,
    loadAuction,
    confirmBid,
  };

  return <BidContext.Provider value={value}>{children}</BidContext.Provider>;
};

export const useBid = (): BidContextType => {
  const context = useContext(BidContext);
  if (context === undefined) {
    throw new Error("useBid must be used within a BidProvider");
  }
  return context;
};
