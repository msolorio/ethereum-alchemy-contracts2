require('dotenv').config();
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const {
  ALCHEMY_API_URL,
  PRIVATE_KEY,
  PUBLIC_KEY
} = process.env;
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');
const contractAddress = '0x7bb1251887ACE178374B3f23ee069c9F7579db8A';
const web3 = createAlchemyWeb3(ALCHEMY_API_URL);

// Creates an instance of the alchemy web3 contract interface
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);


async function updateMessage(newMessage) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
  const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas();

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: gasEstimate,
    maxFeePerGas: 1000000108, // set to the base fee for the pending block
    data: helloWorldContract.methods.update(newMessage).encodeABI()
  }

  try {
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    const { transactionHash } = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('The transaction hash is ==>', transactionHash);
    console.log('Check Alchemy\'s Mempool to view the status of your transaction');
  } catch (err) {
    console.log('Transaction failed ==>', err);
  }
}


async function main() {
  // The interface is used to retrieve the message
  const message = await helloWorldContract.methods.message().call();

  console.log('The current message is ==>', message);

  // await updateMessage('The new message');

  // const updatedMessage = await helloWorldContract.methods.message().call();
  // console.log('The current message is ==>', updatedMessage);
}


main();

// console.log(JSON.stringify(contract.abi));
