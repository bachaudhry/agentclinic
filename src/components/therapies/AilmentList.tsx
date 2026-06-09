import Link from "next/link";

export interface LinkedAilment {
  id: number;
  name: string | null;
  description: string | null;
}

export interface TherapyAilmentListProps {
  ailments: LinkedAilment[];
}

export default function TherapyAilmentList({
  ailments,
}: TherapyAilmentListProps) {
  if (ailments.length === 0) {
    return <p>No ailments currently treated with this therapy.</p>;
  }

  return (
    <ul className="ailment-list">
      {ailments.map((ailment) => (
        <li key={ailment.id} className="ailment-item">
          <Link href={`/ailments/${ailment.id}`}>
            <h4>{ailment.name}</h4>
          </Link>
          {ailment.description && <p>{ailment.description}</p>}
        </li>
      ))}
    </ul>
  );
}
