import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function BasicInfo() {
  return (
    <div className=" p-6 bg-white dark:bg-slate-900 dark:text-gray-300 w-1/3 space-y-4">
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div className="">Career Finding</div>
        <h3 className="font-semibold dark:text-white">UI UX Designer</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Location</div>
        <h3 className="font-semibold dark:text-white">Dhaka</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Phone Number</div>
        <h3 className="font-semibold dark:text-white">+880123456789</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Email</div>
        <h3 className="font-semibold dark:text-white">rahul@gmail.com</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Gender</div>
        <h3 className="font-semibold dark:text-white">Male</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Age</div>
        <h3 className="font-semibold dark:text-white">25</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Qualification</div>
        <h3 className="font-semibold dark:text-white">Master</h3>
      </div>
      <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Experience</div>
        <h3 className="font-semibold dark:text-white">2 Year</h3>
      </div>
      {/* social links */}
      <div className="flex flex-col justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div>Social Links:</div>
        <div className="flex gap-2">
          <FaFacebook className="hover:text-primary cursor-pointer transition-colors" />
          <FaLinkedin className="hover:text-primary cursor-pointer transition-colors" />
          <FaTwitter className="hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
}
