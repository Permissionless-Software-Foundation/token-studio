/* eslint-disable */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Content, Row, Col, Button, Inputs, Box } from "adminlte-2-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Helmet } from "react-helmet"
import "./create-token.css"

const { Text, Select } = Inputs
let _this

class CreateToken extends Component {
  constructor(props) {
    super(props)
    _this = this

    this.state = {
      name: '',
      ticker: '',
      documentURL: '',
      decimals: 0,
      initialQty: 1,
      mintBaton: null,
      errMsg: null,
      mspAddr: '',
      txid: '',
      inFetch: false,
      explorerURL: '',
      isLoaded: false

    }
  }

  render() {
    return (
      <>
        <Helmet>
          <script src="https://unpkg.com/slp-mutable-data" />
        </Helmet>

        {_this.props.walletInfo.mnemonic ? <Content >
          <Row className='token-form'>

            <Col xs={12} sm={6} >

              <Box className='hover-shadow border-none mt-2' loaded={!_this.state.inFetch}>
                <Row className='token-form'>
                  <Col xs={12} sm={6} className='text-center'>
                    <h1>
                      <FontAwesomeIcon
                        className='title-icon'
                        size='xs'
                        icon='plus-square'
                      />
                      <span>Create Token</span>
                    </h1>
                  </Col>
                  <Col xs={12}  >
                    <Text
                      id='name'
                      name='name'
                      value={_this.state.name}
                      placeholder={`Enter Token Name`}
                      label='Name'
                      labelPosition='above'
                      onChange={_this.handleUpdate}
                    />
                  </Col>
                  <Col xs={12} >
                    <Text
                      id='ticker'
                      name='ticker'
                      value={_this.state.ticker}
                      placeholder={`Enter Token Ticket`}
                      label='Ticker'
                      labelPosition='above'
                      onChange={_this.handleUpdate}
                    />
                  </Col>
                  <Col xs={12} >
                    <Text
                      id='documentURL'
                      name='documentURL'
                      value={_this.state.documentURL}
                      placeholder={`Enter Document URL`}
                      label='Document URL'
                      labelPosition='above'
                      onChange={_this.handleUpdate}
                    />
                  </Col>
                  <Col xs={12} >
                    <Text
                      id='mspAddr'
                      name='mspAddr'
                      value={_this.state.mspAddr}
                      placeholder={`Enter MSP Address`}
                      label='MSP Address'
                      labelPosition='above'
                      onChange={_this.handleUpdate}
                      buttonRight={
                        <Button
                          icon='fa-question'
                          onClick={_this.showMspInfo}
                        />
                      }
                    />
                  </Col>
                  <Col xs={12} >
                    <Select
                      id='decimals'
                      name='decimals'
                      value={_this.state.decimals}
                      placeholder={`EnterToken decimals`}
                      label='Decimals'
                      labelPosition='above'
                      onChange={_this.handleUpdate}
                      options={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                    />
                  </Col>
                  <Col xs={12} >
                    <Text
                      id='initialQty'
                      name='initialQty'
                      value={_this.state.initialQty}
                      placeholder={`Enter Quantity`}
                      label='Quantity'
                      labelPosition='above'
                      onChange={_this.handleUpdate}
                    />
                  </Col>
                  {_this.state.errMsg && !_this.state.txid && <Col sm={12} className='text-center'>
                    <p className='err-msg'>{_this.state.errMsg} </p>

                  </Col>}
                  {this.state.txid &&
                    <a target='_blank'
                      rel='noopener noreferrer'
                      href={`${_this.state.explorerURL}/${_this.state.txid}`}
                    >{_this.state.txid}</a>

                  }
                  {!_this.state.inFetch && <Col xs={12} className='text-center'>
                    <Button
                      text='Create'
                      type='primary'
                      className='create-token-btn'
                      onClick={
                        _this.handleCreate
                      }
                    />
                  </Col>}
                  {_this.state.inFetch && <Col xs={12} sm={6} >

                  </Col>}
                </Row>
              </Box>
            </Col>
          </Row>

        </Content> :
          <Content>
            <Box padding='true' className='container-nofound'>
              <Row>
                <Col xs={12}>
                  <em>You need to create or import a wallet first</em>
                </Col>
              </Row>
            </Box>
          </Content>}
      </>
    )
  }
  async componentDidMount() {
    _this.defineExplorer()

  }

  handleUpdate(event) {
    const value = event.target.value
    _this.setState({
      [event.target.name]: _this.validators(event.target.name, value),
    })
  }

  async handleCreate() {
    try {
      const SlpMutableData = typeof window !== 'undefined' ? window.SlpMutableData : null

      _this.setState({ inFetch: true, txid: '' })

      const { name, ticker, documentURL, decimals, initialQty, mspAddr } = _this.state
      console.log('msp address', mspAddr)
      _this.validateInputs()
      const tokenData = {
        name,
        ticker,
        documentUrl: documentURL,
        decimals,
        initialQty,
        mintBatonVout: null
      }


      const { privateKey } = _this.props.walletInfo
      const _SlpMutableData = SlpMutableData.SlpMutableData

      const bchjsOptions = _this.getBchjsOptions()
      const slpMutableData = new _SlpMutableData(bchjsOptions)
      //slpMutableData.bchjs = _this.props.bchWallet.bchjs

      const txid = await slpMutableData.create.createToken(
        privateKey,
        tokenData,
        mspAddr
      )

      console.log(`New token created with token ID: ${txid}`)
      _this.setState({
        inFetch: false,
        txid
      })

    } catch (error) {
      console.warn(error)
      _this.setState({
        errMsg: error.message || 'Unknown Error',
        inFetch: false
      })
    }
  }
  validateInputs() {
    try {
      const { name, ticker, documentURL, initialQty, mspAddr } = _this.state
      if (!name) {
        throw new Error('Token Name is required')
      }
      if (!ticker) {
        throw new Error('Token Ticker is required')
      }
      if (!documentURL) {
        throw new Error('Token DocumentURL is required')
      }
      if (!mspAddr) {
        throw new Error('MSP Address is required')
      }

      if (!mspAddr.match('bitcoincash:')) {
        throw new Error('MSP Address must be a bch address')
      }

      if (!initialQty) {
        throw new Error('Token Quantity is required')
      }
      return true
    } catch (error) {
      console.warn(error)
      throw error
    }
  }
  validators(key, value) {
    try {
      // Ticker Validator
      if (key === 'ticker') {
        if (value.length <= 10) {
          return value.toUpperCase()
        } else {
          return _this.state[key].toUpperCase()
        }
      }
      //Qty validator
      if (key === 'initialQty') {
        if (Number(value)) {
          return value
        } else {
          return _this.state[key]
        }
      }

      return value
    } catch (error) {
      console.warn(error)
    }
  }

  // Defines the explorer to use
  // depending on the selected chain
  defineExplorer() {
    const bchWalletLib = _this.props.bchWallet
    if (!bchWalletLib || !bchWalletLib.bchjs) return

    const bchjs = bchWalletLib.bchjs

    let explorerURL

    if (bchjs.restURL.includes('abc.fullstack')) {
      explorerURL = 'https://explorer.be.cash/tx'
    } else {
      explorerURL = 'https://explorer.bitcoin.com/bch/tx'
    }
    _this.setState({
      explorerURL
    })
  }
  getBchjsOptions() {
    try {
      const { walletInfo } = _this.props

      const _interface = walletInfo.interface

      const jwtToken = walletInfo.JWT
      const restURL = walletInfo.selectedServer
      const bchjsOptions = {}

      if (jwtToken) {
        bchjsOptions.apiToken = jwtToken
      }

      if (_interface === 'consumer-api') {
        bchjsOptions.interface = _interface
        bchjsOptions.restURL = restURL
        return bchjsOptions
      }


      if (restURL) {
        bchjsOptions.restURL = restURL
      }

      if (_interface === 'rest-api') {
        bchjsOptions.interface = _interface
      }

      // Assign the tx fee based on environment variable
      const FEE = process.env.FEE ? process.env.FEE : 1
      bchjsOptions.fee = FEE
      console.log(`Using ${bchjsOptions.fee} sats per byte for tx fees.`)

      return bchjsOptions
    } catch (error) {
      console.warn(error)
    }
  }
  showMspInfo(){
    try {
      window.open('https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md', '__blank')
    } catch (error) {
      console.warn(error)
    }
  }

}

CreateToken.propTypes = {
  walletInfo: PropTypes.object.isRequired,
  bchWallet: PropTypes.object,
}

export default CreateToken
