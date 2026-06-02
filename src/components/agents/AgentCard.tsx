import Link from "next/link";
import { getInitials, statusClass } from "@/lib/utils";

export interface AgentCardProps {
  id: number;
  name: string | null;
  description: string | null;
  status: string | null;
}

export default function AgentCard({ id, name, description, status }: AgentCardProps) {
  return (
    <Link href={`/agents/${id}`} className="agent-card">
      <div className="agent-card-header">
        <div className="agent-avatar">{getInitials(name ?? "")}</div>
        <div>
          <h3 className="agent-name">{name}</h3>
          <span className={`status-badge ${statusClass(status)}`}>
            {status}
          </span>
        </div>
      </div>
      {description && <p className="agent-description">{description}</p>}
    </Link>
  );
}
