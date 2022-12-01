// https://eth-goerli.g.alchemy.com/v2/_Z0zPekHwzLlHQBkU6MAzKjQJIhJfwve

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/_Z0zPekHwzLlHQBkU6MAzKjQJIhJfwve',
      accounts: ['769f851c0e46e321b31bd33deb343d834f527b859a2c9b11fb875a6a846781f3'] 
    }
  }
};
