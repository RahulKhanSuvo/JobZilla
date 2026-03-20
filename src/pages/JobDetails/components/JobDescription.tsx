export default function JobDescription() {
  return (
    <div className="space-y-12">
      {/* Description */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Full Job Description
        </h2>
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
          <p>
            At Jobszilla, we're building the future of remote work. We believe
            that talent is everywhere, but opportunity is not. Our platform
            connects world-class developers with top-tier companies, helping
            them build amazing products from anywhere in the world.
          </p>
          <p>
            We're looking for a Senior UI/UX Designer to join our design team.
            You'll be responsible for creating beautiful, intuitive, and
            effective user experiences for our web and mobile applications.
            You'll work closely with engineers and product managers to define
            the future of our platform.
          </p>
        </div>
      </section>

      {/* Responsibilities */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Responsibilities
        </h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 marker:text-emerald-600">
          <li>
            Design and prototype elegant user interfaces for web and mobile
            apps.
          </li>
          <li>
            Collaborate with cross-functional teams to define and implement
            innovative solutions.
          </li>
          <li>
            Create user personas, user journeys, and wireframes to inform design
            decisions.
          </li>
          <li>
            Conduct user research and usability testing to validate design
            concepts.
          </li>
          <li>
            Maintain and evolve our design system to ensure consistency across
            all products.
          </li>
        </ul>
      </section>

      {/* Qualifications */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Qualifications
        </h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 marker:text-emerald-600">
          <li>5+ years of experience in UI/UX design.</li>
          <li>
            A strong portfolio of work demonstrating your design process and
            problem-solving skills.
          </li>
          <li>
            Proficiency in design tools such as Figma, Sketch, or Adobe XD.
          </li>
          <li>
            Deep understanding of user-centered design principles and best
            practices.
          </li>
          <li>Excellent communication and collaboration skills.</li>
          <li>Experience with HTML, CSS, and React is a plus.</li>
        </ul>
      </section>

      {/* What we offer */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          What we offer
        </h2>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 marker:text-emerald-600">
          <li>Competitive salary and equity package.</li>
          <li>Flexible working hours and remote-first culture.</li>
          <li>Health, dental, and vision insurance.</li>
          <li>Generous paid time off and parental leave.</li>
          <li>Budget for professional development and training.</li>
        </ul>
      </section>

      {/* Our culture */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Our Culture
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          We pride ourselves on having a culture that is built on trust,
          transparency, and innovation. We believe that diversity is our
          strength and we are committed to building an inclusive environment for
          everyone.
        </p>
      </section>
    </div>
  );
}
