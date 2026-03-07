import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import SectionTitle from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";

export default function ProfileEdit() {
  return (
    <div className="space-y-6">
      <DashboardTitle>Profile Edit</DashboardTitle>
      <CommonWrapper className="p-7">
        {/* user photo*/}
        <div className="flex gap-4 pb-6 border-b ">
          <div className="size-28 border border-dashed"></div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-[14px]">Upload a new avator</h4>
              <p className="text-[12px]">JPG, PNG or GIF (max. 800x400px)</p>
            </div>
            <div>
              <Input className="border rounded-none" type="file" />
            </div>
          </div>
        </div>
        {/* usr info form */}
        <div>
          <form>
            <SectionTitle size={"sm"}>Information</SectionTitle>
          </form>
        </div>
      </CommonWrapper>
    </div>
  );
}
