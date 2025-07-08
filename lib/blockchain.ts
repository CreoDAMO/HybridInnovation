import { formatAddress } from './utils';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  gasUsed: string;
  gasPrice: string;
  blockNumber: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface Block {
  number: number;
  hash: string;
  parentHash: string;
  timestamp: Date;
  miner: string;
  gasLimit: string;
  gasUsed: string;
  transactionCount: number;
  transactions: Transaction[];
}

export class BlockchainClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/blockchain') {
    this.baseUrl = baseUrl;
  }

  async getLatestBlock(): Promise<Block | null> {
    try {
      const response = await fetch(`${this.baseUrl}/blocks/latest`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch latest block:', error);
      return null;
    }
  }

  async getBlock(blockNumber: number): Promise<Block | null> {
    try {
      const response = await fetch(`${this.baseUrl}/blocks/${blockNumber}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch block:', error);
      return null;
    }
  }

  async getTransaction(txHash: string): Promise<Transaction | null> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions/${txHash}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch transaction:', error);
      return null;
    }
  }

  async sendTransaction(transaction: {
    from: string;
    to: string;
    amount: string;
    gasLimit: string;
    gasPrice: string;
  }): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to send transaction:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async getNetworkStats(): Promise<{
    hashRate: string;
    difficulty: string;
    gasPrice: string;
    activeValidators: number;
    totalSupply: string;
  } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/network/stats`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch network stats:', error);
      return null;
    }
  }

  async searchBlockchain(query: string): Promise<{
    type: 'block' | 'transaction' | 'address';
    data: any;
  } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to search blockchain:', error);
      return null;
    }
  }
}

export const blockchainClient = new BlockchainClient();
