# Bank DApp

This is a simple **Bank DApp** built with Solidity, Hardhat, and a React + Tailwind frontend.  
Users can **deposit**, **withdraw**, and **check balances** on the blockchain.

---

## Features
- Deposit ETH into the bank contract
- Withdraw ETH from the bank
- Check your account balance
- React frontend with TailwindCSS
- Hardhat backend with deployment scripts

---

## Smart Contract

The main contract is `Bank.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Bank {
    mapping(address => uint256) private balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function deposit() public payable {
        require(msg.value > 0, "Must send ETH to deposit");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bank-dapp.git
cd bank-dapp
```

### 2. Install dependencies

#### Backend
```bash
cd hardhat
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Compile & Deploy Contract

Inside the `hardhat` folder:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network core
```

Make sure you set your Core DAO RPC URL and private key in `.env`.

---

## Frontend (React + Tailwind)

The frontend is built with **Vite + React + TailwindCSS**.  
It allows users to connect MetaMask and interact with the bank contract.

Start the frontend:

```bash
cd frontend
npm run dev
```

---

## Example Environment File

Create `.env` inside `hardhat`:

```
CORE_RPC_URL=https://rpc.test.btcs.network
PRIVATE_KEY=your-private-key
```

---

## Deployment Info

- Contract: `Bank.sol`
✅ Bank contract deployed at: 0x7e7EdCf617B79893043e92Cd47EAFb37686046dE


---

## License

MIT License
