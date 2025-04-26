// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract JagedoEscrow is Ownable {
    enum EscrowStatus { PENDING, COMPLETED, REFUNDED }
    
    struct Escrow {
        address client;
        address worker;
        uint256 amount;
        EscrowStatus status;
    }

    mapping(bytes32 => Escrow) public escrows;
    
    event EscrowCreated(bytes32 jobId, address client, address worker, uint256 amount);
    event EscrowReleased(bytes32 jobId);
    event EscrowRefunded(bytes32 jobId);

    constructor() Ownable(msg.sender) {}

    function createEscrow(
        bytes32 jobId, 
        address worker
    ) external payable {
        require(msg.value > 0, "Invalid amount");
        require(escrows[jobId].amount == 0, "Escrow exists");
        
        escrows[jobId] = Escrow({
            client: msg.sender,
            worker: worker,
            amount: msg.value,
            status: EscrowStatus.PENDING
        });
        
        emit EscrowCreated(jobId, msg.sender, worker, msg.value);
    }

    function releaseEscrow(bytes32 jobId) external onlyOwner {
        Escrow storage escrow = escrows[jobId];
        require(escrow.status == EscrowStatus.PENDING, "Invalid status");
        
        escrow.status = EscrowStatus.COMPLETED;
        payable(escrow.worker).transfer(escrow.amount);
        
        emit EscrowReleased(jobId);
    }

    function refundEscrow(bytes32 jobId) external onlyOwner {
        Escrow storage escrow = escrows[jobId];
        require(escrow.status == EscrowStatus.PENDING, "Invalid status");
        
        escrow.status = EscrowStatus.REFUNDED;
        payable(escrow.client).transfer(escrow.amount);
        
        emit EscrowRefunded(jobId);
    }
}