import { Timeline, TimelineItem } from "../../../components/common/Timeline";

export default function Education() {
  return (
    <div className=" bg-white dark:bg-slate-900 border-gray-100 mt-4">
      <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        Education
      </h3>

      <Timeline>
        <TimelineItem
          title="Bachelor of Science in Computer Science"
          subtitle="University of Technology"
          date="2018 - 2022"
          description="Graduated with honors. Coursework included advanced algorithms, data structures, and web development."
        />
        <TimelineItem
          title="High School Diploma"
          subtitle="Springfield High School"
          date="2014 - 2018"
          description="Valedictorian. President of the Computer Science Club."
        />
      </Timeline>
    </div>
  );
}
