import React, { useState } from 'react';
import { Wallet, Send, Copy, Check } from 'lucide-react';
import myImage from './mw3rise.png';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #f0f4ff, #e0e7ff);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    max-width: 420px;
    width: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  .icon-box {
    background: #4f46e5;
    padding: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-box svg {
    width: 24px;
    height: 24px;
    color: white;
  }

  .header h1 {
    margin-left: 12px;
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
  }

  .section {
    margin-bottom: 24px;
  }

  .section:last-child {
    margin-bottom: 0;
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }

  .button {
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-primary {
    background-color: #4f46e5;
    color: white;
  }

  .button-primary:hover:not(:disabled) {
    background-color: #4338ca;
  }

  .button-primary:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .button svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .account-box {
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 8px;
    padding: 12px;
  }

  .account-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
  }

  .account-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .account-address {
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    color: #1f2937;
  }

  .copy-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #16a34a;
    padding: 4px;
    display: flex;
    align-items: center;
  }

  .copy-btn:hover {
    color: #15803d;
  }

  .copy-btn svg {
    width: 16px;
    height: 16px;
  }

  .select, .input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  .select:focus, .input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  .button-group {
    display: flex;
    gap: 8px;
  }

  .token-btn {
    flex: 1;
    padding: 10px 12px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .token-btn.active {
    background-color: #4f46e5;
    color: white;
  }

  .token-btn.inactive {
    background-color: #e5e7eb;
    color: #374151;
  }

  .token-btn.inactive:hover {
    background-color: #d1d5db;
  }

  .error-box {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .success-box {
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .success-title {
    font-size: 14px;
    font-weight: 600;
    color: #16a34a;
    margin-bottom: 8px;
  }

  .success-link {
    font-size: 12px;
    color: #16a34a;
    text-decoration: none;
    word-break: break-all;
  }

  .success-link:hover {
    color: #15803d;
    text-decoration: underline;
  }

  .footer {
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }
`;

const MultiChainSender = () => {
  const [account, setAccount] = useState('');
  const [chain, setChain] = useState('ethereum-sepolia');
  const [token, setToken] = useState('USDC');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const chains = {
    'ethereum-sepolia': {
      name: 'Ethereum Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      chainId: 11155111,
      type: 'evm',
      explorer: 'https://sepolia.etherscan.io'
    },
    'base-sepolia': {
      name: 'Base Sepolia',
      rpcUrl: 'https://sepolia.base.org',
      chainId: 84532,
      type: 'evm',
      explorer: 'https://sepolia.basescan.org'
    },
    'avalanche-fuji': {
      name: 'Avalanche Fuji',
      rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      type: 'evm',
      explorer: 'https://testnet.snowtrace.io'
    },
    'arc-testnet': {
      name: 'Arc Testnet',
      rpcUrl: 'https://testnet.arcinfra.xyz/rpc',
      chainId: 2192,
      type: 'evm',
      explorer: 'https://testnet.arcscan.io'
    },
    'solana-devnet': {
      name: 'Solana Devnet',
      rpcUrl: 'https://api.devnet.solana.com',
      type: 'solana',
      explorer: 'https://explorer.solana.com'
    },
    'stellar-testnet': {
      name: 'Stellar Testnet',
      rpcUrl: 'https://horizon-testnet.stellar.org',
      type: 'stellar',
      explorer: 'https://stellar.expert/explorer/testnet'
    }
  };

  const tokenAddresses = {
    'ethereum-sepolia': {
      USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      EURC: '0x08210F9170F89ab7658f0B5694CA3A0C0ff9c7FD',
      USDY: '0xB559f2f3a86289ccde145b08f6b50c711169ef3C7'
    },
    'base-sepolia': {
      USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      EURC: '0x6B635C3a0E3D9C221433cEd8B76109b637335859',
      USDY: '0x4e65FE4DbA92f6b9cb9bFD8d6b60ec41a00108379D'
    },
    'avalanche-fuji': {
      USDC: '0x5425890298aed601595a70AB815c96711a756ADe',
      EURC: '0xa7D1435604C7086A55b0e5B1AF63242482bDa53F',
      USDY: '0x260Bbf5994Bd8215F7a3C4E1b4453b76716d6d4e'
    },
    'arc-testnet': {
      USDC: '0x4425D26d55Cc6f8C3872f9F88E4b6e9CcbF91196',
      EURC: '0x7d6e1B5A1E3f9e4a6b0d6e1F1f2e3d4c5a6b7c8d',
      USDY: '0x3e622317f8B1effBfeEd11dAE6a3aCd5d40D3d87'
    }
  };

  const connectWallet = async () => {
    try {
      setError('');
      if (chains[chain].type === 'evm') {
        if (!window.ethereum) {
          throw new Error('MetaMask not installed');
        }
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        await switchNetwork();
      } else {
        setError(`${chains[chain].name} wallet connection coming soon`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const switchNetwork = async () => {
    if (chains[chain].type !== 'evm') return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chains[chain].chainId.toString(16) }]
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x' + chains[chain].chainId.toString(16),
            chainName: chains[chain].name,
            rpcUrls: [chains[chain].rpcUrl],
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
          }]
        });
      }
    }
  };

  const sendTokens = async () => {
    try {
      setError('');
      setLoading(true);
      if (!account) throw new Error('Connect wallet first');
      if (!recipient) throw new Error('Enter recipient address');
      if (!amount || parseFloat(amount) <= 0) throw new Error('Enter valid amount');

      if (chains[chain].type === 'evm') {
        const tokenAddr = tokenAddresses[chain]?.[token];
        if (!tokenAddr) throw new Error(`${token} not available on this chain`);

        const tx = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: account,
            to: tokenAddr,
            data: encodeTransfer(recipient, amount)
          }]
        });
        setTxHash(tx);
        setTimeout(() => setTxHash(''), 5000);
      } else {
        throw new Error(`Transactions on ${chains[chain].name} coming soon`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const encodeTransfer = (to, amount) => {
    const selector = '0xa9059cbb';
    const address = to.replace('0x', '').padStart(64, '0');
    // eslint-disable-next-line no-undef
    const value = (BigInt(amount) * BigInt(10 ** 6)).toString(16).padStart(64, '0');
    return selector + address + value;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="card">
          <div className="header">
            <div className="icon-box">
              <Send />
            </div>
   <img src={myImage} alt="Mw3" height="200" />
            <h1>Multi-Chain Sender</h1>
          </div>

          <div className="section">
            {account ? (
              <div className="account-box">
                <div className="account-label">Connected Account</div>
                <div className="account-content">
                  <span className="account-address">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard(account)}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            ) : (
              <button className="button button-primary" onClick={connectWallet}>
                <Wallet size={20} />
                Connect Wallet
              </button>
            )}
          </div>

          <div className="section">
            <label className="label">Select Chain</label>
            <select
              className="select"
              value={chain}
              onChange={(e) => {
                setChain(e.target.value);
                setAccount('');
              }}
            >
              {Object.entries(chains).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
          </div>

          {chains[chain].type === 'evm' && (
            <div className="section">
              <label className="label">Select Token</label>
              <div className="button-group">
                {['USDC', 'EURC', 'USDY'].map(t => (
                  <button
                    key={t}
                    className={`token-btn ${token === t ? 'active' : 'inactive'}`}
                    onClick={() => setToken(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="section">
            <label className="label">Recipient Address</label>
            <input
              type="text"
              className="input"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div className="section">
            <label className="label">Amount ({token})</label>
            <input
              type="number"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div className="section">
            <button
              className="button button-primary"
              onClick={sendTokens}
              disabled={loading || !account}
            >
              <Send size={20} />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {txHash && (
            <div className="success-box">
              <div className="success-title">✓ Transaction Sent!</div>
              <a
                href={`${chains[chain].explorer}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="success-link"
              >
                {txHash}
              </a>
            </div>
          )}

          <div className="footer">
            Testing on {chains[chain].name}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiChainSender;
