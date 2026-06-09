import Link from "next/link";

export interface LinkedTherapy {
  id: number;
  name: string | null;
  description: string | null;
  duration: number | null;
}

export interface TherapyListProps {
  therapies: LinkedTherapy[];
}

export default function TherapyList({ therapies }: TherapyListProps) {
  if (therapies.length === 0) {
    return <p>No therapies linked to this ailment yet.</p>;
  }

  return (
    <ul className="ailment-list">
      {therapies.map((therapy) => (
        <li key={therapy.id} className="ailment-item">
          <Link href={`/therapies/${therapy.id}`}>
            <h4>{therapy.name}</h4>
          </Link>
          {therapy.description && <p>{therapy.description}</p>}
          {therapy.duration !== null && (
            <p className="therapy-duration">{therapy.duration} min session</p>
          )}
        </li>
      ))}
    </ul>
  );
}
