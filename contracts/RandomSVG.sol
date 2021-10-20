// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RandomSVG is ERC721URIStorage {

    constructor() ERC721("RandomSVG", "rsvg") {
        
    }
}