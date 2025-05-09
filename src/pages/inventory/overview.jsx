import React, { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Pie,
  PieChart,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropTypes from "prop-types";

const categoryData = [
  {
    name: "Electronics",
    total: 234,
    color: "#4f46e5",
  },
  {
    name: "Clothing",
    total: 156,
    color: "#0ea5e9",
  },
  {
    name: "Food",
    total: 128,
    color: "#10b981",
  },
  {
    name: "Beverages",
    total: 95,
    color: "#f59e0b",
  },
  {
    name: "Furniture",
    total: 84,
    color: "#ef4444",
  },
  {
    name: "Toys",
    total: 65,
    color: "#8b5cf6",
  },
  {
    name: "Tools",
    total: 43,
    color: "#ec4899",
  },
];

const monthlyData = [
  { name: "Jan", total: 580 },
  { name: "Feb", total: 690 },
  { name: "Mar", total: 1100 },
  { name: "Apr", total: 1200 },
  { name: "May", total: 900 },
  { name: "Jun", total: 1500 },
  { name: "Jul", total: 1800 },
  { name: "Aug", total: 1700 },
  { name: "Sep", total: 1400 },
  { name: "Oct", total: 1100 },
  { name: "Nov", total: 1050 },
  { name: "Dec", total: 2100 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-3 border rounded-md shadow-sm'>
        <p className='font-medium'>{label}</p>
        <p className='text-sm text-muted-foreground'>
          Total: <span className='font-medium'>{payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export function Overview() {
  const [chartView, setChartView] = useState("bar");

  return (
    <div>
      <Tabs defaultValue='categories' className='space-y-4'>
        <div className='flex justify-between items-center'>
          <TabsList>
            <TabsTrigger value='categories'>By Category</TabsTrigger>
            <TabsTrigger value='monthly'>Monthly Trend</TabsTrigger>
          </TabsList>
          <div className='flex gap-2'>
            <button
              onClick={() => setChartView("bar")}
              className={`p-1 rounded-md ${
                chartView === "bar" ? "bg-slate-200" : ""
              }`}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <rect
                  x='4'
                  y='4'
                  width='4'
                  height='16'
                  rx='1'
                  className='fill-current'
                />
                <rect
                  x='10'
                  y='8'
                  width='4'
                  height='12'
                  rx='1'
                  className='fill-current'
                />
                <rect
                  x='16'
                  y='6'
                  width='4'
                  height='14'
                  rx='1'
                  className='fill-current'
                />
              </svg>
            </button>
            <button
              onClick={() => setChartView("pie")}
              className={`p-1 rounded-md ${
                chartView === "pie" ? "bg-slate-200" : ""
              }`}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4V12H20C20 16.41 16.41 20 12 20Z'
                  className='fill-current'
                />
              </svg>
            </button>
          </div>
        </div>

        <TabsContent value='categories' className='pt-4'>
          {chartView === "bar" ? (
            <ResponsiveContainer width='100%' height={350}>
              <BarChart data={categoryData}>
                <XAxis
                  dataKey='name'
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey='total' radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width='100%' height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={120}
                  fill='#8884d8'
                  dataKey='total'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </TabsContent>

        <TabsContent value='monthly' className='pt-4'>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={monthlyData}>
              <XAxis
                dataKey='name'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey='total' radius={[4, 4, 0, 0]} fill='#4f46e5' />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};
