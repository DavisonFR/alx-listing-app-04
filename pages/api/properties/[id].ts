import ReviewSection from "@/components/property/ReviewSection";
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const properties = [
    {
      id: '1',
      title: 'Ocean Villa',
      description: 'A beautiful beachfront villa.',
      price: 450,
      image: 'https://via.placeholder.com/400x300',
      location: 'Hawassa',
    },
    {
      id: '2',
      title: 'City Apartment',
      description: 'Modern apartment in the heart of Addis.',
      price: 300,
      image: 'https://via.placeholder.com/400x300',
      location: 'Addis Ababa',
    }
  ];

  const property = properties.find(p => p.id === id);

  if (property) {
    res.status(200).json(property);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
}
