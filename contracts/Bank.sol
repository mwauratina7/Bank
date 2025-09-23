// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Bank {
    mapping(address => uint256) public balances;

    event Deposited(address indexed who, uint256 amount);
    event Withdrawn(address indexed who, uint256 amount);

    // Deposit ETH to the contract
    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw specified amount
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Convenience: withdraw all
    function withdrawAll() external {
        uint256 bal = balances[msg.sender];
        require(bal > 0, "Zero balance");
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(bal);
        emit Withdrawn(msg.sender, bal);
    }

    // Get contract balance (total funds held)
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
