import React from 'react';

type InputProps = {
  temperature: number;
  changeHandler: (temperature: number, unitName: string) => void;
  unitName: string;
};
export default function InputHandler({
  temperature,
  changeHandler,
  unitName,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(parseFloat(e.target!.value), unitName);
  };

  return (
    <form>
      <label htmlFor={unitName}>{unitName}</label>
      <input
        id={unitName}
        type="text"
        value={temperature}
        onChange={handleChange}
      />
    </form>
  );
}
