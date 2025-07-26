// pages/property/[id].tsx

import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        setError("Failed to load property");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;
  if (!property) return <p className="p-4 text-center text-gray-600">Property not found</p>;

  return <PropertyDetail property={property} />;
}
