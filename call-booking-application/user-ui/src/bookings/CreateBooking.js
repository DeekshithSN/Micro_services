import axios from '../services';
import React, { useEffect, useRef, useState } from 'react';
import MainScreen from '../layouts/MainScreen';
import { Form, Button, Modal, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { BookIcon } from '../svgs';
import { CONTACT_EMAIL, PAYMENT_NUMBER } from '../config';
import { isPossibleNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { addBooking } from '../services/booking';
import { useMetrics } from '@cabify/prom-react';

function CreateBooking() {
  const { observe } = useMetrics();

  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    email: '',
    phonenumber: '',
    location: '',
    servicetype: 'Career Consulting'
  })
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState([null, null]);
  const [showModal, setShowModal] = useState(false)
  const [phoneMessage, setPhoneMessage] = useState('')

  const fileRef = useRef('')

  const [showSuccess, setShowSuccess] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    observe('bookings_event', { custom_tag: 'booking_event' }, 1);
    if (!isPossibleNumber(bookingInfo.phonenumber) || !isValidPhoneNumber(bookingInfo.phonenumber)) {
      setPhoneMessage('Enter valid Number.')
      return;
    }
    setShowModal(true)
  };



  const createBooking = async () => {
    console.log('Booking')
    setShowModal(false)
    setLoading(true);
    let formData = new FormData()
    const { name, email, phonenumber, location, servicetype, ip } = bookingInfo
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phonenumber', phonenumber)
    formData.append('servicetype', servicetype)
    formData.append('location', location)
    formData.append('ip', ip)
    formData.append('image', pic[0])
  
    addBooking(formData)
      .then(() => {
        setLoading(false);
        setShowSuccess(true)
        setBookingInfo({
          ...bookingInfo,
          name: '',
          email: '',
          phonenumber: '',
          servicetype: 'Career Consulting',
        })
        setPic([null, null])
        fileRef.current.value = ''
        setTimeout(() => {
          setShowSuccess(false)
        }, 10000);
      }).catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
        setTimeout(() => {
          setError('')
        }, 10000);
      })

  
  }


  const getLocation = () => {
    axios.get('http://ip-api.com/json')
      .then((data) => {
        setBookingInfo({ ...bookingInfo, location: data.data.city + ', ' + data.data.regionName + ', ' + data.data.countryCode, ip: data.data.query })
      });
  }

  const postDetails = (pics) => {
    let reader = new FileReader()
    reader.onloadend = () => {
      setPic([pics, reader.result])
    }
    reader.readAsDataURL(pics)
  };

  useEffect(() => {
    getLocation()
  }, [])


  return (
    <MainScreen title="Book Your Slot">
      <Row className='justify-content-center px-2'>
        <Col md={8} xs={12} className="position-relative">
          {

            showSuccess && <Alert variant="success">
              <Alert.Heading><BookIcon className="mx-2" style={{ width: 15 }} />Booked..</Alert.Heading>
              <p>
                Your booking is confirmed. Somebody from the team contact you soon.
              </p>
            </Alert>
          }
          <Card className='shadow p-4'>
            <Card.Body>
              <div className='loginContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form className='row' onSubmit={(e) => submitHandler(e)}>
                  <Form.Group className='mb-2 col-9' controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      required={true}
                      value={bookingInfo.name}
                      placeholder="Enter name"
                      onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mb-2 col-6' controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      required={true}
                      value={bookingInfo.email}
                      placeholder="Enter email"
                      onChange={(e) => setBookingInfo({ ...bookingInfo, email: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group className='mb-2 col-6' controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      required={true}
                      defaultCountry='US'
                      className='px-2 form-control'
                      numberInputProps={{ className: 'border-0', style: { 'outline': 'none' } }}
                      placeholder="Enter phone number"
                      value={bookingInfo.phonenumber}
                      onChange={(val) => {
                        setBookingInfo({ ...bookingInfo, phonenumber: val })
                        setPhoneMessage('')
                      }} />
                    <Form.Text className='text-danger'>{phoneMessage}</Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-2 col-6' controlId="service">
                    <Form.Label>Service Type</Form.Label>
                    <Form.Control as="select"
                      type="select"
                      required={true}
                      value={bookingInfo.servicetype}
                      onChange={e => {
                        setBookingInfo({ ...bookingInfo, servicetype: e.target.value });
                      }}
                    >
                      <option>Career Consulting</option>
                      <option>Mock Interview</option>
                      <option>Devops Consulting</option>
                      <option disabled>Job support will not ne entertained</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Payment can be done via Phonepe, G-Pay to {PAYMENT_NUMBER}.<br />
                      Through PayPal send it to DeekshithSN
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className='col-6'>
                    <Form.Label>Cost</Form.Label>
                    <Card>
                      <Card.Body className='bg-light'>
                        <div>Career Consulting ( 1hour ) - $8 / ₹500</div>
                        <div>Mock Interview ( 1hour ) -  $8 / ₹500</div>
                        <div>Devops Consulting ( 1hour ) - $8 / ₹500</div>
                      </Card.Body>
                    </Card>
                  </Form.Group>
                  <Form.Group className='mb-2 col-9' controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      disabled={true}
                      type="text"
                      value={bookingInfo.location}
                      placeholder="Enter your location"
                    />
                  </Form.Group>
                  <Form.Group className='mb-2 col-9' controlId="formFile">
                    <Form.Label>Upload Payment Screenshot</Form.Label>
                    <Form.Control accept='image/png,image/jpeg' required={true} type="file"
                      onChange={(e) => postDetails(e.target.files[0])} ref={fileRef}
                      label="Upload Payment Screenshot"
                    />
                  </Form.Group>
                  <div className='d-flex align-items-center justify-content-center mt-2'>
                    {loading && <Loading className="mt-1 px-2" size={20} />}
                    <Button variant="primary" type="submit" className='w-50'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>

        </Col>
      </Row>
      <div className='text-center py-2'>
        For any further queries contact <a style={{ textDecoration: 'none' }} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or 7975977658
      </div>
      <Modal show={showModal} onHide={setShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              <div className="py-2 text-right text-secondary">Name: </div>
              <div className="py-2 text-right text-secondary">Email: </div>
              <div className="py-2 text-right text-secondary">Phone: </div>
              <div className="py-2 text-right text-secondary">Service: </div>
              <div className="py-2 text-right text-secondary">Location: </div>
              <div className="py-2 text-right text-secondary">Payment Screenshot: </div>
            </Col>
            <Col md={7}>
              <div className="py-2">{bookingInfo.name}</div>
              <div className="py-2">{bookingInfo.email}</div>
              <div className="py-2">{bookingInfo.phonenumber}</div>
              <div className="py-2">{bookingInfo.servicetype}</div>
              <div className="py-2">{bookingInfo.location}</div>
              <div className="py-2"><img src={pic[1]} alt='Payment Screenshot' width={250} /></div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className='px-4' variant="secondary" onClick={() => setShowModal(false)}>
            Edit
          </Button>
          <Button className='px-4' variant="primary" onClick={() => createBooking()}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </MainScreen>
  )
}

export default CreateBooking;
