import Link from "next/link";

export interface AilmentCardProps {
  id: number;
  name: string | null;
  description: string | null;
  agentName: string | null;
}

export default function AilmentCard({
  id,
  name,
  description,
  agentName,
}: AilmentCardProps) {
  return (
    <Link href={`/ailments/${id}`} className="ailment-card">
      <div className="ailment-card-header">
        <h3 className="ailment-name">{name}</h3>
        {agentName ? (
          <span className="ailment-agent-badge">1 patient: {agentName}</span>
        ) : (
          <span className="ailment-agent-badge ailment-agent-badge-empty">
            Unassigned
          </span>
        )}
      </div>
      {description && <p className="ailment-description">{description}</p>}
    </Link>
  );
}
