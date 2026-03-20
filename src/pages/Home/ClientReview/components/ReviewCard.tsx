import { Star } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";

export interface Review {
  id: number;
  text: string;
  clientName: string;
  clientRole: string;
  clientAvatar: string;
  rating: number;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <CommonWrapper className="p-8 group w-full transition-all duration-500 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 relative hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400 font-medium   leading-relaxed text-lg italic">
          "{review.text}"
        </p>

        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full overflow-hidden border-2 border-slate-50 dark:border-slate-800 transition-transform duration-500 group-hover:scale-105">
            <img
              src={review.clientAvatar}
              alt={review.clientName}
              className="size-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-black text-slate-900 dark:text-white truncate">
              {review.clientName}
            </h4>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
                {review.clientRole}
              </p>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`size-3 ${
                      star <= review.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200 dark:text-slate-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
}
