import { getInitials, statusClass } from "@/lib/utils";

export interface AgentProfileProps {
  name: string | null;
  description: string | null;
  status: string | null;
}

export default function AgentProfile({ name, status }: AgentProfileProps) {
  return (
    <div className="agent-profile">
      <div className="agent-avatar">{getInitials(name ?? "")}</div>
      <div>
        <h1>{name}</h1>
        <span className={`status-badge ${statusClass(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
