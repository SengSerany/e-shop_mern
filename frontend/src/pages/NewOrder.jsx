import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Collapse, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createNewOrders } from '../features/order/orderSlice';

function NewOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, adresses, orderSuccess } = useSelector(
    (state) => state.order
  );
  const { user } = useSelector((state) => state.auth);
  const { productsInCart } = useSelector((state) => state.cart);

  const initAdressInfos = {
    firstName: '',
    lastName: '',
    adressName: '',
    streetNb: '',
    streetName: '',
    zipcode: '',
    city: '',
  };

  let updateAdressInfos;

  const [newAdressFormDisplay, setNewAdressFormDisplay] = useState(false);
  const [selectedAdressDisplay, setSelectedAdressDisplay] = useState(false);
  const [whichAdressField, setWhichAdressField] = useState('');
  const [infosSelectedAdress, setInfosSelectedAdress] =
    useState(initAdressInfos);
  const [newAdressFormData, setNewAdressFormData] = useState(initAdressInfos);
  const {
    adressName,
    firstName,
    lastName,
    streetNb,
    streetName,
    zipcode,
    city,
  } = newAdressFormData;

  const handleChangeSelect = (e) => {
    const selectedOptionsNb = e.target.options.selectedIndex;
    const optionValue = e.target.options[selectedOptionsNb].value;
    const selectAdress = adresses.find(
      (selectedAdress) => selectedAdress.name === optionValue
    );
    if (whichAdressField === '' || whichAdressField === 'new') {
      setWhichAdressField('old');
    }
    if (selectAdress) {
      if (newAdressFormDisplay) {
        setNewAdressFormDisplay(false);
      }
      setSelectedAdressDisplay(true);
      updateAdressInfos = selectAdress;
      setInfosSelectedAdress(updateAdressInfos);
    } else {
      if (selectedAdressDisplay) {
        setSelectedAdressDisplay(false);
        setInfosSelectedAdress(initAdressInfos);
      }
    }
  };

  const handleCollapseNewAdress = () => {
    if (newAdressFormDisplay) {
      setNewAdressFormDisplay(false);
    } else if (!newAdressFormDisplay) {
      if (selectedAdressDisplay) {
        setSelectedAdressDisplay(false);
        setInfosSelectedAdress(initAdressInfos);
        document.querySelector('select').options.selectedIndex = 0;
      }

      if (whichAdressField === '' || whichAdressField === 'old') {
        setWhichAdressField('new');
      }

      setNewAdressFormDisplay(true);
    }
  };

  const handleChange = (e) => {
    setNewAdressFormData((prevAdressData) => {
      const { name, value } = e.target;
      return {
        ...prevAdressData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (whichAdressField === '') {
      return toast.error('You must choose and complete an adress method');
    }

    let submitInfos;
    const productsIDArray = productsInCart.map((productIdArray) => {
      return productIdArray.product;
    });
    const nameAdress = adressName !== '' ? adressName : 'none';

    if (whichAdressField === 'old') {
      submitInfos = {
        adress: {
          user: user.id,
          ...infosSelectedAdress,
        },
        products: productsIDArray,
      };
    } else if (whichAdressField === 'new') {
      if (
        adressName === '' ||
        firstName === '' ||
        lastName === '' ||
        streetNb === '' ||
        streetName === '' ||
        zipcode === '' ||
        city === ''
      ) {
        return toast.error('You must complete all the fields');
      }
      submitInfos = {
        adress: {
          user: user.id,
          name: nameAdress,
          ...newAdressFormData,
        },
        products: productsIDArray,
      };
    }

    dispatch(createNewOrders(submitInfos));
  };

  useEffect(() => {
    if (user.id === null) {
      navigate('/login');
    }

    if (orderSuccess) {
      navigate(`/orders/${orders[orders.length - 1]._id}/validate`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, orderSuccess]);

  const log = () => {
    console.log(whichAdressField);
  };

  return (
    <div>
      <Button onClick={log}>bb</Button>
      <h1 className="h1 text-center">Confirm order</h1>
      <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <h2>Adress</h2>
            <br />
            <Form.Label>Select your adress or create a new one</Form.Label>
            <Row>
              <Col>
                <Form.Select
                  aria-label="adress-name"
                  onChange={handleChangeSelect}
                >
                  <option> Choose an already used adress</option>
                  {adresses.map((getAdress) => {
                    return (
                      <option
                        key={`option-${getAdress._id}`}
                        value={getAdress.name}
                      >
                        {getAdress.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col sm="auto">
                <p className="no-margin">or</p>
              </Col>
              <Col sm="auto">
                <Button
                  onClick={handleCollapseNewAdress}
                  aria-controls="adress-collapse"
                  aria-expanded={newAdressFormDisplay}
                  variant="dark"
                >
                  Use an other adress
                </Button>
              </Col>
            </Row>
            <br />
            <Collapse in={newAdressFormDisplay}>
              <div id="new-adress-form">
                <br />
                <h3> {'>'} New adress</h3>
                <br />
                <Form.Group className="mb-3" controlId="adressName">
                  <Form.Label>Adress name</Form.Label>
                  <Form.Control
                    type="text"
                    name="adressName"
                    value={adressName}
                    placeholder="Exemple: 'home', 'work', 'parent's house', ect. "
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="firstName">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={firstName}
                        placeholder="Enter first name"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={lastName}
                        placeholder="Enter last name"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Form.Group className="mb-3" controlId="streetNb">
                      <Form.Label>Street nb</Form.Label>
                      <Form.Control
                        type="number"
                        name="streetNb"
                        value={streetNb}
                        placeholder="Nb"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="streetName">
                      <Form.Label>Street name</Form.Label>
                      <Form.Control
                        type="text"
                        name="streetName"
                        value={streetName}
                        placeholder="Enter street name"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="zipcode">
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control
                        type="number"
                        name="zipcode"
                        value={zipcode}
                        placeholder="Enter zipcode"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={city}
                        placeholder="Enter city"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Collapse>
            <Button
              onClick={() => setSelectedAdressDisplay(!selectedAdressDisplay)}
              aria-controls="selectedAdressDisplay"
              aria-expanded={selectedAdressDisplay}
              className="d-none"
            >
              click
            </Button>
            <Collapse in={selectedAdressDisplay}>
              <div id="selected-adress">
                <br />
                <Container>
                  <h3> {'>'} Selected adress</h3>
                  <Container>
                    <p>
                      {infosSelectedAdress.firstName}{' '}
                      {infosSelectedAdress.lastName}
                      <br />
                      {infosSelectedAdress.streetNb}{' '}
                      {infosSelectedAdress.streetName}
                      <br />
                      {infosSelectedAdress.zipcode} {infosSelectedAdress.city}
                    </p>
                    <br />
                  </Container>
                </Container>
              </div>
            </Collapse>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewOrder;
