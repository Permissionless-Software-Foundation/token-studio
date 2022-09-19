/*
  Create a new SLP token with mutable data.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button, OverlayTrigger, Popover } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
// import { Pin, Write } from 'p2wdb/index.js'
import { SlpMutableData } from 'slp-mutable-data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

// Local libraries
import RefreshTokenBalance from '../slp-tokens/refresh-tokens.js'
import WaitingModal from '../waiting-modal'

// let _this

class CreateToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appData: props.appData,

      // Form inputs
      tokenName: '',
      tokenTicker: '',
      tokenUrl: '',
      tokenIcon: '',
      tokenMetadata: '',
      fullSizedUrl: '',
      xtraImmutable: '',
      xtraMutable: '',
      nsfw: false,

      // Waiting Dialog Modal
      hideModal: true, // Should the modal be visible?
      modalBody: [], // Strings displayed in the modal
      hideSpinner: false, // Spinner gif in modal
      shouldRefreshTokens: false // Should the token balance be updated when the modal is closed?
    }

    // Bind the 'this' object to the event handlers.
    this.handleCreateToken = this.handleCreateToken.bind(this)
    this.refreshTokens = this.refreshTokens.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)

    // Create a reference to the Refresh button.
    this.refreshTokenButtonRef = React.createRef()

    // _this = this
  }

  // componentDidMount () {
  //   setInterval(function () {
  //     const nsfw = _this.state.nsfw
  //     console.log('nsfw: ', nsfw)
  //   }, 1000)
  // }

  render () {
    const nsfwPopover = (
      <Popover id='popover-basic'>
        <Popover.Header as='h3'>Not Safe For Work (NSFW)</Popover.Header>
        <Popover.Body>
          NSFW stands for 'Not Safe For Work'. If the image in your NFT contains
          sex, violence, drugs, or other topics not typcially safe for a work
          environment, please check the box.
        </Popover.Body>
      </Popover>
    )

    return (
      <>
        <Container>

          <Row>
            <Col style={{ textAlign: 'right' }}>
              <a href='https://youtu.be/r25a_BuKxXQ' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
              </a>
            </Col>
          </Row>

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
            <Row>
              <Col>
                <i>Token icons should be 512 pixels wide.</i>
              </Col>
            </Row>
            <br />

            <Row>
              <Col xs={3} lg={1}>
                <Form.Check
                  type='checkbox'
                  label='NSFW'
                  checked={this.state.nsfw}
                  onChange={e => this.setState({ nsfw: e.target.checked })}
                />
              </Col>
              <Col xs={2}>
                <OverlayTrigger trigger='click' placement='top' overlay={nsfwPopover}>
                  <FontAwesomeIcon icon={faCircleQuestion} size='lg' />
                </OverlayTrigger>
              </Col>
            </Row>
            <br />

            <Accordion>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Advanced</Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row>
                      <Col>
                        <b>Full-Sized Image URL (optional):</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type='text'
                            placeholder='https://bafybeicvlcwv3flrwa4egmroyicvghevi6uzbd56drmoerjeguu4ikpnhe.ipfs.dweb.link/psf-logo.png'
                            onChange={e => this.setState({ fullSizedUrl: e.target.value })}
                            value={this.state.fullSizedUrl}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Col>
                        <b>Extra Immutable Data (optional):</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type='text'
                            as='textarea'
                            placeholder='https://PSFoundation.cash'
                            onChange={e => this.setState({ xtraImmutable: e.target.value })}
                            value={this.state.xtraImmutable}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Col>
                        <b>Extra Mutable Data (optional):</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type='text'
                            as='textarea'
                            placeholder='https://PSFoundation.cash'
                            onChange={e => this.setState({ xtraMutable: e.target.value })}
                            value={this.state.xtraMutable}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <br />
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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

        <RefreshTokenBalance appData={this.state.appData} hideButton ref={this.refreshTokenButtonRef} />

        {
          this.state.hideModal
            ? null
            : <WaitingModal heading='Creating NFT' body={this.state.modalBody} hideSpinner={this.state.hideSpinner} closeFunc={this.onCloseModal} />
        }

      </>
    )
  }

  // This function is called when the user clicks the 'Create Token' button.
  async handleCreateToken (event) {
    try {
      console.log('Starting NFT creation.')

      // Initialize modal
      const dialogText = []
      let statusStr = 'Starting NFT creation.'
      this.setState({
        hideModal: false,
        hideSpinner: false,
        modalBody: dialogText
      })

      // Validate input
      this.validateInputs()

      statusStr = 'Updating UTXOs'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Reinitilize the wallet UTXOs.
      const bchWallet = this.state.appData.bchWallet
      await bchWallet.initialize()

      // Instantiate the slp-mutable-data library
      const slpMutableData = new SlpMutableData({ wallet: bchWallet })

      statusStr = 'Uploading immutable data to the P2WDB and IPFS'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Upload immutable data to the P2WDB and generate an IPFS CID
      const now = new Date()
      const immutableData = {
        issuer: 'http://psfoundation.cash',
        website: 'https://nft-creator.fullstack.cash',
        dateCreated: now.toLocaleString(),
        userData: this.state.xtraImmutable
      }
      let cidImmutable = await slpMutableData.data.createTokenData(immutableData)
      cidImmutable = `ipfs://${cidImmutable}`

      statusStr = 'Uploading mutable data to the P2WDB and IPFS'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Upload the Mutable data JSON for the MSP to IPFS.
      const mutableData = {
        tokenIcon: this.state.tokenIcon,
        fullSizedUrl: this.state.fullSizedUrl,
        about: 'This NFT was created using the PSF Token Studio at https://nft-creator.fullstack.cash',
        userData: this.state.xtraMutable,
        nsfw: this.state.nsfw
      }
      let cidMutable = await slpMutableData.data.createTokenData(mutableData)
      cidMutable = `ipfs://${cidMutable}`

      const wif = bchWallet.walletInfo.privateKey

      // Generate a new address to use for the mutable data address (MDA).
      const keyPair = await this.getKeyPair()
      console.log(`keyPair: ${JSON.stringify(keyPair, null, 2)}`)

      statusStr = 'Updating UTXOs'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Refresh the utxos in the wallet.
      await bchWallet.bchjs.Util.sleep(2000)
      await bchWallet.initialize()

      statusStr = 'Funding Mutable Data Address (MDA)'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Send a few sats to the MDA to pay for updates.
      const receivers = [{
        address: keyPair.cashAddress,
        amountSat: 6000
      }]
      const mdaChargeTxid = await bchWallet.send(receivers)
      console.log(`Sent 6,000 sats to MDA address. TXID: ${mdaChargeTxid}`)

      statusStr = 'Updating UTXOs'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Refresh the utxos in the wallet.
      await bchWallet.bchjs.Util.sleep(2000)
      await bchWallet.initialize()

      statusStr = 'Creating Token'
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText })

      // Write mutable data to the MDA
      const hex = await slpMutableData.data.writeCIDToOpReturn(cidMutable, keyPair.wif)
      const mdaWriteTxid = await bchWallet.ar.sendTx(hex)
      console.log(`CID written to MDA. TXID: ${mdaWriteTxid}`)

      // Collect token data that will be used to generate the token
      const tokenData = {
        name: this.state.tokenName,
        ticker: this.state.tokenTicker,
        documentUrl: cidImmutable,
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

      statusStr = 'Token Created! Token ID:'
      console.log(statusStr)
      dialogText.push(statusStr)

      statusStr = (<a href={`https://token.fullstack.cash/?tokenid=${genesisTxid}`} target='_blank' rel='noreferrer'>{genesisTxid}</a>)
      console.log(statusStr)
      dialogText.push(statusStr)
      this.setState({ modalBody: dialogText, hideSpinner: true })

      // Clear the form on successful token creation.
      this.setState({
        tokenName: '',
        tokenTicker: '',
        tokenUrl: '',
        tokenIcon: '',
        tokenMetadata: '',
        fullSizedUrl: '',
        xtraImmutable: '',
        xtraMutable: '',

        // Refresh token balance on closing of the modal
        shouldRefreshTokens: true
      })
    } catch (err) {
      console.log('Error trying to create NFT: ', err)
      this.setState({
        hideSpinner: true,
        modalBody: ['Error creating NFT!', err.message]
      })
    }
  }

  onCloseModal () {
    const shouldRefreshTokens = this.state.shouldRefreshTokens

    this.setState({ hideModal: true })

    if (shouldRefreshTokens) {
      this.refreshTokens()
    }
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

  // This function is triggered when the token balance needs to be refreshed
  // from the blockchain.
  // This needs to happen after create a new token, to reflect the changed
  // token balance within the wallet app.
  // This function triggers the on-click function within the refresh-tokens.js button.
  async refreshTokens () {
    try {
      const appData = await this.refreshTokenButtonRef.current.handleRefreshBalance()

      this.setState({ appData })
    } catch (err) {
    /* exit quietly */
    }
  }
}

export default CreateToken
