interface EmailTemplateProps {
  name: string;
  tickets: string;
  ticketCount: number;
}

export default function template({
  name,
  tickets,
  ticketCount,
}: EmailTemplateProps) {
  return (
    <div className="bg-['#e4e7ebf1']  text-centerwhite p-4 rounded-lg">
      <h1>Welcome, {name}!</h1>
      <p>{tickets}</p>
      <p>{ticketCount}</p>
    </div>
  );
}
