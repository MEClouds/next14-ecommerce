// app/api/paytabs/create-payment/route.ts
import { NextResponse } from "next/server"
import axios from "axios"
import prismadb from "@/lib/prismadb"
import { Product } from "@prisma/client"

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,HEAD,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader })
}

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  const body = await req.json()
  const { callback, return: returnUrl, productIds } = body

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 })
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  })

  const amount = products.reduce((total: number, product: Product) => {
    return total + Number(product.price)
  }, 0)

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeid,
      isPaid: false,
      phone: "",
      address: "",
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  })

  const paymentData = {
    profile_id: `${process.env.PAYTAB_PROFILE_ID}`,
    tran_type: "sale",
    tran_class: "ecom",
    cart_id: order.id,
    cart_currency: "USD",
    cart_amount: amount,
    cart_description: `Order id ${order.id}`,
    customer_details: {
      phone: "",
    },
    callback,
    return: returnUrl,
  }

  try {
    console.log(paymentData)
    const { data } = await axios.post(
      "https://secure-global.paytabs.com/payment/request",
      paymentData,
      {
        headers: {
          Authorization: `${process.env.PAYTABS_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    const response = NextResponse.json(data)
    console.log(response)
    response.headers.set("Access-Control-Allow-Origin", "*")
    return response
  } catch (error: any) {
    const response = NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
    response.headers.set("Access-Control-Allow-Origin", "*")
    return response
  }
}
