import { Button } from "@/components/ui/button";
import profileBanner from "@assets/logo/profile-icon-png-898.png";
import { Link } from "react-router";

export default function InfoHeader() {
  return (
    <div className="flex bg-white p-6 rounded items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="size-32 rounded-2xl border"
          src={profileBanner}
          alt=""
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h5 className="text-primary font-medium text-sm ">
              Grapics Designer
            </h5>
            <h3 className="text-xl font-semibold">Rahul Khan</h3>
          </div>
          <div className="flex items-center gap-2">
            {["React", "Node", "Express", "MongoDB"].map((item, i) => (
              <span
                key={i}
                className="text-sm bg-[#F1F1F1] px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link to={"edit"}>
        <Button
          className="rounded w-[185px] h-[48px] border-primary"
          variant="outline"
        >
          Edit Profile
        </Button>
      </Link>
    </div>
  );
}
