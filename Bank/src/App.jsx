// src/App.jsx
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import BankABI from "./Bank.json";


// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x7e7EdCf617B79893043e92Cd47EAFb37686046dE";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [contract, setContract] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const signer = await provider.getSigner();
      const bank = new ethers.Contract(CONTRACT_ADDRESS, BankABI.abi, signer);
      setContract(bank);
    } else {
      alert("MetaMask not detected!");
    }
  };

  // Get user balance
  const getBalance = async () => {
    if (contract && account) {
      const bal = await contract.balances(account);
      setBalance(ethers.formatEther(bal));
    }
  };

  // Deposit ETH
  const deposit = async () => {
    if (!depositAmount || isNaN(depositAmount)) return;

    const tx = await contract.deposit({
      value: ethers.parseEther(depositAmount),
    });
    await tx.wait();
    setDepositAmount("");
    getBalance();
  };

  // Withdraw all ETH
  const withdrawAll = async () => {
    const tx = await contract.withdrawAll();
    await tx.wait();
    getBalance();
  };

  // Auto-refresh balance when contract loads
  useEffect(() => {
    if (contract && account) {
      getBalance();
    }
  }, [contract, account]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">🏦 Bank DApp</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p>
            Connected: <span className="font-mono">{account}</span>
          </p>
          <p className="text-lg">
            Balance in Bank: <strong>{balance} ETH</strong>
          </p>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Amount in ETH"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
            <button
              onClick={deposit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Deposit
            </button>
          </div>

          <button
            onClick={withdrawAll}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Withdraw All
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

