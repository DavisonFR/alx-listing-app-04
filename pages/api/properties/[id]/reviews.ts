import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const reviews: { [key in "1" | "2"]: { id: string; author: string; comment: string; rating: number; }[] } = {
    "1": [
      { id: "r1", author: "Jane", comment: "Loved the ocean view!", rating: 5 },
      { id: "r2", author: "Sam", comment: "Perfect for a weekend getaway.", rating: 4 },
    ],
    "2": [
      { id: "r3", author: "Liya", comment: "Super clean and modern.", rating: 5 },
    ],
  };

  const propertyReviews = reviews[id as "1" | "2"] || [];

  res.status(200).json(propertyReviews);
}
