interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
}

export default function PropertyDetail({ property }: { property: Property }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={property.image} alt={property.title} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-1">{property.location}</p>
      <p className="mb-2">{property.description}</p>
      <p className="text-blue-600 font-bold text-xl">${property.price}</p>
    </div>
  );
}
