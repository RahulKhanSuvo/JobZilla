import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";
import { FiMail, FiBell } from "react-icons/fi";

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiMail className="text-primary" /> Email Notifications
          </CardTitle>
          <CardDescription>
            Configure when the system should send emails.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field orientation="horizontal" className="justify-between">
            <div className="space-y-0.5">
              <FieldLabel>Welcome Emails</FieldLabel>
              <FieldDescription>
                Send a welcome email to newly registered users.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch defaultChecked />
            </FieldContent>
          </Field>

          <Field
            orientation="horizontal"
            className="justify-between border-t pt-6"
          >
            <div className="space-y-0.5">
              <FieldLabel>Job Application Alerts</FieldLabel>
              <FieldDescription>
                Notify recruiters when a candidate applies to their job.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch defaultChecked />
            </FieldContent>
          </Field>

          <Field
            orientation="horizontal"
            className="justify-between border-t pt-6"
          >
            <div className="space-y-0.5">
              <FieldLabel>Newsletter Subscription</FieldLabel>
              <FieldDescription>
                Allow users to subscribe to weekly job digests.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiBell className="text-primary" /> System & Push Notifications
          </CardTitle>
          <CardDescription>
            Manage real-time alerts in the application dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field orientation="horizontal" className="justify-between">
            <div className="space-y-0.5">
              <FieldLabel>Job Approval Alerts</FieldLabel>
              <FieldDescription>
                Notify recruiters when their job posting is approved.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch defaultChecked />
            </FieldContent>
          </Field>

          <Field
            orientation="horizontal"
            className="justify-between border-t pt-6"
          >
            <div className="flex items-center gap-4">
              <div className="space-y-0.5">
                <FieldLabel>Instant Browser Notifications</FieldLabel>
                <FieldDescription>
                  Use Web Push API for real-time browser alerts.
                </FieldDescription>
              </div>
            </div>
            <FieldContent>
              <Switch />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Email Templates</Button>
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}
