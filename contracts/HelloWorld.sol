pragma solidity 0.8.3;

// Once contract is deployed, it resides at a specific address on the Ethereum blockchain.
contract HelloWorld {
    // - declares a state variable message
    // - value is permantently stored in contract
    // - creates a function other contracts or clients can call to access this value
    string public message;

    // - Executed upon contract creation
    // - Accepts an intial message and sets the message variable to it
    constructor(string memory initMessage) {
        message = initMessage;
    }

    // Public function that accepts a string arg and updates the message variable
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
