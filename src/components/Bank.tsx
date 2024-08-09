export type BankDto = {
  id: string;
  name: string;
  entityCommission: number;
  individualCommission: number;
};

type BankInputProps = {
  bank: BankDto | null;
};

export function Bank({ bank }: BankInputProps) {
  return (
    <div className="Bank">{bank ? JSON.stringify(bank) : false}</div>
  );
}
