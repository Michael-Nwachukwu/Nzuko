"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useFetchEvents, { IEventDetails } from "@/hooks/useAllEvents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wallet, Plus, Clock2, Badge } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventItem } from "@/components/micros/EventCard";
import { formatEventTime, trimAddress } from "@/lib/reusables";
import { IconLocation } from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex w-40 justify-end items-end h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default function ManageEvents() {
  const { events, loading, fetchEvents } = useFetchEvents();
  const { address, isConnected } = useAccount();
  const [userEvents, setUserEvents] = useState<IEventDetails[]>([]);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);

  useEffect(() => {
    // Show wallet connection modal if not connected
    if (!isConnected) {
      setShowConnectWalletModal(true);
    } else {
      setShowConnectWalletModal(false);
    }
  }, [isConnected]);

  useEffect(() => {
    const fetchAndFilterEvents = async () => {
      await fetchEvents();
    };

    fetchAndFilterEvents();
  }, [fetchEvents]);

  // Filter events created by the connected address
  useEffect(() => {
    if (isConnected && address && events.length > 0) {
      const filteredEvents = events.filter(
        (event) => event.organizerAddress.toLowerCase() === address.toLowerCase()
      );
      setUserEvents(filteredEvents);
    } else {
      setUserEvents([]);
    }
  }, [address, events, isConnected]);

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-slate-900 p-4 rounded-full mb-4">
        <Plus size={40} className="text-green-300" />
      </div>
      <h3 className="text-2xl font-bold text-slate-200 mb-2">No events yet</h3>
      <p className="text-slate-400 max-w-md mb-6">
        You haven't created any events yet. Create your first event to start selling tickets.
      </p>
      <Link href="/create-event">
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-2xl">
          Create Event
        </Button>
      </Link>
    </div>
  );

  // Not connected state
  const NotConnectedState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-slate-900 p-4 rounded-full mb-4">
        <Wallet size={40} className="text-slate-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-200 mb-2">Connect Wallet</h3>
      <p className="text-slate-400 max-w-md mb-6">
        Please connect your wallet to manage your events
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-200">Manage Events</h1>
        {isConnected && (
          <Link href="/create">
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-2xl">
              <Plus size={18} className="mr-2" /> Create Event
            </Button>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-64 rounded-xl bg-slate-900 animate-pulse"
            ></div>
          ))}
        </div>
      ) : !isConnected ? (
        <NotConnectedState />
      ) : userEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userEvents.map((event, index) => (
            <Link
              href={`/manage-event/manage/${event.address}`}
              key={index}
              className="cursor-pointer"
            >
              <div
                className=
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-slate-950 dark:border-white/[0.2] hover:border-slate-600 justify-between flex flex-col space-y-6"
              >
                <div className="flex w-40 justify-end items-end h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>

                <div className="transition duration-200 space-y-2">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                      <Clock2 size={17} />
                      <p className="uppercase font-medium">{formatEventTime(event.startDate)}</p>
                    </div>
                    {new Date(Number(event.startDate) * 1000).setHours(0, 0, 0, 0) ===
                      new Date().setHours(0, 0, 0, 0) && (
                        <Badge className="bg-[#d69712] bg-opacity-15 rounded text-yellow-300 inline-flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
                          Live
                        </Badge>
                      )}
                  </div>
                  <h2 className="font-sans font-bold text-slate-200 text-2xl leading-6">
                    {event.name}
                  </h2>
                  <p className="text-md font-medium text-slate-300">By <span className="font-bold text-green-300">{event.organizerAddress}</span></p>
                  <div className="inline-flex items-center gap-1.5 text-slate-400">
                    <IconLocation size={17} />
                    <p className="font-medium text-s">{event.eventVenue}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Badge className="bg-[#3cbd2c] bg-opacity-15 rounded text-green-300 inline-flex items-center gap-2">
                      $10
                    </Badge>
                    + Gas
                  </div>
                  <p className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Connect Wallet Modal */}
      <Dialog open={showConnectWalletModal} onOpenChange={setShowConnectWalletModal}>
        <DialogContent className="sm:max-w-md bg-slate-950 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-slate-200">Connect Wallet</DialogTitle>
            <DialogDescription className="text-slate-400">
              You need to connect your wallet to manage your events
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <Wallet size={48} className="text-slate-400 mb-4" />
            <p className="text-slate-300 mb-4 text-center">
              Please connect your wallet using the connect button in the navigation bar
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}