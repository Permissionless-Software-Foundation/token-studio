/*
  Create a new SLP token with mutable data.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

function CreateToken (props) {
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
              <Form.Group controlId='formWif' style={{ textAlign: 'center' }}>
                <Form.Control
                  type='text'
                  placeholder='My Token'
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
              <Form.Group controlId='formWif' style={{ textAlign: 'center' }}>
                <Form.Control
                  type='text'
                  placeholder='TKN'
                />
              </Form.Group>
            </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <b>Document URL:</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='formWif' style={{ textAlign: 'center' }}>
                <Form.Control
                  type='text'
                  placeholder='https://PSFoundation.cash'
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
              <Form.Group controlId='formWif' style={{ textAlign: 'center' }}>
                <Form.Control
                  type='text'
                  placeholder='0'
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
              <Form.Group controlId='formWif' style={{ textAlign: 'center' }}>
                <Form.Control
                  type='text'
                  placeholder='1'
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

export default CreateToken
