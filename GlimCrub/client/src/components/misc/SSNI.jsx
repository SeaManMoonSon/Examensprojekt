import { useState } from 'react';

function SSNInput() {
  const [ssn, setSSN] = useState('');

  const handleChange = (event) => {
    const inputSSN = event.target.value;
    const formattedSSN = inputSSN
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d{0,2})?(\d{0,2})?/, (_, p1, p2, p3) => {
        const parts = [p1, p2 || '', p3 || ''];
        return parts.filter(Boolean).join('-');
      });
    setSSN(formattedSSN);
  };

  return (
    <input
      type="text"
      name="ssn"
      value={ssn}
      placeholder="XXXX-XX-XX"
      maxLength="11"
      onChange={handleChange}
    />
  );
}

export default SSNInput;
