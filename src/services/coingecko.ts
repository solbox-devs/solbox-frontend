import axios, { AxiosInstance } from 'axios';

// Create Axios instance
const coingeckoApi: AxiosInstance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
    'x-cg-demo-api-key': 'CG-gRjzwQoR6uQuBsPuBvXpwM1q', // Replace with your actual API key
  },
});

// Function to fetch cryptocurrency data
export const getCryptoCurrencies = async (): Promise<any[]> => {
  try {
    const response = await coingeckoApi.get<any[]>('/coins/markets', {
      params: {
        vs_currency: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    throw error;
  }
};

export const getNFTCollections = async (): Promise<any[]> => {
    try {
      const response = await coingeckoApi.get<any[]>('/nfts/list', {
        params: {
          order: 'market_cap_usd_desc',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching NFT collections data:', error);
      throw error;
    }
};