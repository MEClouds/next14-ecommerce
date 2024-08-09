import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; billboardid: string } }
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

    if (!params.billboardid) {
      return new NextResponse("billboard Id is required", { status: 400 });
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardid,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; billboardid: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    if (!params.billboardid) {
      return new NextResponse("billboard Id is required", { status: 400 });
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
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardid: string } }
) {
  try {
    if (!params.billboardid) {
      return new NextResponse("billboard Id is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[GET BILLBOARD]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
