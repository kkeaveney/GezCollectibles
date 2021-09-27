// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract NFT is ERC721, Ownable {

  using SafeMath for uint256;

  uint public nftPrice = 80000000000000000; //0.08 ETH

  uint constant maxPurchase = 20;

  uint256 public MAX_NFTS;

  bool public saleIsActive = false;

  uint256 public REVEAL_TIMESTAMP;

  address payable public _owner;
  mapping (uint => bool) public sold;
  mapping (uint => uint) public price;


  event Purchase(address owner, uint price, uint id, string uri);

  constructor(string memory name, string memory symbol, uint256 maxNftSupply, uint256 saleStart) ERC721(name, symbol) public {
  	_owner = msg.sender;
    MAX_NFTS = maxNftSupply;
    REVEAL_TIMESTAMP = saleStart + (86400 * 9);
    }

  function mint(string memory _tokenURI, uint _price, uint numberOfNFTs) public onlyOwner returns (bool) {
    require(saleIsActive == true, 'Sale must be active for minting');
    require(numberOfNFTs <= MAX_NFTS, "Can only mint 20 NFTs at a time");
    require(totalSupply().add(numberOfNFTs) <= MAX_NFTS, "Purchase would exceed max supply of NFTs");
    
    uint _tokenId = totalSupply() + 1;
    price[_tokenId] = _price;

    for(uint i = 0; i <=numberOfNFTs; i++) {
      console.log(totalSupply());
      if(totalSupply() < MAX_NFTS) {
        _mint(address(this), _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
      }
    }

    return true;
  }

  function setRevealTimestamp(uint256 revealTimeStamp) public onlyOwner {
    REVEAL_TIMESTAMP = revealTimeStamp;
  }

  function flipSaleIsActive() public onlyOwner {
    saleIsActive = !saleIsActive;
  }

  function buy(uint _id) external payable {
    _validate(_id); //check req. for trade
    _trade(_id); //swap nft for eth
    emit Purchase(msg.sender, price[_id], _id, tokenURI(_id));
  }

  function _validate(uint _id) internal {
  	require(_exists(_id), "Error, wrong Token id"); //not exists
    require(!sold[_id], "Error, Token is sold"); //already sold
    require(msg.value >= price[_id], "Error, Token costs more"); //costs more
  }

  function _trade(uint _id) internal {
  	_transfer(address(this), msg.sender, _id); //nft to user
  	_owner.transfer(msg.value); //eth to owner
  	sold[_id] = true; //nft is sold
  }
}