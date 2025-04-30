import { useState, useEffect } from "react";
import useFetchEvents from "./useAllEvents";

// Define the type for event details
type EventDetails = {
  eventName: string;
  eventDescription: string;
  eventVenue: string;
  startDate: bigint;
  totalTicketSold: bigint;
  organizerAddress: string;
} | null;

const useFetchEventDetails = (contractAddress: string | null) => {
  const [eventDetails, setEventDetails] = useState<EventDetails>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { events, loading: eventsLoading, fetchEvents } = useFetchEvents();

  useEffect(() => {
    // Call fetchEvents when the hook mounts
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (!eventsLoading && contractAddress) {
      const fetchEventDetails = async () => {
        try {
          // Find the event with matching address
          const matchingEvent = events.find(event => event.address.toLowerCase() === contractAddress.toLowerCase());
          
          if (matchingEvent) {
            setEventDetails({
              eventName: matchingEvent.name,
              eventDescription: matchingEvent.description,
              eventVenue: matchingEvent.eventVenue,
              startDate: matchingEvent.startDate,
              totalTicketSold: matchingEvent.totalTicketSold,
              organizerAddress: matchingEvent.organizerAddress
            });
            setError(null);
          } else {
            setEventDetails(null);
            setError(new Error("Event not found"));
          }
        } catch (err) {
          console.error("Error fetching event details:", err);
          setEventDetails(null);
          setError(
            err instanceof Error ? err : new Error("An unknown error occurred")
          );
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetails();
    } else if (!contractAddress) {
      setLoading(false);
      setEventDetails(null);
      setError(new Error("No contract address provided"));
    }
  }, [contractAddress, events, eventsLoading]);

  return { 
    loading: loading || eventsLoading, 
    eventDetails, 
    error 
  };
};

export default useFetchEventDetails;
