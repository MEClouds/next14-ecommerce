import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; sizeid: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is Required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is Required", { status: 400 });
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    if (!params.sizeid) {
      return new NextResponse("Size Id is required", { status: 400 });
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

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeid,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; sizeid: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    if (!params.sizeid) {
      return new NextResponse("Size Id is required", { status: 400 });
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
    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeid,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeid: string } }
) {
  try {
    if (!params.sizeid) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeid,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[GET_SIZES]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
