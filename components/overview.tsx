"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type Props = {
  data: any
}
export const Overview = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#999999"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#999999"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(vale) => `$${vale}`}
        />
        <Bar dataKey="total" fill="#4598db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
