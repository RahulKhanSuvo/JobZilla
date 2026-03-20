import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    id: 1,
    name: "Joe Stevenson",
    avatar: "https://ui-avatars.com/api/?name=Joe+Stevenson&background=random",
    date: "Aug 15, 2023",
    rating: 5,
    comment:
      "I've been working with Jobszilla for over a year now and they have always been great to work with. They are very professional and always pay on time.",
    verified: true,
  },
  {
    id: 2,
    name: "Antony Besson",
    avatar: "https://ui-avatars.com/api/?name=Antony+Besson&background=random",
    date: "Aug 12, 2023",
    rating: 4,
    comment:
      "Jobszilla has been a great partner for our business. They have helped us find some of our best talent and have been a joy to work with.",
    verified: true,
  },
  {
    id: 3,
    name: "Ivan Padillon",
    avatar: "https://ui-avatars.com/api/?name=Ivan+Padillon&background=random",
    date: "Aug 10, 2023",
    rating: 5,
    comment:
      "I can't say enough good things about Jobszilla. They have been instrumental in helping me grow my career and find the perfect job for me.",
    verified: true,
  },
];

export default function ReviewsSection() {
  return (
    <div className="space-y-10">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[160px]">
          <span className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
            4.8
          </span>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4 fill-emerald-500 text-emerald-500",
                  i === 4 &&
                    "fill-emerald-200 text-emerald-200 dark:fill-emerald-900 dark:text-emerald-900",
                )}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-500">
            120 Ratings
          </span>
        </div>

        <div className="flex-1 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-8">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  {star}
                </span>
                <Star className="size-3 fill-slate-300 text-slate-300" />
              </div>
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${star === 5 ? 85 : star === 4 ? 12 : star === 3 ? 2 : 1}%`,
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-400 w-8">
                {star === 5 ? "85%" : star === 4 ? "12%" : "2%"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Reviews
        </h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {reviews.map((review) => (
            <div key={review.id} className="py-8 first:pt-0 last:pb-0">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="size-12 rounded-full border-2 border-slate-100 dark:border-slate-800"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <CheckCircle2 className="size-4 text-emerald-500 fill-emerald-50" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-3",
                          i < review.rating
                            ? "fill-emerald-500 text-emerald-500"
                            : "text-slate-200",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
