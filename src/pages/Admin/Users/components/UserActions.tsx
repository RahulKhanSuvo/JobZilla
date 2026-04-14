import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ShieldCheck,
  UserCog,
  UserMinus,
  UserPlus,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import type { User, UserRole, UserStatus } from "../types";

interface UserActionsProps {
  user: User;
  onUpdateStatus: (id: string, status: UserStatus) => void;
  onUpdateRole: (id: string, role: UserRole) => void;
  onDelete: (id: string) => void;
}

export default function UserActions({
  user,
  onUpdateStatus,
  onUpdateRole,
  onDelete,
}: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Status Actions */}
        {user.status !== "active" && (
          <DropdownMenuItem onClick={() => onUpdateStatus(user.id, "active")}>
            <UserPlus className="mr-2 h-4 w-4 text-green-600" />
            <span>Activate Account</span>
          </DropdownMenuItem>
        )}
        {user.status === "active" && (
          <DropdownMenuItem
            onClick={() => onUpdateStatus(user.id, "suspended")}
          >
            <UserMinus className="mr-2 h-4 w-4 text-orange-600" />
            <span>Suspend Account</span>
          </DropdownMenuItem>
        )}
        {user.status === "pending" && (
          <DropdownMenuItem onClick={() => onUpdateStatus(user.id, "active")}>
            <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
            <span>Verify User</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Role Actions */}
        <DropdownMenuLabel className="text-[10px] font-bold uppercase text-muted-foreground px-2 py-1">
          Change Role
        </DropdownMenuLabel>
        {user.role !== "admin" && (
          <DropdownMenuItem onClick={() => onUpdateRole(user.id, "admin")}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Make Admin</span>
          </DropdownMenuItem>
        )}
        {user.role !== "recruiter" && (
          <DropdownMenuItem onClick={() => onUpdateRole(user.id, "recruiter")}>
            <UserCog className="mr-2 h-4 w-4" />
            <span>Make Recruiter</span>
          </DropdownMenuItem>
        )}
        {user.role !== "candidate" && (
          <DropdownMenuItem onClick={() => onUpdateRole(user.id, "candidate")}>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Make Candidate</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* Delete Action */}
        <DropdownMenuItem
          onClick={() => onDelete(user.id)}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete User</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
