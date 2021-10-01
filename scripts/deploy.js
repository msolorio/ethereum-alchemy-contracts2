async function main() {
  // Get a contract factory by the contract file name
  const HelloWorld = await ethers.getContractFactory('HelloWorld');

  // Start deployment, returning a promise that resolved to a contract object
  const contractInstance = await HelloWorld.deploy('Initial message ...');

  console.log('contractInstance ==>', contractInstance);
  console.log('contractInstance.address ==>', contractInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
