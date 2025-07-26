import { useState, useEffect } from "react";
import axios from "axios";

interface Review {
  id: string;
  comment: string;
  rating: number;
  author: string;
}

interface Props {
  propertyId: string;
}

const ReviewSection = ({ propertyId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("⚠️ Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) return <p className="text-gray-500">Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">🌟 Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded">
              <p className="font-medium">{review.author}:</p>
              <p className="text-sm text-gray-700">"{review.comment}"</p>
              <p className="text-yellow-600">⭐ {review.rating}/5</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSection;
