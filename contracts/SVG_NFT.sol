// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIstorage.sol";
import "base64-sol/base64.sol";


contract SVGNFT is ERC721URIStorage {
    uint256 tokenCOunter;
    constructor() ERC721("SVG NFT", "svgNFT") {
        tokenCounter = 0;
    }

    function create(string memory svg) public  {
        _safeMint(msg.sender, tokenCounter);
        string memory imageURI = svgToImageURI(svg);
        tokenCounter = tokenCOunter + 1;
    }

    function svgToImageURI() public pure returns (string memory){
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        string imageURL = string(abi.encodePacked(baseURL, svgBase64Encoded));
        return imageURI;
    }
}