export interface Coincap {
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
}

export interface CryptoHistoryData {
  priceUsd: string;
  time: number;
}
