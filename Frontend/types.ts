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