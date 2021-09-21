import ReactTypingEffect from 'react-typing-effect';
import { buyNft } from '../store/interactions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Identicon from 'identicon.js';
import Loading from './Loading'
import {
  contractSelector,
  metadataSelector,
  nftStateSelector,
  networkSelector,
  metadataLoadedSelector,
  nftStateLoadedSelector
} from '../store/selectors'

class Main extends Component {
  render() {
    if(this.props.dataLoaded) {
        return (
          <div className="Main">
            <div className="container-fluid mt-5" style={{ color: "#000000", "backgroundColor": "#000000" }}>

            <br></br>
            <div>
              <ReactTypingEffect
                text={[
                  "Welcome to NFT Digital Art - X",
                  "Look around and choose the NFT you like",
                  'Click "Buy" to get UNIQUE 💎 NFT',
                  "Hurry up before all NFTs are sold out!"
                ]}
                speed='40'
                eraseSpeed='10'
                eraseDelay='2000'
                cursorRenderer={cursor => <h1>{cursor}</h1>}
                displayTextRenderer={(text, i) => {
                  return (
                    <h1>
                      {text.split('').map((char, i) => {
                        const key = `${i}`;
                        return (
                          <span
                            key={key}
                            style={i%2 === 0 ? {} : {}}
                          >{char}</span>
                        );
                      })}
                    </h1>
                  );
                }}
              />
              </div>
              <br></br>&nbsp;

            <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                    <div className="row justify-content-around" style={{ width: '1000px', fontSize: '13px'}}>

                    {this.props.metadata.map((nft, key) => {
                      return(
                        <div className="p-3" key={key}>
                        {this.props.nftState[nft.id]
                          ? <a href={nft.image} target="_blank" rel="noopener noreferrer">
                              <img src={`data:image/png;base64,${nft.img}`} style={{ border: '1mm ridge #8B8B8B', width: '200px', height: '230px' }} alt="art"/>
                            </a>
                          : <a href={nft.image} target="_blank" rel="noopener noreferrer">
                              <img
                                src={`data:image/png;base64,${nft.img}`} style={{ border: '1mm ridge #8B8B8B', width: '200px', height: '230px' }} alt="art"
                              />
                            </a>
                        }
                          <p></p>
                          <table style={{ width: '200px' }}>
                            <thead> {this.props.nftState[nft.id]
                            ? <tr>
                                <th className="text-left" style={{color: "#3f3939"}}>ID: </th>
                                <th style={{color: "#3f3939"}}>{nft.id}</th>
                              </tr>
                            : <tr>
                              <th className="text-left" style={{color: "#8B8B8B"}}>ID: </th>
                              <th style={{color: "#cac8c8"}}>{nft.id}</th>
                            </tr>}
                            </thead>
                            <tbody> {this.props.nftState[nft.id]
                            ?
                              <tr>
                                <th className="text-left" style={{color: "#3f3939"}}>URI: </th>
                                <td>
                                  <a href={nft.uri} target="_blank" rel="noopener noreferrer" style={{color: "#3f3939"}}>
                                    link
                                  </a>
                                </td>
                              </tr>
                            : <tr>
                            <th className="text-left" style={{color: "#8B8B8B"}}>URI: </th>
                            <td>
                              <a href={nft.uri} target="_blank" rel="noopener noreferrer" style={{color: "#cac8c8"}}>
                                link
                              </a>
                            </td>
                          </tr>}
                              {this.props.nftState[nft.id]
                              ? <tr>
                                  <th className="text-left" style={{color: "#3f3939"}}>Owner:</th>
                                  <th>
                                    <a
                                      href={`https://etherscan.io/address/` + this.props.nftState[nft.id]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{color: "#3f3939", "fontWeight": "normal"}}
                                    >
                                      {this.props.nftState[nft.id].substring(0,8) + '...'}
                                    </a>
                                  </th>
                                </tr>
                              : <tr>
                                  <th className="text-left" style={{color: "#8B8B8B"}}>Price: </th>
                                  <th style={{color: "#cac8c8"}}>{nft.price/10**18} ETH</th>
                                </tr>
                              }
                            </tbody>
                          </table><p></p>
                            {this.props.nftState[nft.id]
                              ? <button
                                  type="Success"
                                  className="btn btn-block"
                                  style={{border: '1px ridge #3d3737', color: "#3d3737", width: '200px'}}
                                  onClick={(e) => buyNft(this.props.dispatch, nft.id, nft.price)}
                                  disabled
                                >
                                  <b>S o l d</b>
                                </button>
                              : <button
                                  type="Success"
                                  className="btn btn-block btn-outline"
                                  style={{border: '1px ridge #FFFFFF', color: "#FFFFFF", width: '200px'}}
                                  onClick={(e) => buyNft(this.props.dispatch, nft.id, nft.price)}
                                >
                                  <b>B u y</b>
                                </button>
                            }&nbsp;
                          </div>
                      )
                    })}

                    </div>
                  </div>
                </main>
              </div>
            </div>
            <br></br>
            <footer>
            {this.props.contract
              ? <div style={{color: "#8B8B8B", fontSize: "14px"}}>
                  NFT deployed at:&nbsp;
                  <a
                    href={`https://${this.props.network}.etherscan.io/address/` + this.props.contract._address}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{color: "#FFFFFF"}}
                  >
                  {this.props.contract._address}
                  </a>
                </div>
              : <div> Wrong network </div>
            }
            </footer>
          </div>
        )
      } else {
      return(
        <Loading />
      )
    }
  }
}

function mapStateToProps(state) {
  const dataLoaded = metadataLoadedSelector(state) && nftStateLoadedSelector(state)
  return {
    metadata: metadataSelector(state),
    contract: contractSelector(state),
    nftState: nftStateSelector(state),
    network: networkSelector(state),
    dataLoaded
  }
}

export default connect(mapStateToProps)(Main)