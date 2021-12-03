import ReactTypingEffect from 'react-typing-effect';
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Loading extends Component {
  render() {
    return(
      <div className="loading text-center centered" style={{ color: "#ffffff" }}>
	      <br></br>
	      <br></br>
	      <br></br>
        <ReactTypingEffect
          text={[
            "please connec to rinkeby network"
          ]}
          speed='100'
          eraseSpeed='100'
          eraseDelay='1000000000'
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
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Loading)