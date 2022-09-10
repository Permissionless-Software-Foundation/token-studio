/*
  Create a new SLP token with mutable data.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Pin, Write } from 'p2wdb/index.js'
import { SlpMutableData } from 'slp-mutable-data'

class CreateToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // Form inputs
      tokenName: '',
      tokenTicker: '',
      tokenUrl: '',
      tokenIcon: '',
      tokenMetadata: '',
      appData: props.appData
    }

    // Bind the 'this' object to the event handlers.
    this.handleCreateToken = this.handleCreateToken.bind(this)
  }

  render () {
    return (
      <>
        <Container>

          <Form>
            <Row>
              <Col>
                <b>Name:</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='My Token'
                    onChange={e => this.setState({ tokenName: e.target.value })}
                    value={this.state.tokenName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <b>Ticker:</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='TKN'
                    onChange={e => this.setState({ tokenTicker: e.target.value })}
                    value={this.state.tokenTicker}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <b>Icon URL (optional):</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='https://bafybeicvlcwv3flrwa4egmroyicvghevi6uzbd56drmoerjeguu4ikpnhe.ipfs.dweb.link/psf-logo.png'
                    onChange={e => this.setState({ tokenIcon: e.target.value })}
                    value={this.state.tokenIcon}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <b>Document URL (optional):</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='https://PSFoundation.cash'
                    onChange={e => this.setState({ tokenUrl: e.target.value })}
                    value={this.state.tokenUrl}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <b>Metadata (optional):</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type='text'
                    as='textarea'
                    placeholder='https://PSFoundation.cash'
                    onChange={e => this.setState({ tokenMetadata: e.target.value })}
                    value={this.state.tokenMetadata}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

          </Form>

          <Row>
            <Col>
              <Button variant='info' onClick={(e) => this.handleCreateToken(e)}>Create Token</Button>
            </Col>
          </Row>

          <br /><br />
          <Row>
            <Col>
              <h3>Instructions</h3>
              <p>
                This view is used to create a simple NFT and to manage its token
                icon. Fill out the form above to create your own NFT with a
                token icon. The new token will appear in the Tokens View.
                Once created, you can send the NFT to any address on the
                Bitcoin Cash blockchain.
              </p>
              <p>
                We recommend using{' '}
                <a href='https://nft.storage' target='_blank' rel='noreferrer'>
                  nft.storage
                </a> to host your token icons. That site will provide
                the Icon URL for your token icon.
              </p>
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  // This function is called when the user clicks the 'Create Token' button.
  async handleCreateToken (event) {
    console.log('hello world')

    // Validate input
    this.validateInputs()

    // Reinitilize the wallet UTXOs.
    const bchWallet = this.state.appData.bchWallet
    await bchWallet.initialize()
    console.log('Updating UTXOs')

    // Prepare to write data to the P2WDB
    const wif = bchWallet.walletInfo.privateKey
    const serverURL = 'http://localhost:5010'
    const write = new Write({ bchWallet, serverURL })

    // Upload immutable data to the P2WDB
    const immutableData = {
      issuer: 'Permissionless Software Foundation',
      website: 'http://psfoundation.cash',
      dateCreated: '2022-09-10'
    }
    const appId = 'token-data-001'
    const result3 = await write.postEntry(immutableData, appId)
    const zcid3 = result3.hash
    console.log('zcid3: ', zcid3)

    // Refresh the utxos in the wallet.
    await bchWallet.bchjs.Util.sleep(2000)
    await bchWallet.initialize()
    console.log('Updating UTXOs')

    // Ask the P2WDB to upload the JSON content to IPFS.
    const pin = new Pin({ bchWallet, serverURL })
    const cid3 = await pin.json(zcid3)
    const cid3Str = `ipfs://${cid3}`
    console.log('documentUrl: ', cid3Str)

    // Upload the MSP JSON to IPFS.
    const mspData = {
      tokenIcon: 'https://bafybeicvlcwv3flrwa4egmroyicvghevi6uzbd56drmoerjeguu4ikpnhe.ipfs.dweb.link/psf-logo.png',
      about: 'Demo token using this npm library: https://www.npmjs.com/package/slp-mutable-data'
    }
    // const appId = 'token-data-001'
    const result1 = await write.postEntry(mspData, appId)
    const zcid1 = result1.hash
    console.log('zcid1: ', zcid1)

    // Ask the P2WDB to upload the JSON content to IPFS.
    // const pin = new Pin({ bchWallet, serverURL })
    const cid1 = await pin.json(zcid1)
    console.log('msp CID: ', cid1)

    // Refresh the utxos in the wallet.
    await bchWallet.bchjs.Util.sleep(2000)
    await bchWallet.initialize()
    console.log('Updating UTXOs')

    // Pay the P2WDB to pin the CID.
    const result2 = await pin.cid(cid1)
    console.log('result2: ', result2)
    const zcid2 = result2.hash
    console.log('zcid2: ', zcid2)
    // cid1 is the MSP IPFS CID that should be used.

    // Generate a new address to use for the mutable data address (MDA).
    const keyPair = await this.getKeyPair()
    console.log(`keyPair: ${JSON.stringify(keyPair, null, 2)}`)

    // Refresh the utxos in the wallet.
    await bchWallet.bchjs.Util.sleep(2000)
    await bchWallet.initialize()
    console.log('Updating UTXOs')

    // Send a few sats to the MDA to pay for updates.
    const receivers = [{
      address: keyPair.cashAddress,
      amountSat: 10000
    }]
    const mdaChargeTxid = await bchWallet.send(receivers)
    console.log(`Sent 10,000 sats to MDA address. TXID: ${mdaChargeTxid}`)

    // Refresh the utxos in the wallet.
    await bchWallet.bchjs.Util.sleep(2000)
    await bchWallet.initialize()
    console.log('Updating UTXOs')

    // Write mutable data to the MDA
    const slpMutableData = new SlpMutableData({ wallet: bchWallet })
    const cidStr = `ipfs://${cid1}`
    console.log(`cidStr: ${cidStr}`)
    const hex = await slpMutableData.data.writeCIDToOpReturn(cidStr, keyPair.wif)
    const mdaWriteTxid = await bchWallet.ar.sendTx(hex)
    console.log(`CID written to MDA. TXID: ${mdaWriteTxid}`)

    // Collect token data that will be used to generate the token
    const tokenData = {
      name: this.state.tokenName,
      ticker: this.state.tokenTicker,
      documentUrl: cid3Str,
      decimals: 0,
      initialQty: 1,
      mintBatonVout: null
    }

    // Generate the token
    const genesisTxid = await slpMutableData.create.createToken(
      wif,
      tokenData,
      keyPair.cashAddress
    )
    console.log(`New token created with TXID: ${genesisTxid}`)
  }

  // Cycles through HD wallet to find a key pair that does not have a
  // transaction history.
  async getKeyPair () {
    try {
      // Get the next address from LocalStorage
      let nextAddress = this.state.appData.lsState.nextAddress

      // If nextAddress value isn't available, initilize it to 1.
      if (!nextAddress) nextAddress = 1
      console.log('nextAddress: ', nextAddress)

      let keyPair = {}
      let txHistory = ['a', 'b', 'c']

      console.log('Looking for keypair with no tx history...')

      // Search for a keypair that has no transaction history.
      do {
        console.log(`Trying HD index ${nextAddress}`)

        // Get a key pair from the wallet library.
        keyPair = await this.state.appData.wallet.getKeyPair(nextAddress)
        // console.log('keyPair: ', keyPair)

        // Get transaction history for this address.
        txHistory = await this.state.appData.wallet.getTransactions(keyPair.cashAddress)
        if (!txHistory) txHistory = []
        // console.log('txHistory: ', txHistory)

        nextAddress++
      } while (txHistory.length > 0)

      // Save the current index to LocalStorage
      await this.state.appData.setLSState({ nextAddress })
      this.state.appData.lsState.nextAddress = nextAddress

      return keyPair
    } catch (err) {
      console.error('Error in getKeyPair(): ', err)
    }
  }

  // Verify that the required inputs have been filled out.
  validateInputs () {
    try {
      const { tokenName, tokenTicker } = this.state

      if (!tokenName) {
        throw new Error('Token Name is required')
      }

      if (!tokenTicker) {
        throw new Error('Token Ticker is required')
      }

      return true
    } catch (error) {
      console.warn(error)
      throw error
    }
  }
}

export default CreateToken
