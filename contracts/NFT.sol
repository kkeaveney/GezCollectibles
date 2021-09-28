// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFT is ERC721, Ownable {

  using SafeMath for uint256;
  using Counters for Counters.Counter;

  uint256[] private allTokens;

  uint public nftPrice = 80000000000000000; //0.08 ETH

  uint public MAX_PURCHASE;
  uint public MAX_NFTS;

  bool public saleIsActive = false;

  uint256 public REVEAL_TIMESTAMP;

  address payable public _owner;
  mapping (uint => bool) public sold;

  uint public mintPrice;
  Counters.Counter private _tokenIdCounter;


  event Purchase(address owner, uint price, uint id, string uri);

  constructor(uint _mintPrice, string memory _name, string memory _symbol, uint256 _maxNFTs, uint256 _maxPurchase) ERC721(_name, _symbol) public {
    mintPrice = _mintPrice;
    MAX_NFTS = _maxNFTs;
    MAX_PURCHASE = _maxPurchase;
    _owner = msg.sender;
  }

  function mint(uint256 _count) public payable  returns (bool) {
    require(saleIsActive, "Sale must be active for minting");
    require(_count <= MAX_PURCHASE, 'Can only mint 10 NFTs at a time');
    require(msg.value == mintPrice * _count, "Insuffcient Amount Sent");

    require(_tokenIdCounter.current() <= MAX_NFTS, "At max supply");

    for(uint i=1; i<=_count; i++) {
      uint256 _tokenID = _tokenIdCounter.current();
      _safeMint(msg.sender, _tokenID + 1);
      _tokenIdCounter.increment();
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

  function mintCount() public view onlyOwner returns (uint){
    return _tokenIdCounter.current();
  }

  function buy(uint _id) external payable {
    _validate(_id); //check req. for trade
    _trade(_id); //swap nft for eth
    emit Purchase(msg.sender, mintPrice, _id, tokenURI(_id));
  }

  function _validate(uint _id) internal {
  	require(_exists(_id), "Error, wrong Token id"); //not exists
    require(!sold[_id], "Error, Token is sold"); //already sold
    require(msg.value >= mintPrice, "Error, Token costs more"); //costs more
  }

  function _trade(uint _id) internal {
  	_transfer(address(this), msg.sender, _id); //nft to user
  	_owner.transfer(msg.value); //eth to owner
  	sold[_id] = true; //nft is sold
  }
}