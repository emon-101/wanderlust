"use client";
import { authClient } from "@/lib/auth-client";
import { Button, DateField, Label } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const {data: session} = authClient.useSession();
  const user = session?.user;
  const { _id, price, destinationName, imageUrl, country } = destination;
  const [departureDate, setDepartureDate] = useState(null);

  const handleBookings = async() => {
    const bookingData = {
        userId: user?.id,
        userImage: user?.image,
        userName: user?.name,
        destinationId: _id,
        destinationName,
        price,
        imageUrl,
        country,
        departureDate: new Date(departureDate)
    }
    const {data: tokenData} = await authClient.token()
    const res = await fetch('http://localhost:5000/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(bookingData)
    })

    const data = await res.json();
    toast.success(`${destinationName} booked succesfully!`);
  }
  return (
    <div className="rounded-none border mt-5 p-6">
      <p className="text-zinc-500 font-semibold">Starting from</p>
      <h2 className="text-3xl font-bold text-cyan-500">${price}</h2>
      <p className="text-zinc-500 font-semibold mb-2">per person</p>

      <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
        <Label>Departure Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      <Button onClick={handleBookings} className={'w-full bg-cyan-500 rounded-none mt-4'}>Booking Now</Button>
    </div>
  );
};

export default BookingCard;
