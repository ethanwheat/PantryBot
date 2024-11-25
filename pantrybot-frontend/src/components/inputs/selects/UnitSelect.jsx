import { Form } from "react-bootstrap";

export default function UnitSelect({ label, error, ...otherProps }) {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select isInvalid={error ? true : false} {...otherProps}>
        <option value="unit(s)">Unit(s)</option>
        <option value="kg">Kilograms (kg)</option>
        <option value="lb">Pounds (lb)</option>
        <option value="oz">Ounces (oz)</option>
        <option value="g">Grams (g)</option>
        <option value="l">Liters (l)</option>
        <option value="ml">Milliliters (ml)</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    </>
  );
}
