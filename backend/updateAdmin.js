const mongoose = require("mongoose");
const Complaint = require("./models/Complaint");
const User = require("./models/User");

mongoose.connect(
  "mongodb+srv://kaushik2003singh:Fg3yrUlzZPaH9R7y@smart-city.bxnyg.mongodb.net/?retryWrites=true&w=majority&appName=Smart-city"
)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

async function insertComplaint() {
  try {
    // Get the user who will be associated with the complaint
    const userEmail = "kaushik123@gmail.com"; // Replace with an existing user's email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("❌ User not found!");
      return;
    }

    // Define the complaint data including location (latitude, longitude)
    const complaintData = {
      title: "Water Leakage at Main Gate", // Sample complaint title
      description: "There is a significant water leakage near the main gate of the city park.",
      user: user._id, // User reference
      location: {
        latitude: 28.7041, // Example latitude (New Delhi)
        longitude: 77.1025, // Example longitude (New Delhi)
      },
    };

    // Create and save the complaint to the database
    const newComplaint = new Complaint(complaintData);
    await newComplaint.save();

    console.log("✅ Complaint inserted successfully:", newComplaint);
  } catch (error) {
    console.error("❌ Error inserting complaint:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertComplaint();
