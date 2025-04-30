import { trimAddress } from "@/lib/reusables"
import { Calendar, Clock, MapPin, X } from "lucide-react"
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button";
import { format } from "date-fns";

interface RegisterSheetProps {
    isOpen: boolean;
    onClose: () => void;
    eventDetails?: IEventDetails;
}


const RegisterSheet = ({isOpen, onClose, eventDetails}: RegisterSheetProps) => {
    // Format date for display
    const formatEventDate = () => {
        if (!eventDetails?.eventDate) return "Date TBA";
        const date = new Date(eventDetails.eventDate);
        return format(date, "MMMM dd, yyyy");
    }

    // Format time for display
    const formatEventTime = () => {
        if (!eventDetails?.eventTime) return "Time TBA";
        return format(new Date(eventDetails.eventDate), "h:mm a");
    }

    // Helper for month display
    const formatMonth = (dateStr: string) => {
        const date = new Date(dateStr);
        return format(date, "MMM");
    }

    // Helper for day display
    const formatDay = (dateStr: string) => {
        const date = new Date(dateStr);
        return format(date, "d");
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>

            <SheetContent side="right" className="bg-black text-white rounded-t-xl overflow-y-auto w-full sm:max-w-md md:max-w-lg lg:max-w-xl [&>button]:hidden pt-20">

                <div>
                    <SheetClose className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
                        <X className="h-5 w-5 text-gray-700" />
                    </SheetClose>
                </div>

                {/* Event Banner Image */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
                    <Image
                        src={"/moon-cake.jpg"}
                        alt={eventDetails?.eventName || "Event"}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Featured Tag */}
                <div className="mb-4 flex items-center gap-2">
                    <div className="bg-gray-800 p-2 rounded-md">
                        <MapPin size={16} />
                    </div>
                    <span className="text-sm">Featured in {eventDetails?.location?.city || "Lagos"}</span>
                </div>

                {/* Event Title */}
                <h1 className="text-3xl font-bold mb-4">{eventDetails?.eventName || "Event Name"}</h1>

                {/* Host Information */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs">H</span>
                    </div>
                    <p>
                        Hosted by{" "}
                        {eventDetails?.organizerAddress ? trimAddress(eventDetails.organizerAddress) : "Event Organizer"}
                    </p>
                </div>

                {/* Date and Time */}
                <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex flex-col items-center justify-center bg-gray-800 rounded-xl p-2 w-14 h-14">
                            <span className="text-xs uppercase">
                                {eventDetails?.eventDate ? formatMonth(eventDetails.eventDate) : "TBA"}
                            </span>
                            <span className="text-xl font-bold">{eventDetails?.eventDate ? formatDay(eventDetails.eventDate) : "--"}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <p className="font-medium">{formatEventDate()}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock size={16} className="text-gray-400" />
                                <p>{formatEventTime()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-gray-400" />
                    <div>
                        <p className="font-medium">{eventDetails?.location?.venue || "376 Herbert Macaulay Way"}</p>
                        <p className="text-gray-400">
                            {eventDetails?.location?.city || "Lagos"}, {eventDetails?.location?.state || "Lagos"}
                        </p>
                    </div>
                </div>

                {/* Registration Section */}
                <div className="bg-gray-900 p-4 mb-6 rounded-xl">
                    <h3 className="text-lg font-medium mb-2">Registration</h3>
                    <p className="text-gray-300 mb-4">Welcome! To join the event, please register below.</p>
                    <Button className="w-full bg-white text-black font-semibold py-3 rounded-2xl">Register</Button>
                </div>

                {/* About Event */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">About Event</h2>
                    <p className="text-gray-300">
                        {eventDetails?.eventDescription ||
                            "Join us for this exciting event! More details will be provided upon registration."}
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default RegisterSheet
