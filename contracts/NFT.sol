// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

  contract NFT is ERC721Enumerable, Ownable {

    using SafeMath for uint256;

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
    mapping(uint256 => NFTDetail) private _nftDetail;

    // Base URI
    string private baseURI;

    mapping (uint => bool) public sold;

    // withdraw addresses
    address t1 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address t2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address t3 = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
    address t4 = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc;

    /**
    Contract constructor
    */
    constructor(string memory name, string memory symbol, string memory baseURIp, uint256 startingIndex) ERC721(name, symbol) public {
      setBaseURI(baseURIp);
      STARTING_INDEX = startingIndex;

      // team gets first four NFTs
      _safeMint( t1, 0);
      _safeMint( t2, 1);
      _safeMint( t3, 2);
      _safeMint( t4, 3);
    }

    /**
    Withdraw
     */
    function withdraw() public onlyOwner {
      uint256 balance = address(this).balance;
      payable(msg.sender).transfer(balance);
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
            _nftDetail[tokenId] = NFTDetail(first_encounter);
            _safeMint(msg.sender, tokenId);
            emit TokenMinted(tokenId, msg.sender, first_encounter);
        }
      }
    }
    /**
    Mint unique token
    */
    function mintToken(uint256 tokenId) public onlyOwner {
      require(!_exists(tokenId));
      _safeMint((msg.sender), tokenId);
      uint256 first_encounter = block.timestamp;
      _nftDetail[tokenId] = NFTDetail(first_encounter);
      emit TokenMinted(tokenId, msg.sender, first_encounter);
    }
    /**
    Mint tokens
     */
    function mint(uint256 numOfTokens) public payable {
      require(saleIsActive, "Sale must be active for minting");
      require(numOfTokens <= MAX_PURCHASE, 'Can only mint 10 NFTs at a time');
      require(totalSupply().add(numOfTokens) <= MAX_NFTS, "At max Supply");
      require(msg.value == CURRENT_PRICE * numOfTokens, "Ether value sent is not correct");

        for(uint i=1; i<=numOfTokens; i++) {
          uint256 _tokenId = totalSupply().add(1);
          _safeMint(msg.sender, _tokenId);
          uint256 first_encounter = block.timestamp;
          _nftDetail[_tokenId] = NFTDetail(first_encounter);
          emit TokenMinted(_tokenId, msg.sender, first_encounter);
        }
    }

    /**
    set starting index
    */
    function setStartingIndex(uint256 startingIndex) public onlyOwner {
       STARTING_INDEX = startingIndex;
     }

     /**
     Set current price
    */
    function setCurrentPrice(uint256 price) public onlyOwner {
      CURRENT_PRICE = price;
    }

    /**
    Set maximum number of tokens
    */
    function setMaxTokens(uint256 maxTokens) public onlyOwner {
      MAX_NFTS = maxTokens;
    }
    /**
    Set base URI
    */

    function setBaseURI(string memory BaseURI) public onlyOwner {
      baseURI = BaseURI;
    }

    /**
    return baseURI
     */
    function _baseURI() internal view virtual override returns (string memory) {
      return baseURI;
    }

    /**
    Flip active sale
    */
    function flipSaleIsActive() public onlyOwner {
      saleIsActive = !saleIsActive;
    }

    /**
    get Token detail
    */
    function getTokenDetail(uint256 tokenId) public view returns (NFTDetail memory detail) {
      return _nftDetail[tokenId];
    }

    function buy(uint id) external payable {
      _validate(id); //check req. for trade
      _trade(id); //swap nft for eth
      emit Purchase(msg.sender, CURRENT_PRICE, id, tokenURI(id));
    }

    function _validate(uint id) internal {
      require(_exists(id), "Error, wrong Token id"); //not exists
      require(!sold[id], "Error, Token is sold"); //already sold
      require(msg.value >= CURRENT_PRICE, "Error, Token costs more"); //costs more
    }

    function _trade(uint id) internal {
      _transfer(address(this), msg.sender, id); //nft to user
      _owner.transfer(msg.value); //eth to owner
      sold[id] = true; //nft is sold
    }

}