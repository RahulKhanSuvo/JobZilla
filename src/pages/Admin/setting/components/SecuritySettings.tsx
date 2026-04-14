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
import { FiLock, FiShield, FiSmartphone } from "react-icons/fi";

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiLock className="text-primary" /> Password Management
          </CardTitle>
          <CardDescription>
            Ensure your account is protected with a strong password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel>Current Password</FieldLabel>
            <FieldContent>
              <Input type="password" placeholder="********" />
            </FieldContent>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <FieldContent>
                <Input type="password" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input type="password" />
              </FieldContent>
            </Field>
          </div>
          <Button size="sm" className="w-fit">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiShield className="text-primary" /> Authentication Security
          </CardTitle>
          <CardDescription>
            Add extra layers of security to your admin account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field orientation="horizontal" className="justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-full">
                <FiSmartphone className="text-xl" />
              </div>
              <div className="space-y-0.5">
                <FieldLabel>Two-Factor Authentication (2FA)</FieldLabel>
                <FieldDescription>
                  Protect your account with an extra security layer.
                </FieldDescription>
              </div>
            </div>
            <FieldContent>
              <Switch />
            </FieldContent>
          </Field>

          <Field
            orientation="horizontal"
            className="justify-between border-t pt-6"
          >
            <div className="space-y-0.5">
              <FieldLabel>Force Password Reset</FieldLabel>
              <FieldDescription>
                Force all staff and recruiters to change passwords every 90
                days.
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
              <FieldLabel>IP Whitelisting</FieldLabel>
              <FieldDescription>
                Restrict admin dashboard access to specific IP addresses.
              </FieldDescription>
            </div>
            <FieldContent>
              <Switch />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Security Log</Button>
        <Button>Save Security Policy</Button>
      </div>
    </div>
  );
}
