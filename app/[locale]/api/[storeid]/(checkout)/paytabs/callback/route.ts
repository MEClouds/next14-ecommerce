// app/api/paytabs/callback/route.ts
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,HEAD,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader })
}

export async function POST(req: Request) {
  const transactionDetails = await req.json()
  // Process the transaction details here (e.g., update order status in your database)

  console.log(transactionDetails) // For debugging purposes

  const address = `
  ${transactionDetails.customer_details.street1} 
  ,${transactionDetails.customer_details.city} ,
  ${transactionDetails.customer_details.country}`

  const order = await prismadb.order.update({
    where: {
      id: transactionDetails.cart_id,
    },
    data: {
      isPaid: true,
      address,
      // Phone:transactionDetails.customer_details.phone
    },
  })

  const response = NextResponse.json({ message: "Callback received" })
  response.headers.set("Access-Control-Allow-Origin", "*")
  return response
}
