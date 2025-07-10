
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export interface BlockchainState {
  connected: boolean;
  address: string | null;
  balance: string;
  chainId: number | null;
  isCorrectNetwork: boolean;
}

export const useBlockchain = () => {
  const [state, setState] = useState<BlockchainState>({
    connected: false,
    address: null,
    balance: '0',
    chainId: null,
    isCorrectNetwork: false
  });

  const HYBRID_CHAIN_ID = 1; // Replace with actual HYBRID chain ID

  const connect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('No Ethereum provider found');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setState({
        connected: true,
        address,
        balance: ethers.utils.formatEther(balance),
        chainId: network.chainId,
        isCorrectNetwork: network.chainId === HYBRID_CHAIN_ID
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setState({
      connected: false,
      address: null,
      balance: '0',
      chainId: null,
      isCorrectNetwork: false
    });
  };

  const switchToHybridNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${HYBRID_CHAIN_ID.toString(16)}` }],
      });
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          connect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connect();
          }
        });
    }
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    switchToHybridNetwork
  };
};
