// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {

  using Strings for uint256;

  address payable public _owner;

  mapping (uint => bool) public sold;
  mapping (uint => uint) public price;

  // optional mapping for token URIs
  mapping (uint => string) private _tokenURIs;

  // Base URI
  string private _baseURIextended;
  uint256 tokenCounter = 0;

  event Purchase(address owner, uint price, uint id, string uri);

  constructor() ERC721("GENZ", "GNZ") {
  	_owner = payable(msg.sender);
  }

  function mint(string memory _tokenURI, uint _price) public onlyOwner returns (bool) {
    uint _tokenId = tokenCounter + 1;
    price[_tokenId] = _price;

    _mint(address(this), _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
    tokenCounter ++;
    return true;
  }

  function setBaseURI(string memory _baseURI) external onlyOwner() {
    _baseURIextended = _baseURI;
  }

  function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
    require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
    _tokenURIs[tokenId] = _tokenURI;
  }

  function _baseURI() internal view override returns (string memory) {
    return _baseURIextended;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
      string memory _tokenURI = _tokenURIs[tokenId];
      string memory base = _baseURI();

      // If there is no base URI, return the token URI.
      if (bytes(base).length == 0) {
                return _tokenURI;
      }
      // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
      if (bytes(_tokenURI).length > 0) {
          return string(abi.encodePacked(base, _tokenURI));
      }
      // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
      return string(abi.encodePacked(base, tokenId.toString()));
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

  function totalSupply() public view returns (uint) {
    return tokenCounter;
  }


}

