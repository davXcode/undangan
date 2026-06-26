import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Wish from "@/lib/models/Wish";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password");

  if (password !== process.env.RSVP_ADMIN_PASSWORD) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const wishes = await Wish.find().sort({ createdAt: -1 });
    const total = wishes.length;
    const totalHadir = wishes.filter((w) => w.attendance === "Hadir").length;
    const totalTidakHadir = wishes.filter(
      (w) => w.attendance === "Tidak Hadir"
    ).length;
    const totalGuests = wishes
      .filter((w) => w.attendance === "Hadir")
      .reduce((sum, w) => sum + w.guests, 0);

    return NextResponse.json({
      wishes,
      stats: { total, totalHadir, totalTidakHadir, totalGuests },
    });
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
    return NextResponse.json(
      { message: "Error fetching RSVP data" },
      { status: 500 }
    );
  }
}
