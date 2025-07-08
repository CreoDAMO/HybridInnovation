'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMetaMask } from '@/lib/metamask';
import { Blocks, Send, Search, Activity, TrendingUp } from 'lucide-react';

export function BlockchainInterface() {
  const { account, isConnected } = useMetaMask();
  const [blockchainData, setBlockchainData] = useState({
    latestBlock: 0,
    transactions: [],
    networkStats: {
      hashRate: '0 TH/s',
      difficulty: '0x0',
      gasPrice: '0 gwei',
      activeValidators: 0,
      totalSupply: '0 HBD'
    }
  });

  const [transactionForm, setTransactionForm] = useState({
    to: '',
    amount: '',
    gasLimit: '21000',
    gasPrice: '20'
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlockchainData();
    const interval = setInterval(fetchBlockchainData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchBlockchainData = async () => {
    try {
      const response = await fetch('/api/blockchain/status');
      const data = await response.json();
      setBlockchainData(data);
    } catch (error) {
      console.error('Failed to fetch blockchain data:', error);
    }
  };

  const handleSendTransaction = async () => {
    if (!isConnected) {
      alert('Please connect your MetaMask wallet first');
      return;
    }

    try {
      // This would integrate with the actual blockchain transaction system
      const response = await fetch('/api/blockchain/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: account,
          ...transactionForm
        })
      });

      const result = await response.json();
      if (result.success) {
        alert('Transaction submitted successfully!');
        setTransactionForm({ to: '', amount: '', gasLimit: '21000', gasPrice: '20' });
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`/api/blockchain/search?query=${searchQuery}`);
      const result = await response.json();
      // Handle search results
      console.log('Search results:', result);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Latest Block</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{blockchainData.latestBlock.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-400">
              <Blocks className="w-4 h-4 mr-1" />
              Confirmed
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Network Hash Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{blockchainData.networkStats.hashRate}</div>
            <div className="flex items-center text-sm text-blue-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              Stable
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Active Validators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{blockchainData.networkStats.activeValidators}</div>
            <div className="flex items-center text-sm text-purple-400">
              <Activity className="w-4 h-4 mr-1" />
              Online
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Gas Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{blockchainData.networkStats.gasPrice}</div>
            <div className="flex items-center text-sm text-yellow-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              Optimal
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Interface */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Transaction
            </CardTitle>
            <CardDescription className="text-gray-400">
              Send HYBRID tokens to another address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400">To Address</label>
              <Input 
                placeholder="0x..." 
                value={transactionForm.to}
                onChange={(e) => setTransactionForm({...transactionForm, to: e.target.value})}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Amount (HBD)</label>
              <Input 
                type="number" 
                placeholder="0.0" 
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({...transactionForm, amount: e.target.value})}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Gas Limit</label>
                <Input 
                  value={transactionForm.gasLimit}
                  onChange={(e) => setTransactionForm({...transactionForm, gasLimit: e.target.value})}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-400">Gas Price (gwei)</label>
                <Input 
                  value={transactionForm.gasPrice}
                  onChange={(e) => setTransactionForm({...transactionForm, gasPrice: e.target.value})}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
            </div>
            <Button 
              onClick={handleSendTransaction}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!isConnected || !transactionForm.to || !transactionForm.amount}
            >
              {isConnected ? 'Send Transaction' : 'Connect Wallet First'}
            </Button>
          </CardContent>
        </Card>

        {/* Search Interface */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="w-5 h-5" />
              Blockchain Explorer
            </CardTitle>
            <CardDescription className="text-gray-400">
              Search for transactions, blocks, or addresses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter transaction hash, block number, or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Quick Actions</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Latest Block</Button>
                <Button variant="outline" size="sm">Pending Txs</Button>
                <Button variant="outline" size="sm">Network Stats</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
          <CardDescription className="text-gray-400">
            Latest transactions on the HYBRID blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {blockchainData.transactions.length > 0 ? (
              blockchainData.transactions.map((tx: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-8)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {tx.from?.slice(0, 6)}...{tx.from?.slice(-4)} → {tx.to?.slice(0, 6)}...{tx.to?.slice(-4)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{tx.amount} HBD</div>
                    <Badge variant="outline" className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No recent transactions found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
