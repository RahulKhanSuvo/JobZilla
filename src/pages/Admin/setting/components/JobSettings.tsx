import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function JobSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Moderation</CardTitle>
          <CardDescription>
            Control how jobs are published on your portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field orientation="horizontal" className="justify-between">
            <div className="space-y-0.5">
              <FieldLabel>Auto-Approve Jobs</FieldLabel>
              <FieldDescription>
                Jobs posted by verified recruiters will be public immediately.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch defaultChecked />
            </FieldContent>
          </Field>

          <Field
            orientation="horizontal"
            className="justify-between border-t pt-4"
          >
            <div className="space-y-0.5">
              <FieldLabel>Employer Verification Required</FieldLabel>
              <FieldDescription>
                Employers must be verified before posting any jobs.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch defaultChecked />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default Configurations</CardTitle>
          <CardDescription>
            Set default values for job postings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel>Default Job Expiry (Days)</FieldLabel>
              <FieldContent>
                <Input type="number" defaultValue="30" />
                <FieldDescription>
                  How many days a job stays active by default.
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Max Applicants per Job</FieldLabel>
              <FieldContent>
                <Input type="number" defaultValue="500" />
                <FieldDescription>
                  Limit the number of applications per posting.
                </FieldDescription>
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldLabel>Job Category Layout</FieldLabel>
            <FieldContent>
              <Select defaultValue="grid">
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid View</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                  <SelectItem value="compact">Compact View</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Strategy</CardTitle>
          <CardDescription>
            Configure costs for premium features.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel>Featured Job Price ($)</FieldLabel>
              <FieldContent>
                <Input type="number" defaultValue="49" />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Urgent Badge Price ($)</FieldLabel>
              <FieldContent>
                <Input type="number" defaultValue="19" />
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Update Job Config</Button>
      </div>
    </div>
  );
}
