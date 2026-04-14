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
  BadgeCheck,
  BadgeX,
  Building,
  Ban,
  Trash2,
  ExternalLink,
  Star,
  StarOff,
} from "lucide-react";
import type { Company, CompanyStatus } from "../types";

interface CompanyActionsProps {
  company: Company;
  onUpdateStatus: (id: string, status: CompanyStatus) => void;
  onToggleVerification: (id: string, isVerified: boolean) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onDelete: (id: string) => void;
}

export default function CompanyActions({
  company,
  onUpdateStatus,
  onToggleVerification,
  onToggleFeatured,
  onDelete,
}: CompanyActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Company Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Verification Controls */}
        <DropdownMenuItem
          onClick={() => onToggleVerification(company.id, !company.isVerified)}
        >
          {company.isVerified ? (
            <>
              <BadgeX className="mr-2 h-4 w-4 text-orange-600" />
              <span>Unverify Company</span>
            </>
          ) : (
            <>
              <BadgeCheck className="mr-2 h-4 w-4 text-blue-600" />
              <span>Verify Company</span>
            </>
          )}
        </DropdownMenuItem>

        {/* Visibility/Promotional */}
        <DropdownMenuItem
          onClick={() => onToggleFeatured(company.id, !company.isFeatured)}
        >
          {company.isFeatured ? (
            <>
              <StarOff className="mr-2 h-4 w-4 text-amber-600" />
              <span>Remove from Featured</span>
            </>
          ) : (
            <>
              <Star className="mr-2 h-4 w-4 text-amber-600" />
              <span>Mark as Featured</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Status Controls */}
        {company.status === "suspended" ? (
          <DropdownMenuItem
            onClick={() => onUpdateStatus(company.id, "active")}
          >
            <Building className="mr-2 h-4 w-4 text-green-600" />
            <span>Activate Account</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onUpdateStatus(company.id, "suspended")}
          >
            <Ban className="mr-2 h-4 w-4 text-red-600" />
            <span>Suspend Account</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* View Link */}
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View Public Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete Action */}
        <DropdownMenuItem
          onClick={() => onDelete(company.id)}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete Company</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
