interface BuyData {
  date: Date;
  code: string;
}

export interface DataBuy extends BuyData {
  idUser: string;
}

export interface DataBuyRes extends BuyData {
  _id: string;
}
