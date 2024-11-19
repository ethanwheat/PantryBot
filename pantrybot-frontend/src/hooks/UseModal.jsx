import { useState } from "react";

export default function useModal(initialData) {
  const [data, setData] = useState(initialData);
  const [show, setShow] = useState(false);

  const showModal = (data) => {
    setData(data);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return { data, show, showModal, hideModal };
}
