import { useState } from "react";

export default function useModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [onSubmit, setOnSubmit] = useState();

  const showModal = ({ data, onSubmit }) => {
    setData(data);
    setOnSubmit(() => onSubmit);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return {
    loading,
    error,
    show,
    data,
    onSubmit,
    showModal,
    hideModal,
    setLoading,
    setError,
  };
}
