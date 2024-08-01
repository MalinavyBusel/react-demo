type InputProps = {
  accounts: { id: string }[];
};

export default function Accounts({ accounts }: InputProps) {
  return (
    <>
      <b>There is something about your profile</b>
      <ul>
        {accounts!.map((account) => (
          <li key={account.id}>{JSON.stringify(account)}</li>
        ))}
      </ul>
    </>
  );
}
