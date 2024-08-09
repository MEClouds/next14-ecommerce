import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; productid: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const {
      name,
      price,
      images,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("name is Required", { status: 400 })
    }
    if (!images || !images.length) {
      return new NextResponse("Images url is Required", { status: 400 })
    }
    if (!price) {
      return new NextResponse("price is Required", { status: 400 })
    }
    if (!categoryId) {
      return new NextResponse("categoryId is Required", { status: 400 })
    }

    if (!sizeId) {
      return new NextResponse("sizeId is Required", { status: 400 })
    }
    if (!colorId) {
      return new NextResponse("colorId is Required", { status: 400 })
    }
    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    if (!params.productid) {
      return new NextResponse("Product Id is required", { status: 400 })
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

    await prismadb.product.update({
      where: {
        id: params.productid,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {},
        },
      },
    })
    const product = await prismadb.product.update({
      where: {
        id: params.productid,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PROUDCT_PATCH", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; productid: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!params.storeid) {
      return new NextResponse("Store Id is required", { status: 400 })
    }

    if (!params.productid) {
      return new NextResponse("Product Id is required", { status: 400 })
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
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productid,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_DELETE", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productid: string } }
) {
  try {
    if (!params.productid) {
      return new NextResponse("product Id is required", { status: 400 })
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productid,
      },
      include: {
        images: true,
        color: true,
        size: true,
        category: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[GET PROUDCT]", error)
    return new NextResponse("Internal error ", { status: 500 })
  }
}
