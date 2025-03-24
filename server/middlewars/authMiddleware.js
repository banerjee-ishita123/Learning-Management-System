import { clerkClient } from "@clerk/express";


export const protectEducator = async (req, res, next) => {
  try {
    console.log("🔹 Request Headers:", req.headers); // Debug headers
    console.log("🔹 Clerk Auth Object:", req.auth); // Debug Clerk authentication

    if (!req.auth || !req.auth.userId) {
      console.log("❌ No userId found in auth object");
      return res.status(401).json({ success: false, message: "Unauthorized - No userId found" });
    }

    const userId = req.auth.userId;
    console.log("🔹 UserID from auth:", userId);

    // Fetch user details from Clerk
    const response = await clerkClient.users.getUser(userId);
    console.log("🔹 Clerk User Data:", response); // Debug user data

    if (response.publicMetadata.role !== "educator") {
      console.log("❌ User is not an educator");
      return res.status(403).json({ success: false, message: "Unauthorized Access - Not an educator" });
    }

    next();
  } catch (error) {
    console.error("❌ Error in protectEducator middleware:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};