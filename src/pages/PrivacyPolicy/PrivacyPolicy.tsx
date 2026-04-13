import Container from "@/components/common/Container";
import Stack from "@/components/common/Stack";
import SectionTitle from "@/components/common/SectionTitle";
import Paragraph from "@/components/common/Paragraph";

export default function PrivacyPolicy() {
  const lastUpdated = "April 14, 2026";

  return (
    <>
      <title>Privacy Policy - JobZilla</title>
      <meta
        name="description"
        content="Learn how JobZilla collects, uses, and protects your personal information."
      />

      <div className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/20">
        <Container>
          <Stack gap="lg" className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 pb-12 mb-4 text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-100 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400">
                Legal
              </span>
              <SectionTitle size="xl" align="center" className="mb-4">
                Privacy Policy
              </SectionTitle>
              <Paragraph className="text-slate-500 dark:text-slate-400">
                Last Updated: {lastUpdated}
              </Paragraph>
            </header>

            {/* Content Body */}
            <div className="space-y-12">
              <section className="space-y-4">
                <SectionTitle size="md">1. Introduction</SectionTitle>
                <Paragraph>
                  At JobZilla, we respect your privacy and are committed to
                  protecting your personal data. This privacy policy will inform
                  you as to how we look after your personal data when you visit
                  our website and tell you about your privacy rights and how the
                  law protects you.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">2. The Data We Collect</SectionTitle>
                <Paragraph>
                  We may collect, use, store and transfer different kinds of
                  personal data about you which we have grouped together as
                  follows:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2 text-paragraph dark:text-slate-300">
                  <li>
                    <strong>Identity Data:</strong> includes first name, last
                    name, username or similar identifier.
                  </li>
                  <li>
                    <strong>Contact Data:</strong> includes email address and
                    telephone numbers.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> includes internet protocol
                    (IP) address, your login data, browser type and version,
                    time zone setting and location.
                  </li>
                  <li>
                    <strong>Profile Data:</strong> includes your username and
                    password, job interests, preferences, and feedback.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">3. How We Use Your Data</SectionTitle>
                <Paragraph>
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data in the following
                  circumstances:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2 text-paragraph dark:text-slate-300">
                  <li>To register you as a new user.</li>
                  <li>
                    To facilitate job applications and employer interactions.
                  </li>
                  <li>
                    To provide you with job alerts and personalized
                    recommendations.
                  </li>
                  <li>
                    To manage our relationship with you including notifying you
                    about changes to our terms.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">4. Data Security</SectionTitle>
                <Paragraph>
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorized way, altered or disclosed. In
                  addition, we limit access to your personal data to those
                  employees, agents, contractors and other third parties who
                  have a business need to know.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">5. Your Legal Rights</SectionTitle>
                <Paragraph>
                  Under certain circumstances, you have rights under data
                  protection laws in relation to your personal data, including
                  the right to request access, correction, erasure, restriction,
                  transfer, or to object to processing.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">6. Contact Us</SectionTitle>
                <Paragraph>
                  If you have any questions about this privacy policy or our
                  privacy practices, please contact us at:
                </Paragraph>
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Privacy Team
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Email: privacy@jobzilla.com
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Address: 123 Career Blvd, Suite 100, Innovation City
                  </p>
                </div>
              </section>
            </div>
          </Stack>
        </Container>
      </div>
    </>
  );
}
