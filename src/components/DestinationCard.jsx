import { Button } from "@heroui/react";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { PiMapPinLineLight } from "react-icons/pi";


const DestinationCard = ({destination}) => {
    const {destinationName, country, price, duration, imageUrl} = destination;
    return (
        <div className="py-5 px-3 border border-zinc-300 shadow rounded-lg">
            <Image
            className="h-48 mb-2 rounded-lg"
            alt={destinationName}
            src={imageUrl}
            height={400}
            width={400}
            />
            <div className="space-y-2">
                <div className="flex items-center gap-1 font-semibold text-sm">
                    {" "}
                    <PiMapPinLineLight /> <span>{country}</span>
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{destinationName}</h2>
                    <p className="font-semibold">
                        ${price}/<span className="text-sm font-medium text-zinc-400">person</span>
                    </p>
                </div>
                <div className="flex gap-1 items-center text-sm mb-4">
                    <FaRegCalendarDays /> <span>{duration}</span>
                </div>
                <Button fullWidth>Book Now</Button>
            </div>
        </div>
    );
};

export default DestinationCard;