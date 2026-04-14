import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";
import JobzillaLogo from "@/components/common/JobzillaLogo";

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>
            Manage your portal's logo, name, and basic identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-8 p-4 border rounded-lg bg-muted/30">
            <div className="shrink-0 bg-background p-4 rounded shadow-sm border">
              <JobzillaLogo className="w-32" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Portal Logo</h4>
              <p className="text-xs text-muted-foreground">
                Upload a high-resolution logo for your portal. Recommended size:
                512x512px.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Change Logo
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <Field>
            <FieldLabel>Portal Name</FieldLabel>
            <FieldContent>
              <Input
                placeholder="JobZilla"
                defaultValue="JobZilla Premium Board"
              />
              <FieldDescription>
                This name will appear in the page title and emails.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Tagline</FieldLabel>
            <FieldContent>
              <Input
                placeholder="Your career starts here"
                defaultValue="Find your dream job with ease"
              />
              <FieldDescription>
                Site tagline displayed on the landing page.
              </FieldDescription>
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            These details will be used for system emails and footer information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Support Email</FieldLabel>
              <FieldContent>
                <Input type="email" defaultValue="support@jobzilla.com" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Contact Phone</FieldLabel>
              <FieldContent>
                <Input type="tel" defaultValue="+1 (555) 000-0000" />
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldLabel>Office Address</FieldLabel>
            <FieldContent>
              <Textarea
                defaultValue="123 Job Seeker Lane, Career City, TX 75001, USA"
                className="min-h-[100px]"
              />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Discard Changes</Button>
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
