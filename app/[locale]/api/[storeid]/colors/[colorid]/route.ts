import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; colorid: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, value } = body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("name is Required", { status: 400 })
    }
    if (!value) {
      return new NextResponse("Value is Required", { status: 400 })
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    if (!params.colorid) {
      return new NextResponse("Color Id is required", { status: 400 })
    }

    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    })

    if (!storeByUser) {
      return new NextResponse("unauthorized", { status: 403 })
    }

    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorid,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_PATCH", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; colorid: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    if (!params.colorid) {
      return new NextResponse("Color Id is required", { status: 400 })
    }
    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    })

    if (!storeByUser) {
      return new NextResponse("unauthorized", { status: 403 })
    }
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorid,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[COLOR_DELETE", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { colorid: string } }
) {
  try {
    if (!params.colorid) {
      return new NextResponse("Color Id is required", { status: 400 })
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorid,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log("[GET_COLORS]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
