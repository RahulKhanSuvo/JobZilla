import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User, UserRole, UserStatus } from "../types";
import UserActions from "./UserActions";
import { format } from "date-fns";

interface UserTableProps {
  users: User[];
  onUpdateStatus: (id: string, status: UserStatus) => void;
  onUpdateRole: (id: string, role: UserRole) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({
  users,
  onUpdateStatus,
  onUpdateRole,
  onDelete,
}: UserTableProps) {
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-none">
            Admin
          </Badge>
        );
      case "recruiter":
        return (
          <Badge className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border-none">
            Recruiter
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-none">
            Candidate
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/30"
          >
            Active
          </Badge>
        );
      case "suspended":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900/30"
          >
            Suspended
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900/30"
          >
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded shadow-sm border-none overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[300px] font-semibold py-4">User</TableHead>
            <TableHead className="font-semibold py-4">Role</TableHead>
            <TableHead className="font-semibold py-4">Status</TableHead>
            <TableHead className="font-semibold py-4">Joined Date</TableHead>
            <TableHead className="text-right font-semibold py-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-slate-100 dark:border-slate-800">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {getRoleBadge(user.role)}
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(user.status)}
                </TableCell>
                <TableCell className="py-4 text-sm text-slate-500">
                  {format(new Date(user.joinedDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right py-4">
                  <UserActions
                    user={user}
                    onUpdateStatus={onUpdateStatus}
                    onUpdateRole={onUpdateRole}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
