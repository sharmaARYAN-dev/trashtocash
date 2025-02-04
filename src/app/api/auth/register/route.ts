import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
import { connect } from "../../../../libs/helpers";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { name, email, password, userRole } = await req.json();

    // Input validation
    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Name must be at least 3 characters long." },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword, userRole: "normalUser" });

    // Exclude sensitive data before sending the response
    const { password: _, ...safeUser } = user.toObject();

    // Return success response
    return NextResponse.json(
      { success: true, message: "User registered successfully.", user: safeUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during registration:", err);

    // Handle database connection or unexpected errors
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Error registering user.", error: errorMessage },
      { status: 500 }
    );
  }
}
