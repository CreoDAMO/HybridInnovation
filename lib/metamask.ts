import { useContext } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

// Re-export the MetaMask context hook
export { useMetaMask } from '@/components/MetaMaskProvider';

export interface MetaMaskError {
  code: number;
  message: string;
}

export const addHybridNetwork = async (sdk: MetaMaskSDK): Promise<boolean> => {
  try {
    const provider = sdk.getProvider();
    if (!provider) return false;

    await provider.request({
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

    return true;
  } catch (error) {
    console.error('Failed to add HYBRID network:', error);
    return false;
  }
};

export const switchToHybridNetwork = async (sdk: MetaMaskSDK): Promise<boolean> => {
  try {
    const provider = sdk.getProvider();
    if (!provider) return false;

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1337' }],
    });

    return true;
  } catch (error) {
    console.error('Failed to switch to HYBRID network:', error);
    return false;
  }
};

export const getBalance = async (sdk: MetaMaskSDK, address: string): Promise<string | null> => {
  try {
    const provider = sdk.getProvider();
    if (!provider) return null;

    const balance = await provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    // Convert from wei to ether
    const balanceInEther = parseInt(balance as string, 16) / Math.pow(10, 18);
    return balanceInEther.toString();
  } catch (error) {
    console.error('Failed to get balance:', error);
    return null;
  }
};

export const sendTransaction = async (
  sdk: MetaMaskSDK,
  transaction: {
    from: string;
    to: string;
    value: string;
    gas?: string;
    gasPrice?: string;
  }
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  try {
    const provider = sdk.getProvider();
    if (!provider) return { success: false, error: 'Provider not available' };

    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [transaction],
    });

    return { success: true, txHash: txHash as string };
  } catch (error) {
    console.error('Failed to send transaction:', error);
    return { success: false, error: (error as MetaMaskError).message };
  }
};

export const signMessage = async (sdk: MetaMaskSDK, message: string, address: string): Promise<string | null> => {
  try {
    const provider = sdk.getProvider();
    if (!provider) return null;

    const signature = await provider.request({
      method: 'personal_sign',
      params: [message, address],
    });

    return signature as string;
  } catch (error) {
    console.error('Failed to sign message:', error);
    return null;
  }
};
