// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract NFT is ERC721, Ownable {

  using SafeMath for uint256;

  // Starting Index
  uint256 STARTING_INDEX;

  // Maximum number of Tokens to mint
  uint public MAX_PURCHASE = 10;

  // Maximum number of tokens to supply
  uint public MAX_NFTS = 11111;

  // Current price
  uint256 public CURRENT_PRICE = 80000000000000000; //0.08 ETH

  // Reveal timestamp
  uint256 REVEAL_TIMESTAMP;

  address payable public _owner;
  mapping (uint => bool) public sold;

  // Define is sale is active
  bool public saleIsActive = false;



  event Purchase(address owner, uint price, uint id, string uri);


  constructor(string memory name, string memory symbol, string memory baseURIp, uint256 startingIndex) ERC721(name, symbol) public {
      _owner = msg.sender;
      setBaseURI(baseURIp);
      STARTING_INDEX = startingIndex;
  }

  function setStartingIndex(uint256 startingIndex) public onlyOwner {
       STARTING_INDEX = startingIndex;
  }

  function mint(uint256 numOfTokens) public payable {
      require(saleIsActive, "Sale must be active for minting");
      require(numOfTokens <= MAX_PURCHASE, 'Can only mint 10 NFTs at a time');
      require(totalSupply().add(numOfTokens) <= MAX_NFTS, "At max Supply");
      require(msg.value == CURRENT_PRICE * numOfTokens, "Ether value sent is not correct");

        for(uint i=1; i<=numOfTokens; i++) {
          uint256 _tokenId = totalSupply().add(1);
          _safeMint(msg.sender, _tokenId);
        }
    }

  function setBaseURI(string memory baseURI_) public onlyOwner {
    _setBaseURI(baseURI_);
  }

  function setTotalSupply(uint _totalSupply) public onlyOwner {
    MAX_NFTS = _totalSupply;
  }

  function setRevealTimestamp(uint256 _revealTimeStamp) public onlyOwner {
    REVEAL_TIMESTAMP = _revealTimeStamp;
  }

  function flipSaleIsActive() public onlyOwner {
    saleIsActive = !saleIsActive;
  }

  function buy(uint _id) external payable {
    _validate(_id); //check req. for trade
    _trade(_id); //swap nft for eth
    emit Purchase(msg.sender, CURRENT_PRICE, _id, tokenURI(_id));
  }

  function _validate(uint _id) internal {
  	require(_exists(_id), "Error, wrong Token id"); //not exists
    require(!sold[_id], "Error, Token is sold"); //already sold
    require(msg.value >= CURRENT_PRICE, "Error, Token costs more"); //costs more
  }

  function _trade(uint _id) internal {
  	_transfer(address(this), msg.sender, _id); //nft to user
  	_owner.transfer(msg.value); //eth to owner
  	sold[_id] = true; //nft is sold
  }
}