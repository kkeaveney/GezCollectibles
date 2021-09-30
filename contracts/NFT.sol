// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

  contract NFT is ERC721, Ownable {

    using SafeMath for uint256;
    using Counters for Counters.Counter;

    struct NFTDetail {
      uint256 first_encounter;
    }

    // Events
    event Purchase(address owner, uint price, uint id, string uri);

    event TokenMinted(uint256 tokenId, address owner, uint256 first_encounter);

    // Starting Index
    uint256 STARTING_INDEX;

    // Maximum number of Tokens to mint
    uint public MAX_PURCHASE = 10;

    // Maximum number of tokens to supply
    uint public MAX_NFTS = 11111;

    // Current price
    uint256 public CURRENT_PRICE = 80000000000000000; //0.08 ETH

    // Define is sale is active
    bool public saleIsActive = false;

    // owner address
    address payable public _owner;

    // NFT details
    mapping(uint256 => NFTDetail) private nftDetail;

    mapping (uint => bool) public sold;

    Counters.Counter private _tokenIdCounter;

    /**
    Contract constructor
    */
    constructor(string memory _name, string memory _symbol, string memory _baseURIp, uint256 _startingIndex) ERC721(_name, _symbol) public {
      setBaseURI(_baseURIp);
      STARTING_INDEX = _startingIndex;
    }

    /**
    Withdraw
     */
    function withdraw() public onlyOwner {
      uint256 balance = address(this).balance;
      msg.sender.transfer(balance);
    }

    /**
    Reserve tokens
    */
    function reserveTokens() public onlyOwner {
      uint i;
      uint tokenId;
      uint256 first_encounter = block.timestamp;
        for(i = 1; i <=20; i++) {
          tokenId = totalSupply().add(1);
          if(tokenId <= MAX_NFTS) {
            nftDetail[tokenId] = NFTDetail(first_encounter);
            _safeMint(msg.sender, tokenId);
            emit TokenMinted(tokenId, msg.sender, first_encounter);
        }
      }
    }

    function mint(uint256 _count) public payable  returns (bool) {
      require(saleIsActive, "Sale must be active for minting");
      require(_count <= MAX_PURCHASE, 'Can only mint 10 NFTs at a time');
      require(_tokenIdCounter.current() <= MAX_NFTS, "At max supply");
      require(msg.value == CURRENT_PRICE * _count, "Ether value sent is not correct");

        for(uint i=1; i<=_count; i++) {
          uint256 _tokenID = _tokenIdCounter.current();
          _safeMint(msg.sender, _tokenID + 1);
          _tokenIdCounter.increment();
        }
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
      _setBaseURI(baseURI_);
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