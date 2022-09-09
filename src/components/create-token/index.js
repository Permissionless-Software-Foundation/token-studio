/*
  Create a new SLP token with mutable data.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Pin, Write } from 'p2wdb/index.js'

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

    // Prepare to write data to the P2WDB
    const wif = bchWallet.walletInfo.privateKey
    const serverURL = 'http://localhost:5010'
    const write = new Write({ bchWallet, serverURL })

    // Upload the MSP JSON to IPFS.
    const mspData = {
      tokenIcon: "https://bafybeicvlcwv3flrwa4egmroyicvghevi6uzbd56drmoerjeguu4ikpnhe.ipfs.dweb.link/psf-logo.png",
      about: "Demo token using this npm library: https://www.npmjs.com/package/slp-mutable-data"
    }
    const appId = 'token-data-001'
    const result1 = await write.postEntry(mspData, appId)
    const zcid1 = result1.hash
    console.log('zcid1: ', zcid1)

    // Ask the P2WDB to upload the JSON content to IPFS.
    const pin = new Pin({ bchWallet, serverURL })
    const cid1 = await pin.json(zcid1)
    console.log('msp CID: ', cid1)

    // Refresh the utxos in the wallet.
    await bchWallet.bchjs.Util.sleep(2000)
    await bchWallet.initialize()

    // Pay the P2WDB to the CID.
    const result2 = await pin.cid(cid1)
    console.log('result2: ', result2)
    const zcid2 = result2.hash
    console.log('zcid2: ', zcid2)
    // cid1 is the MSP IPFS CID that should be used.

    /*
      ToDo:
       - p2wdb Write needs to return the same data structure weather it's paid
       in BCH or in PSF tokens.
       - This web app needs a way to generate a new key pair and save the index
       to LocalStorage.
       - The slp-mutable-data library can be used to generate a new token.
    */
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
