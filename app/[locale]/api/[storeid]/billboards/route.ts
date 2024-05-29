import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is Required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image url is Required", { status: 400 });
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUser) {
      return new NextResponse("unauthorized", { status: 403 });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[GET_BILLBOARDS", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
