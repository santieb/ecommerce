import { useState, useEffect } from 'react'

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  useEffect(() => {
      setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
      const { name, value } = target;
      setFormState({
          ...formState,
          [name]: value
      });
  };

  return {
      ...formState,
      formState,
      onInputChange
  };
};