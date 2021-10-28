// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "base64-sol/base64.sol";

contract RandomSVG is ERC721URIStorage, VRFConsumerBase {

    bytes32 public keyHash;
    uint256 public fee;
    uint256 tokenCounter;
    uint256 public price;
    address payable public owner;

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
    event CreatedRandomSVG(uint256 indexed tokenId, string tokenURI);

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyHash, uint256 _fee)
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("RandomSVG", "rsvg") {
            fee = _fee;
            keyHash = _keyHash;
            tokenCounter = 0;
            price = 100000000000000000; // 0.1 ETH,
            owner = payable(msg.sender);

            maxNumberOfPaths = 10;
            maxNumberOfPathsCommands = 5;
            size = 500;
            pathCommands = ["M", "L"];
            colors = ["red", "blue", "green", "yellow", "black", "white"];
    }

    function create() public payable returns (bytes32 requestId){
        require(msg.value >= price, "Need to send more ETH");
        requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        uint256 tokenId = tokenCounter;
        requestIdToTokenId[requestId] = tokenId;
        tokenCounter = tokenCounter + 1;
        emit requestedRandomSVG(requestId, tokenId);
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "not the owner");
        _;
    }

    function withdraw() public {
        transfer(address(this).msg.sender);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address nftOwner = requestIdToSender[requestId];
        uint256 tokenId = requestIdToTokenId[requestId];
        _safeMint(nftOwner, tokenId);
        // generate RandomSVG
        tokenIdToRandomNumber[tokenId] = randomNumber;
        emit CreatedUnfinshedRandomSVG(tokenId, randomNumber);
    }

    function finishMint(uint256 tokenId) public {
        // check to see if its been minted and a random number is returned
        // generate some random SVG code
        // tuen that into an image URI
        // use that imageURI to format into a token URI
        require(bytes(tokenURI(tokenId)).length <= 0, "tokenURI is already all set!");
        require(tokenCounter > tokenId,  "TokenId has not been minted yet");
        require(tokenIdToRandomNumber[tokenId] > 0, "Need to wait for Chainlink VRF");
        uint256 randomNumber = tokenIdToRandomNumber[tokenId];
        string memory svg = generateSVG(randomNumber);
        string memory imageURI = svgToImageURI(svg);
        _setTokenURI(tokenId, formatTokenURI(imageURI));
        emit CreatedRandomSVG(tokenId, svg);
    }

    function generateSVG(uint256 randomNumber) public view returns (string memory finalSvg) {
        uint256 numberOfPaths = (randomNumber % maxNumberOfPaths) + 1;
        finalSvg = string(abi.encodePacked("<svg xmlns='http://www.w3.org/2000/svg' height='",
        uint2str(size),"' width='", uint2str(size),"'>"));
        for(uint i = 0; i <= numberOfPaths; i++) {
            uint256 newRNG = uint256(keccak256(abi.encode(randomNumber, i)));
            string memory pathSvg = generatePath(newRNG);
            finalSvg = string(abi.encodePacked(finalSvg, pathSvg));
        }
        finalSvg = string(abi.encodePacked(finalSvg, "</svg>"));
    }

    function generatePath(uint256 _randomNumber) public view returns(string memory pathSvg) {
        uint256 numberOfPathCommands = (_randomNumber % maxNumberOfPathsCommands) + 1;
        pathSvg = "<path d='";
        for(uint i = 0; i < numberOfPathCommands; i++) {
            uint256 newRNG = uint256(keccak256(abi.encode(_randomNumber, size + i)));
            string memory pathCommand = generatePathCommand(newRNG);
            pathSvg = string(abi.encodePacked(pathSvg, pathCommand));
        }
        string memory color = colors[_randomNumber % colors.length];
        pathSvg = string(abi.encodePacked(pathSvg, "' fill='transparent' stroke='", color,"'/>"));
    }

    function generatePathCommand(uint256 randomNumber) public view returns(string memory pathCommand) {
        pathCommand = pathCommands[randomNumber % pathCommands.length];
        uint256 parameterOne = uint256(keccak256(abi.encode(randomNumber, size * 2))) % size;
        uint256 parameterTwo = uint(keccak256(abi.encode(randomNumber, size * 3))) % size;
        pathCommand = string(abi.encodePacked(pathCommand, " ", uint2str(parameterOne), " ", uint2str(parameterTwo)));
    }

    // You could also just upload the raw SVG and have solildity convert it!
    function svgToImageURI(string memory svg) public pure returns (string memory) {
        // example:
        // <svg width='500' height='500' viewBox='0 0 285 350' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='M150,0,L75,200,L225,200,Z'></path></svg>
        // data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI4NSAzNTAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nYmxhY2snIGQ9J00xNTAsMCxMNzUsMjAwLEwyMjUsMjAwLFonPjwvcGF0aD48L3N2Zz4=
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(svg))));
        return string(abi.encodePacked(baseURL,svgBase64Encoded));
    }

    function formatTokenURI(string memory imageURI) public pure returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                "SVG NFT", // You can add whatever name here
                                '", "description":"An NFT based on SVG!", "attributes":"", "image":"',imageURI,'"}'
                            )
                        )
                    )
                )
            );
    }

    // From: https://stackoverflow.com/a/65707309/11969592
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}