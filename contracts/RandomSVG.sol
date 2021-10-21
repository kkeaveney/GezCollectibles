// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomSVG is ERC721URIStorage, VRFConsumerBase {

    bytes32 public keyHash;
    uint256 public fee;
    uint256 tokenCounter;

    uint256 public maxNumberOfPaths;
    uint256 public maxNumberOfPathsCommands;
    uint256 public size;
    string[] public pathCommands;
    string[] public colors;


    mapping(bytes32 => address) public requestIdToSender;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    mapping(uint256 => uint256) public tokenIdToRandomNumber;

    event requestedRandomSVG(bytes32 indexed requestId, uint256 indexed tokenId);
    event CreatedUnfinshedRandomSVG(uint256 indexed tokenId, uint256 randomNumber);
    event CreatedRandomSVG(uint256 indexed tokenId, uint256 randomNumber);

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyHash, uint256 _fee)
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("RandomSVG", "rsvg") {
            fee = _fee;
            keyHash = _keyHash;
            tokenCounter = 0;

            maxNumberOfPaths = 10;
            maxNumberOfPathsCommands = 5;
            size = 500;
            pathCommands = ["M", "L"];
            colors = ["red", "blue", "green", "yellow", "black", "white"];
    }

    function create() public returns (bytes32 requestId){
        requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        uint256 tokenId = tokenCounter;
        requestIdToTokenId[requestId] = tokenId;
        tokenCounter = tokenCounter + 1;
        emit requestedRandomSVG(requestId, tokenId);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address nftOwner = requestIdToSender[requestId];
        uint256 tokenId = requestIdToTokenId[requestId];
        _safeMint(nftOwner, tokenId);
        // generate RandomSVG
        tokenIdToRandomNumber[tokenId] = randomNumber;
        emit CreatedUnfinshedRandomSVG(tokenId, randomNumber);
    }

    function finishMint() public {
        // check to see if its been minted and a random number is returned
        // generate some random SVG code
        // tuen that into an image URI
        // use that imageURI to format into a token URI
        require(bytes32(tokenURI(tokenId)).length <= 0, "tokenURI is already all set!");
        require(tokenCOunter > tokenId,  "TokenId has not been minted yet");
        require(tokenIdToRandomNumber[tokenId] > 0, "Need to wait for Chainlink VRF");
        uint256 randomNumber = tokenIdToRandomNumber[_tokenId];
        string memory svg = generateSVG(randomNumber);
        string memory tokenURI = formatTokenURI(imageURI);
        _setTokenURI(tokenId, tokenURI);
        emit CreatedRandomSVG(tokenID, svg);
    }

    function generateSVG(uint256 randomNumber) public view returns (string memory finalSVG) {
        uint256 numberOfPaths = (randomNumber % maxNumberOfPaths) + 1;
        finalSVG = string(abi.endoedPacked("<svg xmlns='http://www.w3.org/2000/svg' height='",
        uint2str(size),"' width='", uint2str(size),"'>"));
        for(uint i = 0; i <= numberOfPaths; i++) {
            uint256 newRNG = uint256(keccak256(abi.encode(_randomNumber, i)));
            string memory pathSvg = generate(newRNG);
            finalSvg = string(abi.encodePacked(finalSvg, pathSvg));
        }
        finalSvg = string(abi.encodePacked(finalSvg, "</svg"));
    }

    function generatePath(uint256 _randomNumber) public view returns(string memory pathSvg) {
        uint256 numberOfPathCommands = (_randomNumber % maxNumberOfPathsCommands) + 1;
        pathSvg = "<path d='";
        for(uint i = 0; i < numberOfPathCommands; i++) {
            uint256 newRNG = uint256(keccak256(abi.encode(_randomNumber, size + i)));
            string memory pathCommand = generatePathCommand(newRNG);
            pathSvg = string(abi.encodedPacked(pathSvg, pathCommand));
        }
        string memory color = colors[_randomNumber % colors.length];
        pathSvg = string(abi.encodedPacked(pathSvg, "' fill='transparent' stroke='", color, "'>"));
    }

    function generatePathCommand(uint256 randomNumber) public view returns(string memory pathCommand) {
        pathCommand = pathCommands[_randomNumber % pathCommands.length];
        uint256 parameterOne = uint256(keccak256(abi.encode(randomNumber, size * 2))) % size;
        uint256 parameterTwo = uint(keccak256(abi.encode(randomNumber, size * 3))) % size;
        pathCommand = string(abi.encodePacked(pathCommand, " ", uint2str(parameterOne, " ", uint2str(parameterTwo))));
    }

}