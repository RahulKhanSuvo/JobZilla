import Container from "@/components/common/Container";
import Stack from "@/components/common/Stack";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  PinIcon as Pinterest,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: <Phone className="size-8" />,
    title: "Call Us",
    detail: "123 456 7890",
  },
  {
    icon: <Mail className="size-8" />,
    title: "Email",
    detail: "hi.avitex@gmail.com",
  },
  {
    icon: <MapPin className="size-8" />,
    title: "Address",
    detail: "4140 Parker Rd. Allentown, New Mexico 31134",
  },
];

export default function ContactFormSection() {
  return (
    <section className="py-20">
      <Container className="max-w-7xl">
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-md border border-slate-100 dark:border-slate-800">
          {/* Left Side - Contact Info */}
          <div className="lg:w-1/3 bg-[#139a74] p-6 md:p-12 text-white flex flex-col justify-between">
            <Stack gap="xl">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="mt-1">{info.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{info.title}</h3>
                    <p className="text-emerald-50 opacity-90 text-lg leading-relaxed">
                      {info.detail}
                    </p>
                  </div>
                </div>
              ))}
            </Stack>

            <div className="flex gap-4 mt-12">
              {[Facebook, Linkedin, Twitter, Pinterest].map((Icon, idx) => (
                <button
                  key={idx}
                  className="size-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="size-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-2/3 bg-white dark:bg-slate-950 p-6 md:p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-emerald-500 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-emerald-500 outline-none transition-all"
              />
              <textarea
                placeholder="Your questions..."
                rows={6}
                className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-emerald-500 outline-none transition-all resize-none"
              />
              <Button className="bg-[#139a74] hover:bg-emerald-700 text-white rounded-md px-8 h-14 text-lg font-bold">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
