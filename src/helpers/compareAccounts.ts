import { AccountDto } from '../dto/AccountDto';

const compareAccounts = (a: AccountDto, b: AccountDto) => {
  const dateA = Date.parse(a.createdAt);
  const dateB = Date.parse(b.createdAt);

  return dateA > dateB ? 1 : -1;
};

export default compareAccounts;
