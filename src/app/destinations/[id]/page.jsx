import EditPage from "@/components/EditPage";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { PiMapPinLineLight } from "react-icons/pi";
import { RiEditLine } from "react-icons/ri";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();
  const { destinationName, country, price, duration, imageUrl, description } =
    destination;
  return (
    <div className="lg:w-3/4 mx-auto px-4 my-10">
        <EditPage destination={destination} />
      <Image
        className="w-full h-128 object-cover my-5"
        alt={destinationName}
        src={imageUrl}
        height={500}
        width={500}
      />
      <div className="space-y-2">
        <div className="flex items-center gap-1 font-semibold text-zinc-500">
          <PiMapPinLineLight /> <span>{country}</span>
        </div>
        <h1 className="text-5xl">{destinationName}</h1>
        <div className="">
          <div className="flex gap-1 items-center text-sm mb-4">
            <FaRegCalendarDays /> <span>{duration}</span>
          </div>
        </div>
        <div className="">
            <h1 className="text-3xl">Overview</h1>
            <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
