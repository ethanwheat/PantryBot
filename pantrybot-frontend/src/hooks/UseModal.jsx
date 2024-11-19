import { useEffect, useState } from "react";

export default function useModal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [onSubmitFn, setOnSubmitFn] = useState();

  // Show modal function.
  const showModal = ({ data, onSubmit }) => {
    setData(data);
    setOnSubmitFn(() => onSubmit);
    setShow(true);
  };

  // Hide modal function.
  const hideModal = () => {
    setShow(false);
  };

  // onSubmit function.
  const onSubmit = async (args) => {
    setError(false);
    setLoading(true);

    try {
      await onSubmitFn(args);
      hideModal();
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  // Reset modal when show is true.
  useEffect(() => {
    if (show) {
      setError(false);
      setLoading(false);
    }
  }, [show]);

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
