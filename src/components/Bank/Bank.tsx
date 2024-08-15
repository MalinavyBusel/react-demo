import './Bank.css';

export type BankDto = {
  id: string;
  name: string;
  entityCommission: number;
  individualCommission: number;
};

type BankInputProps = {
  bank: BankDto;
  onAccountCreate: () => void;
};

export function Bank({ bank, onAccountCreate }: BankInputProps) {
  const {
    id, name, entityCommission, individualCommission,
  } = bank;

  return (
    <tr className="bank-row">
      <td className="first-column-cell">{id}</td>
      <td>{name}</td>
      <td className="number-cell">{entityCommission}</td>
      <td className="number-cell">{individualCommission}</td>
      <td>
        <button className="account-for-bank-button" onClick={onAccountCreate}>New Account</button>
      </td>
    </tr>
  );
}
