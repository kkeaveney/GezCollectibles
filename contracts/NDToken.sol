// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract NDToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) public {
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}