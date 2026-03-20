import { Timeline, TimelineItem } from "@/components/common/Timeline";

export default function WorkExperience() {
  return (
    <div className=" bg-white dark:bg-slate-900 border-gray-100 mt-4">
      <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        Work Experience
      </h3>
      <Timeline>
        <TimelineItem
          title="Senior UI/UX Designer"
          subtitle="Tech Solutions Ltd"
          date="2022 - Present"
          description="Led the design of multiple high-traffic web applications, improving user engagement by 30%."
        />
        <TimelineItem
          title="Junior Graphic Designer"
          subtitle="Creative Agency"
          date="2020 - 2022"
          description="Created visual concepts for marketing campaigns and digital media."
        />
      </Timeline>
    </div>
  );
}
