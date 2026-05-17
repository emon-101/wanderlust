import DestinationCard from "@/components/DestinationCard";

const DestinationsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`);
  const destinations = await res.json();
  return (
    <div className="w-9/10 mx-auto my-4">
      <h1 className="text-2xl font-bold text-center">All Destinations</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
