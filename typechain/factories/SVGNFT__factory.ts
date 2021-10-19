/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { SVGNFT } from "../SVGNFT";

export class SVGNFT__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SVGNFT> {
    return super.deploy(overrides || {}) as Promise<SVGNFT>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SVGNFT {
    return super.attach(address) as SVGNFT;
  }
  connect(signer: Signer): SVGNFT__factory {
    return super.connect(signer) as SVGNFT__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): SVGNFT {
    return new Contract(address, _abi, signerOrProvider) as SVGNFT;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "CreatedSVGNFT",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "svg",
        type: "string",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
    ],
    name: "formatTokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "svg",
        type: "string",
      },
    ],
    name: "svgToImageURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600781526020017f535647204e4654000000000000000000000000000000000000000000000000008152506040518060400160405280600681526020017f7376674e46540000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620000c0565b508060019080519060200190620000af929190620000c0565b5050506000600781905550620001d5565b828054620000ce9062000170565b90600052602060002090601f016020900481019282620000f257600085556200013e565b82601f106200010d57805160ff19168380011785556200013e565b828001600101855582156200013e579182015b828111156200013d57825182559160200191906001019062000120565b5b5090506200014d919062000151565b5090565b5b808211156200016c57600081600090555060010162000152565b5090565b600060028204905060018216806200018957607f821691505b60208210811415620001a0576200019f620001a6565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61309b80620001e56000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806370a0823111610097578063b6a46b3b11610066578063b6a46b3b146102d1578063b88d4fde146102ed578063c87b56dd14610309578063e985e9c51461033957610100565b806370a082311461023757806371aee1931461026757806395d89b4114610297578063a22cb465146102b557610100565b806323b872dd116100d357806323b872dd1461019f57806330d871c6146101bb57806342842e0e146101eb5780636352211e1461020757610100565b806301ffc9a71461010557806306fdde0314610135578063081812fc14610153578063095ea7b314610183575b600080fd5b61011f600480360381019061011a9190611f4c565b610369565b60405161012c9190612959565b60405180910390f35b61013d61044b565b60405161014a9190612974565b60405180910390f35b61016d60048036038101906101689190611fdf565b6104dd565b60405161017a91906128f2565b60405180910390f35b61019d60048036038101906101989190611f10565b610562565b005b6101b960048036038101906101b49190611e0a565b61067a565b005b6101d560048036038101906101d09190611f9e565b6106da565b6040516101e29190612974565b60405180910390f35b61020560048036038101906102009190611e0a565b61076d565b005b610221600480360381019061021c9190611fdf565b61078d565b60405161022e91906128f2565b60405180910390f35b610251600480360381019061024c9190611da5565b61083f565b60405161025e9190612b96565b60405180910390f35b610281600480360381019061027c9190611f9e565b6108f7565b60405161028e9190612974565b60405180910390f35b61029f610947565b6040516102ac9190612974565b60405180910390f35b6102cf60048036038101906102ca9190611ed4565b6109d9565b005b6102eb60048036038101906102e69190611f9e565b610b5a565b005b61030760048036038101906103029190611e59565b610be0565b005b610323600480360381019061031e9190611fdf565b610c42565b6040516103309190612974565b60405180910390f35b610353600480360381019061034e9190611dce565b610d94565b6040516103609190612959565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061043457507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610444575061044382610e28565b5b9050919050565b60606000805461045a90612e50565b80601f016020809104026020016040519081016040528092919081815260200182805461048690612e50565b80156104d35780601f106104a8576101008083540402835291602001916104d3565b820191906000526020600020905b8154815290600101906020018083116104b657829003601f168201915b5050505050905090565b60006104e882610e92565b610527576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051e90612af6565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061056d8261078d565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156105de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d590612b56565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105fd610efe565b73ffffffffffffffffffffffffffffffffffffffff16148061062c575061062b81610626610efe565b610d94565b5b61066b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066290612a36565b60405180910390fd5b6106758383610f06565b505050565b61068b610685610efe565b82610fbf565b6106ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c190612b76565b60405180910390fd5b6106d583838361109d565b505050565b606060006040518060400160405280601a81526020017f646174613a696d6167652f7376672b786d6c3b6261736536342c000000000000815250905060006107408460405160200161072c9190612852565b6040516020818303038152906040526112f9565b90508181604051602001610755929190612869565b60405160208183030381529060405292505050919050565b61078883838360405180602001604052806000815250610be0565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082d90612a76565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156108b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a790612a56565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606109218260405160200161090d919061288d565b6040516020818303038152906040526112f9565b60405160200161093191906128d0565b6040516020818303038152906040529050919050565b60606001805461095690612e50565b80601f016020809104026020016040519081016040528092919081815260200182805461098290612e50565b80156109cf5780601f106109a4576101008083540402835291602001916109cf565b820191906000526020600020905b8154815290600101906020018083116109b257829003601f168201915b5050505050905090565b6109e1610efe565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a46906129f6565b60405180910390fd5b8060056000610a5c610efe565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16610b09610efe565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610b4e9190612959565b60405180910390a35050565b610b6633600754611498565b6000610b71826106da565b90506000610b7e826108f7565b9050610b8c600754826114b6565b6007547ff5acc616aa8ecd00e5d76674d7812f9c3c3571d662c9fba4499deefa6d0be12d82604051610bbe9190612974565b60405180910390a26001600754610bd59190612c85565b600781905550505050565b610bf1610beb610efe565b83610fbf565b610c30576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2790612b76565b60405180910390fd5b610c3c8484848461152a565b50505050565b6060610c4d82610e92565b610c8c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8390612ad6565b60405180910390fd5b6000600660008481526020019081526020016000208054610cac90612e50565b80601f0160208091040260200160405190810160405280929190818152602001828054610cd890612e50565b8015610d255780601f10610cfa57610100808354040283529160200191610d25565b820191906000526020600020905b815481529060010190602001808311610d0857829003601f168201915b505050505090506000610d36611586565b9050600081511415610d4c578192505050610d8f565b600082511115610d81578082604051602001610d69929190612869565b60405160208183030381529060405292505050610d8f565b610d8a8461159d565b925050505b919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610f798361078d565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610fca82610e92565b611009576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161100090612a16565b60405180910390fd5b60006110148361078d565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061108357508373ffffffffffffffffffffffffffffffffffffffff1661106b846104dd565b73ffffffffffffffffffffffffffffffffffffffff16145b8061109457506110938185610d94565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff166110bd8261078d565b73ffffffffffffffffffffffffffffffffffffffff1614611113576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110a90612b16565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611183576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161117a906129d6565b60405180910390fd5b61118e838383611644565b611199600082610f06565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111e99190612d66565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112409190612c85565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b606060008251141561131c57604051806020016040528060008152509050611493565b6000604051806060016040528060408152602001613026604091399050600060036002855161134b9190612c85565b6113559190612cdb565b60046113619190612d0c565b905060006020826113729190612c85565b67ffffffffffffffff8111156113b1577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156113e35781602001600182028036833780820191505090505b509050818152600183018586518101602084015b81831015611452576003830192508251603f8160121c168501518253600182019150603f81600c1c168501518253600182019150603f8160061c168501518253600182019150603f81168501518253600182019150506113f7565b60038951066001811461146c576002811461147c57611487565b613d3d60f01b6002830352611487565b603d60f81b60018303525b50505050508093505050505b919050565b6114b2828260405180602001604052806000815250611649565b5050565b6114bf82610e92565b6114fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f590612a96565b60405180910390fd5b80600660008481526020019081526020016000209080519060200190611525929190611bc9565b505050565b61153584848461109d565b611541848484846116a4565b611580576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157790612996565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606115a882610e92565b6115e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115de90612b36565b60405180910390fd5b60006115f1611586565b90506000815111611611576040518060200160405280600081525061163c565b8061161b8461183b565b60405160200161162c929190612869565b6040516020818303038152906040525b915050919050565b505050565b61165383836119e8565b61166060008484846116a4565b61169f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169690612996565b60405180910390fd5b505050565b60006116c58473ffffffffffffffffffffffffffffffffffffffff16611bb6565b1561182e578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026116ee610efe565b8786866040518563ffffffff1660e01b8152600401611710949392919061290d565b602060405180830381600087803b15801561172a57600080fd5b505af192505050801561175b57506040513d601f19601f820116820180604052508101906117589190611f75565b60015b6117de573d806000811461178b576040519150601f19603f3d011682016040523d82523d6000602084013e611790565b606091505b506000815114156117d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117cd90612996565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611833565b600190505b949350505050565b60606000821415611883576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506119e3565b600082905060005b600082146118b557808061189e90612e82565b915050600a826118ae9190612cdb565b915061188b565b60008167ffffffffffffffff8111156118f7577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156119295781602001600182028036833780820191505090505b5090505b600085146119dc576001826119429190612d66565b9150600a856119519190612ecb565b603061195d9190612c85565b60f81b818381518110611999577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856119d59190612cdb565b945061192d565b8093505050505b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611a58576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a4f90612ab6565b60405180910390fd5b611a6181610e92565b15611aa1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a98906129b6565b60405180910390fd5b611aad60008383611644565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611afd9190612c85565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b600080823b905060008111915050919050565b828054611bd590612e50565b90600052602060002090601f016020900481019282611bf75760008555611c3e565b82601f10611c1057805160ff1916838001178555611c3e565b82800160010185558215611c3e579182015b82811115611c3d578251825591602001919060010190611c22565b5b509050611c4b9190611c4f565b5090565b5b80821115611c68576000816000905550600101611c50565b5090565b6000611c7f611c7a84612be2565b612bb1565b905082815260208101848484011115611c9757600080fd5b611ca2848285612e0e565b509392505050565b6000611cbd611cb884612c12565b612bb1565b905082815260208101848484011115611cd557600080fd5b611ce0848285612e0e565b509392505050565b600081359050611cf781612fc9565b92915050565b600081359050611d0c81612fe0565b92915050565b600081359050611d2181612ff7565b92915050565b600081519050611d3681612ff7565b92915050565b600082601f830112611d4d57600080fd5b8135611d5d848260208601611c6c565b91505092915050565b600082601f830112611d7757600080fd5b8135611d87848260208601611caa565b91505092915050565b600081359050611d9f8161300e565b92915050565b600060208284031215611db757600080fd5b6000611dc584828501611ce8565b91505092915050565b60008060408385031215611de157600080fd5b6000611def85828601611ce8565b9250506020611e0085828601611ce8565b9150509250929050565b600080600060608486031215611e1f57600080fd5b6000611e2d86828701611ce8565b9350506020611e3e86828701611ce8565b9250506040611e4f86828701611d90565b9150509250925092565b60008060008060808587031215611e6f57600080fd5b6000611e7d87828801611ce8565b9450506020611e8e87828801611ce8565b9350506040611e9f87828801611d90565b925050606085013567ffffffffffffffff811115611ebc57600080fd5b611ec887828801611d3c565b91505092959194509250565b60008060408385031215611ee757600080fd5b6000611ef585828601611ce8565b9250506020611f0685828601611cfd565b9150509250929050565b60008060408385031215611f2357600080fd5b6000611f3185828601611ce8565b9250506020611f4285828601611d90565b9150509250929050565b600060208284031215611f5e57600080fd5b6000611f6c84828501611d12565b91505092915050565b600060208284031215611f8757600080fd5b6000611f9584828501611d27565b91505092915050565b600060208284031215611fb057600080fd5b600082013567ffffffffffffffff811115611fca57600080fd5b611fd684828501611d66565b91505092915050565b600060208284031215611ff157600080fd5b6000611fff84828501611d90565b91505092915050565b61201181612d9a565b82525050565b61202081612dac565b82525050565b600061203182612c42565b61203b8185612c58565b935061204b818560208601612e1d565b61205481612fb8565b840191505092915050565b600061206a82612c4d565b6120748185612c69565b9350612084818560208601612e1d565b61208d81612fb8565b840191505092915050565b60006120a382612c4d565b6120ad8185612c7a565b93506120bd818560208601612e1d565b80840191505092915050565b60006120d6600983612c7a565b91507f7b226e616d65223a2200000000000000000000000000000000000000000000006000830152600982019050919050565b6000612116603283612c69565b91507f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008301527f63656976657220696d706c656d656e74657200000000000000000000000000006020830152604082019050919050565b600061217c601c83612c69565b91507f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006000830152602082019050919050565b60006121bc602483612c69565b91507f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612222601983612c69565b91507f4552433732313a20617070726f766520746f2063616c6c6572000000000000006000830152602082019050919050565b6000612262602c83612c69565b91507f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b60006122c8600783612c7a565b91507f535647204e4654000000000000000000000000000000000000000000000000006000830152600782019050919050565b6000612308603883612c69565b91507f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008301527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006020830152604082019050919050565b600061236e602a83612c69565b91507f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008301527f726f2061646472657373000000000000000000000000000000000000000000006020830152604082019050919050565b60006123d4602983612c69565b91507f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008301527f656e7420746f6b656e00000000000000000000000000000000000000000000006020830152604082019050919050565b600061243a602e83612c69565b91507f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008301527f6578697374656e7420746f6b656e0000000000000000000000000000000000006020830152604082019050919050565b60006124a0600283612c7a565b91507f227d0000000000000000000000000000000000000000000000000000000000006000830152600282019050919050565b60006124e0602083612c69565b91507f4552433732313a206d696e7420746f20746865207a65726f20616464726573736000830152602082019050919050565b6000612520603183612c69565b91507f45524337323155524953746f726167653a2055524920717565727920666f722060008301527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006020830152604082019050919050565b6000612586602c83612c69565b91507f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008301527f697374656e7420746f6b656e00000000000000000000000000000000000000006020830152604082019050919050565b60006125ec602983612c69565b91507f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960008301527f73206e6f74206f776e00000000000000000000000000000000000000000000006020830152604082019050919050565b6000612652602f83612c69565b91507f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008301527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006020830152604082019050919050565b60006126b8604383612c7a565b91507f222c20226465736372697074696f6e223a22416e204e4654206261736564206f60008301527f6e2053564721222c202261747472696275746573223a22222c2022696d61676560208301527f223a2200000000000000000000000000000000000000000000000000000000006040830152604382019050919050565b6000612744602183612c69565b91507f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008301527f72000000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006127aa601d83612c7a565b91507f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c0000006000830152601d82019050919050565b60006127ea603183612c69565b91507f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008301527f776e6572206e6f7220617070726f7665640000000000000000000000000000006020830152604082019050919050565b61284c81612e04565b82525050565b600061285e8284612098565b915081905092915050565b60006128758285612098565b91506128818284612098565b91508190509392505050565b6000612898826120c9565b91506128a3826122bb565b91506128ae826126ab565b91506128ba8284612098565b91506128c582612493565b915081905092915050565b60006128db8261279d565b91506128e78284612098565b915081905092915050565b60006020820190506129076000830184612008565b92915050565b60006080820190506129226000830187612008565b61292f6020830186612008565b61293c6040830185612843565b818103606083015261294e8184612026565b905095945050505050565b600060208201905061296e6000830184612017565b92915050565b6000602082019050818103600083015261298e818461205f565b905092915050565b600060208201905081810360008301526129af81612109565b9050919050565b600060208201905081810360008301526129cf8161216f565b9050919050565b600060208201905081810360008301526129ef816121af565b9050919050565b60006020820190508181036000830152612a0f81612215565b9050919050565b60006020820190508181036000830152612a2f81612255565b9050919050565b60006020820190508181036000830152612a4f816122fb565b9050919050565b60006020820190508181036000830152612a6f81612361565b9050919050565b60006020820190508181036000830152612a8f816123c7565b9050919050565b60006020820190508181036000830152612aaf8161242d565b9050919050565b60006020820190508181036000830152612acf816124d3565b9050919050565b60006020820190508181036000830152612aef81612513565b9050919050565b60006020820190508181036000830152612b0f81612579565b9050919050565b60006020820190508181036000830152612b2f816125df565b9050919050565b60006020820190508181036000830152612b4f81612645565b9050919050565b60006020820190508181036000830152612b6f81612737565b9050919050565b60006020820190508181036000830152612b8f816127dd565b9050919050565b6000602082019050612bab6000830184612843565b92915050565b6000604051905081810181811067ffffffffffffffff82111715612bd857612bd7612f89565b5b8060405250919050565b600067ffffffffffffffff821115612bfd57612bfc612f89565b5b601f19601f8301169050602081019050919050565b600067ffffffffffffffff821115612c2d57612c2c612f89565b5b601f19601f8301169050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000612c9082612e04565b9150612c9b83612e04565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612cd057612ccf612efc565b5b828201905092915050565b6000612ce682612e04565b9150612cf183612e04565b925082612d0157612d00612f2b565b5b828204905092915050565b6000612d1782612e04565b9150612d2283612e04565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612d5b57612d5a612efc565b5b828202905092915050565b6000612d7182612e04565b9150612d7c83612e04565b925082821015612d8f57612d8e612efc565b5b828203905092915050565b6000612da582612de4565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612e3b578082015181840152602081019050612e20565b83811115612e4a576000848401525b50505050565b60006002820490506001821680612e6857607f821691505b60208210811415612e7c57612e7b612f5a565b5b50919050565b6000612e8d82612e04565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612ec057612ebf612efc565b5b600182019050919050565b6000612ed682612e04565b9150612ee183612e04565b925082612ef157612ef0612f2b565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b612fd281612d9a565b8114612fdd57600080fd5b50565b612fe981612dac565b8114612ff457600080fd5b50565b61300081612db8565b811461300b57600080fd5b50565b61301781612e04565b811461302257600080fd5b5056fe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa2646970667358221220cbba49c3d2729c87cd349fcc7deb1e89d271c2aeda4b2a45ca6fa6abb96029b364736f6c63430008000033";
