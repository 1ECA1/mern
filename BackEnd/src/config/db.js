// import mongoose from "mongoose"

// export const connectDB = async () => {
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MONGODB CONNECTED SUCCESSFULLY!");

//     }catch (error) {
//         console.error("Error connecting to MONGODB", error);
//         process.exit(1);
//     }
// };



import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("❌ Error connecting to MONGODB:", error.message);
    process.exit(1);
  }
};
