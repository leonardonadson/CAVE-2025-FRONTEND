interface Bid {
  id: string;
  value: number;
  user: string;
  email: string;
  phone: string;
  date: Date;
  auctionId: string;
}

interface Auction {
  id: string;
  name: string;
  initialValue: number;
  image: string;
  description: string;
  endDate: Date;
  bids: Bid[];
}

type BidContextType = {
  currentAuction: Auction | null;
  setCurrentAuction: (auction: Auction | null) => void;

  bids: Bid[];
  setBids: (bids: Bid[]) => void;

  userData: {
    name: string;
    email: string;
    phone: string;
  };
  setUserData: (data: { name: string; email: string; phone: string }) => void;

  addBid: (value: number) => void;
  loadAuction: (id: string) => Promise<void>;
  confirmBid: () => Promise<boolean>;
};

export type { Bid, Auction, BidContextType };
