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
import { Badge } from "@/components/ui/badge";
import { RiPaypalFill, RiVisaLine, RiMastercardFill } from "react-icons/ri";
import { FaStripe } from "react-icons/fa";

export function PaymentSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Currency & Localization</CardTitle>
          <CardDescription>
            Define how payments are handled and displayed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel>Default Currency</FieldLabel>
              <FieldContent>
                <Select defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR (€) - Euro</SelectItem>
                    <SelectItem value="GBP">GBP (£) - British Pound</SelectItem>
                    <SelectItem value="INR">INR (₹) - Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Tax Percentage (%)</FieldLabel>
              <FieldContent>
                <Input type="number" defaultValue="5" />
                <FieldDescription>
                  Applied to all featured job and plan purchases.
                </FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
          <CardDescription>
            Enable or disable payment methods for recruiters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="bg-[#635BFF] p-2 rounded-lg text-white">
                <FaStripe className="text-2xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Stripe</span>
                  <Badge variant="outline" className="text-[10px] h-4">
                    Recommended
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Accept credit cards, Apple Pay, and Google Pay.
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 border rounded bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="bg-[#003087] p-2 rounded-lg text-white">
                <RiPaypalFill className="text-2xl" />
              </div>
              <div>
                <span className="font-semibold">PayPal</span>
                <p className="text-xs text-muted-foreground">
                  Let users pay with their PayPal balance or cards.
                </p>
              </div>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 border rounded bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="bg-foreground p-2 rounded-lg text-background">
                <div className="flex gap-1 text-xl">
                  <RiVisaLine />
                  <RiMastercardFill />
                </div>
              </div>
              <div>
                <span className="font-semibold">
                  Offline Payment / Bank Transfer
                </span>
                <p className="text-xs text-muted-foreground">
                  Manual verification of bank transfers.
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Test Gateways</Button>
        <Button>Save Financial Settings</Button>
      </div>
    </div>
  );
}
