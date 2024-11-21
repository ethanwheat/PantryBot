import { Form } from "react-bootstrap";

export default function UnitSelect({ label, error, ...otherProps }) {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Select isInvalid={error ? true : false} {...otherProps}>
        <option value="units">Units</option>
        <option value="kg">kg</option>
        <option value="lb">lb</option>
        <option value="oz">oz</option>
        <option value="g">g</option>
        <option value="l">l</option>
        <option value="ml">ml</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    </>
  );
}
