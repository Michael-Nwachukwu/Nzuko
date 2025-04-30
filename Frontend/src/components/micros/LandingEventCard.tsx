import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const LandingEventCard = ({
  title,
  organizer,
  eventDetails,
  handleSheetOpen
}: {
  title: string;
  organizer: string;
  address: string;
  eventDetails: IEventDetails;
  handleSheetOpen: (eventDetails: IEventDetails) => void;
}) => {
  return (
    <>
      <div className="md:2/3 relative aspect-[3/3] w-[90%] shrink-0 snap-start snap-always rounded-3xl sm:w-[44%] md:w-[30%]">
        <div className="rounded-3xl h-full">
          <div className="h-full relative">
            <Image
              src="/flow-bubble.webp"
              alt="logo"
              width={50}
              height={0}
              className="objectfill h-full rounded-3xl w-full"
            />

            <div className="p-4 sm:p-6 flex flex-col justify-between items-start h-full w-full absolute bg-stone-600/40 rounded-3xl top-0 left-0 text-stone-800">
              <p className="text-3xl sm:tex-5xl font-semibold">{title}</p>

              <div className="flex flex-row items-start sm:items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <p className="text-md font-semibold">Hosted By</p>
                  <p className="text-md font-semibold">
                    {organizer.slice(0, 6)}...{organizer.slice(-4)}
                  </p>
                </div>
                <Button
                  className="rounded-full hover:border border-solid border-white/[.145] transition-colors flex items-center justify-center bg-stone-800 text-stone-200 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                  onClick={() => handleSheetOpen(eventDetails)}
                >
                  View Event Details
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingEventCard;
