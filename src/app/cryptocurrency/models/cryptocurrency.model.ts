export interface Coin {
  id: string;
  rank: string
  symbol: string;
  name: string;
  supply: Float32Array;
  maxSupply: Float32Array;
  marketCapUsd: Float32Array;
  volumeUsd24Hr: Float32Array;
  priceUsd: Float32Array;
  changePercent24Hr: Float32Array;
  vwap24Hr: Float32Array;
  //coinHistory?: CoinHistoryData[];
}

export interface CoinHistoryData {
  coinId?: string;
  priceUsd: string;
  time: number;
}


