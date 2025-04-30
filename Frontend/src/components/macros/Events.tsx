/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useRef } from "react";
import { Timeline } from "@/components/ui/timeline";
import { EventItem } from "../micros/EventCard";
import useFetchEvents, { IEventDetails } from "@/hooks/useAllEvents";
import { format, isAfter } from "date-fns";
import Link from "next/link";
import Image from "next/image";

const Skeleton = () => (
  <div className="flex w-40 justify-end items-end h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export function Events() {
  const { events, loading, fetchEvents } = useFetchEvents();
  const [filteredEvents, setFilteredEvents] = useState<Record<string, IEventDetails[]>>({});

  // Helper function to group events by date
  const groupEventsByDate = (events: IEventDetails[]) => {
    // Sort events by startDate (earliest first)
    const sortedEvents = events.sort(
      (a, b) => Number(a.startDate) - Number(b.startDate)
    );

    // Group sorted events by their formatted startDate
    return sortedEvents.reduce((acc: any, event) => {
      let startDate = new Date(Number(event.startDate) * 1000); // Convert startDate to milliseconds
      
      // Fix any date year issues
      if (startDate.getFullYear() < 2025 || startDate.getFullYear() > 3000) {
        // Keep month and day, just update year to 2025
        const month = startDate.getMonth();
        const day = startDate.getDate();
        startDate = new Date(2025, month, day);
      }
      
      const formattedDate = format(startDate, "MMMM dd, yyyy"); // Format to readable date

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(event);
      return acc;
    }, {});
  };

  // Filter for events that are happening today or in the future
  const filterUpcomingEvents = (events: IEventDetails[]) => {
    // Current date is April 29, 2025 according to system date
    const currentTime = new Date(2025, 3, 29); // Month is 0-indexed, so 3 = April
    const currentDay = new Date(currentTime);
    currentDay.setHours(0, 0, 0, 0); // Set to start of day for date comparison
    
    return events.filter((event) => {
      // Use startDate for filtering (not endDate)
      const eventStartDate = new Date(Number(event.startDate) * 1000);
      
      // Normalize the event date to start of day for proper comparison
      const eventDay = new Date(eventStartDate);
      eventDay.setHours(0, 0, 0, 0);
      
      // Include events whose start date is today or in the future
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

  const trimAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Create timeline data based on the filtered events
  const timelineData = Object.keys(filteredEvents).map((date) => ({
    title: date,
    content: (
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredEvents[date].map((event, index: number) => (
          <Link
            href={`/manage-event/manage/${event.address}`}
            key={index}
          >
            <EventItem
              title={event.name}
              description={event.description}
              header={<Skeleton />}
              venue={event.eventVenue}
              publisher={trimAddress(event.organizerAddress)}
              time={BigInt(event.startDate)} // Ensure it's passed as BigInt
              active={
                new Date(Number(event.startDate) * 1000).setHours(0, 0, 0, 0) ===
                new Date().setHours(0, 0, 0, 0)
              }
            />
          </Link>
        ))}
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline data={timelineData} loading={loading} />
    </div>
  );
}