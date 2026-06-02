export interface Ailment {
  id: number;
  name: string | null;
  description: string | null;
}

export interface AilmentListProps {
  ailments: Ailment[];
}

export default function AilmentList({ ailments }: AilmentListProps) {
  if (ailments.length === 0) {
    return <p>No ailments on record.</p>;
  }

  return (
    <ul className="ailment-list">
      {ailments.map((ailment) => (
        <li key={ailment.id} className="ailment-item">
          <h4>{ailment.name}</h4>
          {ailment.description && <p>{ailment.description}</p>}
        </li>
      ))}
    </ul>
  );
}
