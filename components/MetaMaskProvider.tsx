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
        const provider = MMSDK.getProvider();
        if (provider) {
          const accounts = await provider.request({ method: 'eth_accounts' });
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
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

interface MetaMaskContextType {
  sdk: MetaMaskSDK | null;
  account: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  chainId: string | null;
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined);

interface MetaMaskProviderProps {
  children: ReactNode;
}

export function MetaMaskProvider({ children }: MetaMaskProviderProps) {
  const [sdk, setSdk] = useState<MetaMaskSDK | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState<string | null>(null);

  useEffect(() => {
    const initSDK = async () => {
      try {
        const MMSDK = new MetaMaskSDK({
          dappMetadata: {
            name: "HYBRID Blockchain",
            url: window.location.host,
          },
          preferDesktop: false,
          logging: {
            developerMode: false,
          },
        });

        setSdk(MMSDK);

        const provider = MMSDK.getProvider();
        if (provider) {
          // Check if already connected
          const accounts = await provider.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }

          // Get chain ID
          const currentChainId = await provider.request({ method: 'eth_chainId' });
          setChainId(currentChainId);

          // Set up event listeners
          provider.on('accountsChanged', (accounts: string[]) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              setIsConnected(true);
            } else {
              setAccount(null);
              setIsConnected(false);
            }
          });

          provider.on('chainChanged', (chainId: string) => {
            setChainId(chainId);
          });
        }
      } catch (error) {
        console.error('Failed to initialize MetaMask SDK:', error);
      }
    };

    initSDK();
  }, []);

  const connect = async () => {
    if (!sdk) return;
    
    setIsConnecting(true);
    try {
      const provider = sdk.getProvider();
      if (provider) {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
  };

  const value: MetaMaskContextType = {
    sdk,
    account,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    chainId,
  };

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}

export function useMetaMask() {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a MetaMaskProvider');
  }
  return context;
}
