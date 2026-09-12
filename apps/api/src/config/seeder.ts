import { Laundry } from '../modules/laundry/laundry.model';
import mongoose from 'mongoose';

const mockLaundries = [
  {
    name: "Clean & Bright Laundry",
    address: "123 Main St, Tech Park",
    rating: 4.8,
    isOpen: true,
    services: ["Wash & Fold", "Dry Cleaning", "Ironing"],
    startingPrice: 50,
    estimatedPickup: "30-45 mins",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=400",
    partnerId: new mongoose.Types.ObjectId(), // Dummy ID for now
    location: { type: "Point", coordinates: [77.2090, 28.6139] }
  },
  {
    name: "Express Wash",
    address: "456 Market Road",
    rating: 4.5,
    isOpen: true,
    services: ["Wash & Fold", "Ironing"],
    startingPrice: 40,
    estimatedPickup: "15-30 mins",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=400",
    partnerId: new mongoose.Types.ObjectId(), // Dummy ID for now
    location: { type: "Point", coordinates: [77.2100, 28.6140] }
  }
];

export const seedDatabase = async () => {
  try {
    const count = await Laundry.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding database with mock laundries...');
      await Laundry.insertMany(mockLaundries);
      console.log('✅ Database seeded successfully!');
    }
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};
