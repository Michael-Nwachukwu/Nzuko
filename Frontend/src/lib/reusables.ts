import { format } from "date-fns";

export const trimAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatEventTime = (timeValue: bigint | undefined) => {
    if (!timeValue) return "TBA";
    
    // Convert bigint to number safely and ensure it's in milliseconds
    const timestampNum = Number(timeValue);
    // Check if timestamp is already in milliseconds (13 digits) or seconds (10 digits)
    const timestampMs = timestampNum.toString().length > 10 ? timestampNum : timestampNum * 1000;
    const date = new Date(timestampMs);
    
    return format(date, "MMM dd, yyyy h:mm a");
  };