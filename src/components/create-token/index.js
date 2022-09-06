/*
  Create a new SLP token with mutable data.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class CreateToken extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // Form inputs
      tokenName: '',
      tokenTicker: '',
      tokenUrl: '',
      tokenDecimals: '',
      tokenQty: '',
      tokenIcon: ''
    }
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
                <Form.Group controlId='formWif'>
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
                <Form.Group controlId='formWif'>
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
                <b>Decimals:</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='formWif'>
                  <Form.Control
                    type='text'
                    placeholder='0'
                    onChange={e => this.setState({ tokenDecimals: e.target.value })}
                    value={this.state.tokenDecimals}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                <b>Initial Quantity:</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='formWif'>
                  <Form.Control
                    type='text'
                    placeholder='1'
                    onChange={e => this.setState({ tokenQty: e.target.value })}
                    value={this.state.tokenQty}
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
                <Form.Group controlId='formWif'>
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
                <b>Icon URL (optional):</b>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='formWif'>
                  <Form.Control
                    type='text'
                    placeholder='1'
                    onChange={e => this.setState({ tokenIcon: e.target.value })}
                    value={this.state.tokenIcon}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>

          <Row>
            <Col>
              <Button variant='info'>Create Token</Button>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default CreateToken
