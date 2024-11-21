import React, { useState } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Search, Plus } from 'react-bootstrap-icons';
import ThemedSpinner from "../../components/spinners/ThemedSpinner";

export default function Recipes() {
   // State to track which container is shown (0 or 1)
  const [currentContainer, setCurrentContainer] = useState(0);

  const handleNext = () => {
    setCurrentContainer(1); // Switch to the second container
  };

  const handlePrevious = () => {
    setCurrentContainer(0); // Switch to the first container
  };

  const [rangeValue, setRangeValue] = useState(1); // Default value set to 1

  const handleRangeChange = (e) => {
    setRangeValue(Number(e.target.value)); // Update state with the new value
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="border-end">
          {currentContainer === 0 && (
          <>
            <h2>AI Recipe Search <Search /></h2>

            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>What kind of Recipe can I help you find?</Form.Label>
                <Form.Control as="textarea" style={{ resize: 'none' }} rows={3} />
              </Form.Group>
              <Row>
                <Col className="d-flex flex-column">
                  <p>Use...</p>
                  <Form.Check
                    type="radio"
                    name="group1"
                    id="any-switch"
                    label="Any Items"
                    defaultChecked
                  />
                  <Form.Check
                    type="radio"
                    name="group1"
                    id="pantry-switch"
                    label="Only Pantry Items"
                  />
                </Col>
                <Col className="d-flex flex-column">
                  <p>Profile Options</p>
                  <Form.Check
                    id="diet-switch"
                    label="Consider Dietary Preferences"
                    defaultChecked
                  />
                  <Form.Check
                    id="allergy-switch"
                    label="Consider Allergies"
                    defaultChecked
                  />
                </Col>
                <Col className="d-flex flex-column">
                  <p>What's your budget?</p>
                  <Form.Range
                    min={0}
                    max={2}
                    step={1}
                    value={rangeValue}
                    onChange={handleRangeChange}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <span>$&nbsp;&nbsp;</span>
                    <span>&nbsp;$$</span>
                    <span>$$$</span>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button onClick={handleNext} variant="primary">
                  Search
                </Button>
              </div>
            </Form>
          </>
          )}

          {currentContainer === 1 && (
          <>
            <h2>AI Recipe Search <Search /></h2>
            <Button onClick={handlePrevious} variant="secondary">
              Create new Query
            </Button>
            <ThemedSpinner size="lg"/>
          </>
          )}
        </Col>

        <Col md={4}>
          <div className="d-flex justify-content-between">
            <h2>Saved Recipes</h2>
            <Button variant="primary"><Plus size={24}/></Button> 
          </div>
          <hr style={{ margin: '20px 0' }} />
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg">
              Example Recipe 1
            </Button>
            <Button variant="primary" size="lg">
              Example Recipe 2
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
