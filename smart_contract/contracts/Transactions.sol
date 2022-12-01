// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transactions {
    event Transfer1(
        address sender,
        address receiver,
        uint256 amount,
        uint256 uaid,
        string fullname,
        string fathername,
        uint256 Cno,
        uint256 Age,
        string gender,
        string houseaddrs
    );
    event Transfer2(
        address sender,
        address receiver,
        uint256 amount,
        uint256 distance,
        uint256 doO,
        uint256 toO
    );
    event Transfer3(
        address sender,
        address receiver,
        uint256 amount,
        string offence,
        string section,
        string particulars,
        string witness,
        string complaint
    );

    struct TransferStruct1 {
        address sender;
        address receiver;
        uint256 amount;
        uint256 uaid;
        string fullname;
        string fathername;
        uint256 Cno;
        uint256 Age;
        string gender;
        string houseaddrs;
    }

    struct TransferStruct2 {
        address sender;
        address receiver;
        uint256 amount;
        uint256 distance;
        uint256 doO;
        uint256 toO;
    }

    struct TransferStruct3 {
        address sender;
        address receiver;
        uint256 amount;
        string offence;
        string section;
        string particulars;
        string witness;
        string complaint;
    }

    TransferStruct1[] transactions1;
    TransferStruct2[] transactions2;
    TransferStruct3[] transactions3;

    function addToBlockchain1(
        address payable receiver,
        uint256 amount,
        uint256 uaid,
        string memory fullname,
        string memory fathername,
        uint256 Cno,
        uint256 Age,
        string memory gender,
        string memory houseaddrs
    ) public {
        transactions1.push(
            TransferStruct1(
                msg.sender,
                receiver,
                amount,
                uaid,
                fullname,
                fathername,
                Cno,
                Age,
                gender,
                houseaddrs
            )
        );

        emit Transfer1(
            msg.sender,
            receiver,
            amount,
            uaid,
            fullname,
            fathername,
            Cno,
            Age,
            gender,
            houseaddrs
        );
    }

    function addToBlockchain2(
        address payable receiver,
        uint256 amount,
        uint256 distance,
        uint256 doO,
        uint256 toO
    ) public {
        transactions2.push(
            TransferStruct2(msg.sender, receiver, amount, distance, doO, toO)
        );

        emit Transfer2(msg.sender, receiver, amount, distance, doO, toO);
    }

    function addToBlockchain3(
        address payable receiver,
        uint256 amount,
        string memory offence,
        string memory section,
        string memory particulars,
        string memory witness,
        string memory complaint
    ) public {
        transactions3.push(
            TransferStruct3(
                msg.sender,
                receiver,
                amount,
                offence,
                section,
                particulars,
                witness,
                complaint
            )
        );

        emit Transfer3(
            msg.sender,
            receiver,
            amount,
            offence,
            section,
            particulars,
            witness,
            complaint
        );
    }

    function getAllTransactions1() public view returns (TransferStruct1[] memory) {
         return transactions1;
    }
    function getAllTransactions2() public view returns (TransferStruct2[] memory) {
         return transactions2;
    }
    function getAllTransactions3() public view returns (TransferStruct3[] memory) {
         return transactions3;
    }
}