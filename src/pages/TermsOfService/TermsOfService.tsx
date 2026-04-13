import Container from "@/components/common/Container";
import Stack from "@/components/common/Stack";
import SectionTitle from "@/components/common/SectionTitle";
import Paragraph from "@/components/common/Paragraph";

export default function TermsOfService() {
  const lastUpdated = "April 14, 2026";

  return (
    <>
      <title>Terms of Service - JobZilla</title>
      <meta
        name="description"
        content="Read our terms of service to understand your rights and responsibilities when using JobZilla."
      />

      <div className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-900/20">
        <Container>
          <Stack gap="lg" className="">
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 pb-12 mb-4 text-center">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-100 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400">
                Agreement
              </span>
              <SectionTitle size="lg" align="center" className="mb-4">
                Terms of Service
              </SectionTitle>
              <Paragraph className="text-slate-500 dark:text-slate-400">
                Last Updated: {lastUpdated}
              </Paragraph>
            </header>

            {/* Content Body */}
            <div className="space-y-12">
              <section className="space-y-4">
                <SectionTitle size="md">1. Acceptance of Terms</SectionTitle>
                <Paragraph>
                  By accessing or using the JobZilla platform, you agree to be
                  bound by these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this site.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">2. Use License</SectionTitle>
                <Paragraph>
                  Permission is granted to temporarily download one copy of the
                  materials on JobZilla's website for personal, non-commercial
                  transitory viewing only. This is the grant of a license, not a
                  transfer of title, and under this license you may not:
                </Paragraph>
                <ul className="list-disc pl-6 space-y-2 text-paragraph dark:text-slate-300">
                  <li>Modify or copy the materials.</li>
                  <li>
                    Use the materials for any commercial purpose, or for any
                    public display.
                  </li>
                  <li>
                    Attempt to decompile or reverse engineer any software
                    contained on JobZilla's website.
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">3. User Accounts</SectionTitle>
                <Paragraph>
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. Failure to do so constitutes a breach of the Terms,
                  which may result in immediate termination of your account on
                  our Service.
                </Paragraph>
                <Paragraph>
                  You are responsible for safeguarding the password that you use
                  to access the Service and for any activities or actions under
                  your password.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">
                  4. Job Postings and Applications
                </SectionTitle>
                <Paragraph>
                  JobZilla is a platform connecting employers and candidates. We
                  do not guarantee the validity of any job posting or the
                  suitability of any candidate. Employers are responsible for
                  their postings, and candidates are responsible for their
                  applications.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">
                  5. Limitation of Liability
                </SectionTitle>
                <Paragraph>
                  In no event shall JobZilla or its suppliers be liable for any
                  damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption) arising out
                  of the use or inability to use the materials on JobZilla's
                  website.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">6. Governing Law</SectionTitle>
                <Paragraph>
                  These terms and conditions are governed by and construed in
                  accordance with the laws of the jurisdiction in which JobZilla
                  operates and you irrevocably submit to the exclusive
                  jurisdiction of the courts in that State or location.
                </Paragraph>
              </section>

              <section className="space-y-4">
                <SectionTitle size="md">7. Changes to Terms</SectionTitle>
                <Paragraph>
                  JobZilla reserves the right, at its sole discretion, to modify
                  or replace these Terms at any time. By continuing to access or
                  use our Service after those revisions become effective, you
                  agree to be bound by the revised terms.
                </Paragraph>
              </section>
            </div>
          </Stack>
        </Container>
      </div>
    </>
  );
}
