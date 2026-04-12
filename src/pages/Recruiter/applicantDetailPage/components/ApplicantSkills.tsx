import type { Skill } from "@/types/application";

interface Props {
  skills?: Skill[];
}

export default function ApplicantSkills({ skills }: Props) {
  if (!skills?.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.id}
            className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          >
            {s.skill}
          </span>
        ))}
      </div>
    </section>
  );
}
