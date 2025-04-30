import { cn } from "@/lib/utils";
import { Clock2 } from "lucide-react";
import { IconLocation } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

export const EventItem = ({
  className,
  title,
  description,
  header,
  active,
  venue,
  publisher,
  time
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  active?: boolean;
  venue?: string;
  publisher?: string;
  time?: bigint;
}) => {
  // Format the time properly
  const formatEventTime = (timeValue: bigint | undefined) => {
    if (!timeValue) return "TBA";

    const dateObj = new Date(Number(timeValue) * 1000);

    // Fix for potential incorrect year issue - ensure it's 2025 or later
    if (dateObj.getFullYear() < 2025 || dateObj.getFullYear() > 3000) {
      // We're in 2025, so make sure all events have the correct year context
      dateObj.setFullYear(2025);
    }

    return format(dateObj, "MMM dd, yyyy h:mm a");
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-slate-950 dark:border-white/[0.2] hover:border-slate-600 justify-between flex flex-col space-y-6",
        className
      )}
    >
      {header}
      <div className="transition duration-200 space-y-2">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="inline-flex items-center gap-1.5 text-slate-400">
            <Clock2 size={17} />
            <p className="uppercase font-medium">{formatEventTime(time)}</p>
          </div>
          {active && (
            <Badge className="bg-[#d69712] bg-opacity-15 rounded text-yellow-300 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
              Live
            </Badge>
          )}
        </div>
        <h2 className="font-sans font-bold text-slate-200 text-2xl leading-6">
          {title}
        </h2>
        <p className="text-md font-medium text-slate-300">By <span className="font-bold text-green-300">{publisher}</span></p>
        <div className="inline-flex items-center gap-1.5 text-slate-400">
          <IconLocation size={17} />
          <p className="font-medium text-s">{venue}</p>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Badge className="bg-[#3cbd2c] bg-opacity-15 rounded text-green-300 inline-flex items-center gap-2">
            $10
          </Badge>
          + Gas
        </div>
        <p className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};