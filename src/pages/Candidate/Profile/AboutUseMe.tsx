import Education from "./Education";

export default function AboutUseMe() {
  return (
    <div className=" bg-white dark:bg-slate-900 p-6 rounded w-2/3">
      <h3 className="font-semibold text-xl mb-4 dark:text-white">About Me</h3>
      <p className="text-[#64666c] dark:text-gray-300 mb-4">
        Hi, I'm a passionate UI/UX designer with a strong background in creating
        engaging and user-friendly interfaces. With a keen eye for detail and a
        commitment to delivering exceptional results, I bring innovative design
        solutions to life. Let's connect and explore how we can create something
        amazing together!
      </p>
      <p className="text-[#64666c] dark:text-gray-300">
        Deloitte's Green Dot Agency is looking to add a Lead User Experience
        Designer to our experience design team. We want a passionate creative
        who's inspired by new trends and emerging technologies, and is able to
        integrate them into memorable user experiences. A problem solver who is
        entrepreneurial, collaborative, hungry, and humble; can deliver
        beautifully designed, leading-edge experiences under tight deadlines;
        and who has demonstrated proven expertise.
      </p>
      <Education />
    </div>
  );
}
