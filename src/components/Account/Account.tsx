export type AccDto = {
  id: string;
  bankId: string;
  currency: 'EUR' | 'USD' | 'RUB';
  amount: number;
};

type AccountInputProps = {
  account: AccDto;
  onDelete: () => void;
};

export function Account({ account, onDelete }: AccountInputProps) {
  return (
    <div className="account">
      { JSON.stringify(account) }
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
