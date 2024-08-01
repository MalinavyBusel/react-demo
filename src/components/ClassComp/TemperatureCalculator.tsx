import { useState } from 'react';
import InputHandler from './InputHandler';

export default function TemperatureCalculator() {
  const [value, setValue] = useState(0);
  const [units, setUnits] = useState('c');
  const celsius = units === 'c' ? value : value - 100;
  const fahrenheit = units === 'f' ? value : value + 100;

  const handleChange = (temperature: number, unitName: string) => {
    setValue(temperature);
    setUnits(unitName);
  };

  return (
    <>
      <InputHandler
        unitName="c"
        changeHandler={handleChange}
        temperature={celsius}
      />
      <InputHandler
        unitName="f"
        changeHandler={handleChange}
        temperature={fahrenheit}
      />
    </>
  );
}
