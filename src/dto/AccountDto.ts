export type AccountDto = {
  id: string;
  bankId: string;
  currency: 'EUR' | 'USD' | 'RUB';
  amount: number;
  createdAt: string;
};
