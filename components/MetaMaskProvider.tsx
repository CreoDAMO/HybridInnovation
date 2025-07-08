'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

interface MetaMaskContextType {
  sdk: MetaMaskSDK | null;
  account: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const MetaMaskContext = createContext<MetaMaskContextType>({
  sdk: null,
  account: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
});

export const useMetaMask = () => useContext(MetaMaskContext);

export function MetaMaskProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<MetaMaskSDK | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "HYBRID Blockchain",
        url: window.location.href,
      },
      infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || "",
    });

    setSdk(MMSDK);

    const checkConnection = async () => {
      try {
        if (MMSDK.isConnected()) {
          const accounts = await MMSDK.connect();
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    if (!sdk) return;
    
    try {
      const accounts = await sdk.connect();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Add HYBRID network to MetaMask
        await addHybridNetwork();
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.disconnect();
      setAccount(null);
      setIsConnected(false);
    }
  };

  const addHybridNetwork = async () => {
    if (!sdk || !sdk.getProvider()) return;

    try {
      await sdk.getProvider().request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x1337', // 4919 in hex
          chainName: 'HYBRID Blockchain',
          nativeCurrency: {
            name: 'HYBRID',
            symbol: 'HBD',
            decimals: 18,
          },
          rpcUrls: ['http://localhost:8545'],
          blockExplorerUrls: ['http://localhost:3000/explorer'],
        }],
      });
    } catch (error) {
      console.error('Failed to add HYBRID network:', error);
    }
  };

  return (
    <MetaMaskContext.Provider value={{ sdk, account, isConnected, connect, disconnect }}>
      {children}
    </MetaMaskContext.Provider>
  );
}
