/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { EventItem } from "../micros/EventCard";
import useFetchEvents, { IEventDetails as IContractEvent } from "@/hooks/useAllEvents";
import { format } from "date-fns";
import { trimAddress } from "@/lib/reusables";
import RegisterSheet from "./RegisterSheet";

interface IEventDetails {
  address: `0x${string}`;
  eventName: string;
  eventDescription: string;
  eventImage: string;
  organizerAddress: string;
  eventVenue: string;
  eventDate: string;
  eventTime: string;
  location?: {
    venue: string;
    city: string;
    state: string;
  };
  totalTicketAvailable: number;
  totalTicketSold: bigint;
  totalRevenue: bigint;
}

const Skeleton = () => (
  <div className="flex w-40 justify-end items-end h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export function Events() {
  const { events, loading, fetchEvents } = useFetchEvents();
  const [filteredEvents, setFilteredEvents] = useState<Record<string, IContractEvent[]>>({});
  const [selectedEvent, setSelectedEvent] = useState<IEventDetails | undefined>(undefined);

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleSheetOpen = (eventDetails: IContractEvent): void => {
    const transformedEvent = {
      address: eventDetails.address,
      eventName: eventDetails.name,
      eventDescription: eventDetails.description,
      eventImage: eventDetails.image,
      organizerAddress: eventDetails.organizerAddress,
      eventVenue: eventDetails.eventVenue,
      eventDate: new Date(Number(eventDetails.startDate)).toISOString(),
      eventTime: new Date(Number(eventDetails.startDate)).toLocaleTimeString(),
      totalTicketAvailable: eventDetails.totalTicketAvailable,
      totalTicketSold: eventDetails.totalTicketSold,
      totalRevenue: eventDetails.totalRevenue
    };
    setSelectedEvent(transformedEvent);
    setIsSheetOpen(true);
  };

  const handleSheetClose = (): void => {
    setIsSheetOpen(false);
    setTimeout(() => {
      setSelectedEvent(undefined);
    }, 300);
  };

  // Helper function to format event date consistently
  const formatEventDateTime = (timestamp: bigint) => {
    // Convert bigint to number safely and ensure it's in milliseconds
    const timestampNum = Number(timestamp);
    // Check if timestamp is already in milliseconds (13 digits) or seconds (10 digits)
    const timestampMs = timestampNum.toString().length > 10 ? timestampNum : timestampNum * 1000;
    const date = new Date(timestampMs);
    
    console.log('Original timestamp:', timestamp.toString());
    console.log('Converted date:', date.toISOString());
    
    return {
      date: format(date, "MMMM dd, yyyy"),
      time: format(date, "h:mm a"),
      isoString: date.toISOString()
    };
  };

  // Helper function to group events by date
  const groupEventsByDate = (events: IContractEvent[]) => {
    // Sort events by startDate (earliest first)
    const sortedEvents = events.sort(
      (a, b) => Number(a.startDate) - Number(b.startDate)
    );

    // Group sorted events by their formatted startDate
    return sortedEvents.reduce((acc: any, event) => {
      const { date } = formatEventDateTime(event.startDate);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  };

  // Filter for events that are happening today or in the future
  const filterUpcomingEvents = (events: IContractEvent[]) => {
    const currentTime = new Date();
    const currentDay = new Date(currentTime);
    currentDay.setHours(0, 0, 0, 0);

    return events.filter((event) => {
      const timestampNum = Number(event.startDate);
      const timestampMs = timestampNum.toString().length > 10 ? timestampNum : timestampNum * 1000;
      const eventDate = new Date(timestampMs);
      const eventDay = new Date(eventDate);
      eventDay.setHours(0, 0, 0, 0);
      return eventDay >= currentDay;
    });
  };

  // Fetch events and filter by date
  useEffect(() => {
    const fetchAndFilterEvents = async () => {
      await fetchEvents();
    };

    fetchAndFilterEvents();
  }, [fetchEvents]);

  // Filter events whenever the events array changes
  useEffect(() => {
    if (events.length > 0) {
      const upcomingEvents = filterUpcomingEvents(events);
      const groupedEvents = groupEventsByDate(upcomingEvents);
      setFilteredEvents(groupedEvents);
    }
  }, [events]);

  // Create timeline data based on the filtered events
  const timelineData = Object.keys(filteredEvents).map((date) => ({
    title: date,
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredEvents[date].map((event, index: number) => {
          const { date: eventDate, time: eventTime, isoString } = formatEventDateTime(event.startDate);
          const transformedEvent = {
            address: event.address,
            eventName: event.name,
            eventDescription: event.description,
            eventImage: event.image,
            organizerAddress: event.organizerAddress,
            eventVenue: event.eventVenue,
            eventDate: isoString,
            eventTime: eventTime,
            totalTicketAvailable: event.totalTicketAvailable,
            totalTicketSold: event.totalTicketSold,
            totalRevenue: event.totalRevenue
          };
          
          return (
            <EventItem
              key={index}
              title={event.name}
              description={event.description}
              header={<Skeleton />}
              venue={event.eventVenue}
              publisher={trimAddress(event.organizerAddress)}
              time={event.startDate}
              active={
                new Date(Number(event.startDate) * 1000).setHours(0, 0, 0, 0) ===
                new Date().setHours(0, 0, 0, 0)
              }
              handleSheetOpen={() => handleSheetOpen(event)}
              eventDetails={transformedEvent}
            />
          );
        })}
        <RegisterSheet
        isOpen={isSheetOpen} onClose={handleSheetClose} eventDetails={selectedEvent} />
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline data={timelineData} loading={loading} />
    </div>
  );
}