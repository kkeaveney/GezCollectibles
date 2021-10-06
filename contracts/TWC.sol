

// // File: contracts/WickedCraniums.sol

// pragma solidity 0.7.0;

// /**
//  * @title WickedCraniums contract
//  * @dev Extends ERC721 Non-Fungible Token Standard basic implementation
//  */
// contract WickedCraniums is ERC721, Ownable {
//     using SafeMath for uint256;

//     string public PROV = "b80d60a4defcca5af3ed6526d8c0f86089b9400659c89da2b2725b32f8686d4a";
//     uint256 public constant craniumPrice = 60000000000000000; // 0.06 ETH
//     uint public constant maxCraniumPurchase = 100;
//     uint256 public MAX_CRANIUMS = 10762;
//     bool public saleIsActive = false;

//     constructor() ERC721("TheWickedCraniums", "TWC") {
//     }

//     function withdraw() public onlyOwner {
//         uint balance = address(this).balance;
//         msg.sender.transfer(balance);
//     }

//     function reserveCraniums() public onlyOwner {
//         uint supply = totalSupply();
//         uint i;
//         for (i = 0; i < 40; i++) {
//             _safeMint(msg.sender, supply + i);
//         }
//     }
    
//     function flipSaleState() public onlyOwner {
//         saleIsActive = !saleIsActive;
//     }
    
//     function setBaseURI(string memory baseURI) public onlyOwner {
//         _setBaseURI(baseURI);
//     }

//     function mintCraniums(uint numberOfTokens) public payable {
//         require(saleIsActive, "Sale must be active to mint Craniums");
//         require(numberOfTokens <= maxCraniumPurchase, "Can only mint 100 tokens at a time");
//         require(totalSupply().add(numberOfTokens) <= MAX_CRANIUMS, "Purchase would exceed max supply of Craniums");
//         require(craniumPrice.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");
        
//         for(uint i = 0; i < numberOfTokens; i++) {
//             uint mintIndex = totalSupply();
//             if (totalSupply() < MAX_CRANIUMS) {
//                 _safeMint(msg.sender, mintIndex);
//             }
//         }
//     }

// }