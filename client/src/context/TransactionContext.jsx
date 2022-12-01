import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => { //1
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;


};

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({ addressTo: '0x04aE81843F7b29A917a2a9cf2E7211225Ca4F180', amount: '0.01', uaid: 1, fullname: "", fathername: "", Cno: 12, Age: 18, gender: "", houseaddrs: " ", distance: 0, doO: 10, toO: 10, offence: " ", section: " ", particulars: " ", witness: " ", complaint: " " });
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    console.log(currentAccount);
    console.table(formData);
    console.log(transactions);

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = getEthereumContract();

                const availableTransactions1 = await transactionsContract.getAllTransactions1();
                const availableTransactions2 = await transactionsContract.getAllTransactions2();
                const availableTransactions3 = await transactionsContract.getAllTransactions3();

                const structuredTransactions1 = availableTransactions1.map((transaction) => ({

                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
                const structuredTransactions2 = availableTransactions2.map((transaction) => ({

                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
                const structuredTransactions3 = availableTransaction3s.map((transaction) => ({

                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));


                console.log(structuredTransactions1);
                console.log(structuredTransactions2);
                console.log(structuredTransactions3);

                setTransactions((prev)=> [...prev, structuredTransactions1]);
                setTransactions((prev)=> [...prev, structuredTransactions2]);
                setTransactions((prev)=> [...prev, structuredTransactions3]);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {

        try {

            if (!ethereum) return alert("please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log('No Accounts Found');
            }

        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object")
        }

    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("please install metamask");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object")
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("please install metamask");

            const { addressTo, amount, uaid, fullname, fathername, Cno, Age, gender, houseaddrs, distance, doO, toO, offence, section, particulars, witness, complaint } = formData;
            const transactionContract = getEthereumContract();
            console.log(transactionContract);
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex, //0.00001
                }]
            });

            const transactionHash1 = transactionContract.addToBlockchain1(addressTo, parsedAmount, uaid, fullname, fathername, Cno, Age, gender, houseaddrs);
            const transactionHash2 = transactionContract.addToBlockchain2(addressTo, parsedAmount, distance, doO, toO);
            const transactionHash3 = transactionContract.addToBlockchain3(addressTo, parsedAmount, offence, section, particulars, witness, complaint);


            await getAllTransactions()
            console.log(`Loading - ${transactionHash1.hash}, ${transactionHash2.hash}, ${transactionHash3.hash}`);
            await transactionHash1.wait();
            await transactionHash2.wait();
            await transactionHash3.wait();

            console.log(`Success - ${transactionHash1.hash} ,${transactionHash2.hash}, ${transactionHash3.hash}`);
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};
