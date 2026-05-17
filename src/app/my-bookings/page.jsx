import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { Button, Chip } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FaCalendarDays, FaRegTrashCan } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { PiMapPinLineBold } from "react-icons/pi";

const MybookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  //   console.log(user);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`);
  const bookings = await res.json();
  return (
    <div className="lg:w-4/5 mx-auto px-4 my-10">
      <h1 className="text-3xl font-medium">My Bookings</h1>
      <p className="mb-5 font-semibold text-muted">
        Manage and view your upcoming travel plans
      </p>
      {bookings.map((booking) => (
        <div key={booking._id}>
          <div className="flex gap-5 border p-4 mb-4">
            <Image
              alt={booking?.destinationName}
              src={booking?.imageUrl}
              height={300}
              width={300}
            />
            <div className="space-y-2 flex-1">
              <Chip color="success">
                <CiCircleCheck />
                Confirmed
              </Chip>
              <h1 className="text-3xl font-bold mb-2">{booking?.destinationName}</h1>
              <p className="text-sm text-muted flex gap-1 items-center font-semibold">
                <FaCalendarDays className="-mt-1" /> Departure: {new Date(booking?.departureDate).toLocaleDateString(
                    "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                )}
              </p>
              <p className="text-sm text-muted flex gap-1 items-center font-semibold">
                <PiMapPinLineBold className="-mt-1" /> BookingId: {booking?._id}
              </p>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-3xl font-medium text-cyan-500">${booking?.price}</h2>
                <div className="flex gap-2">
                    <BookingCancelAlert bookingId={booking?._id} />
                    <Button className={'rounded-none'}><IoEyeOutline /> view</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MybookingPage;
