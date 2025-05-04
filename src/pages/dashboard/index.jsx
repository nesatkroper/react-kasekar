import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart3, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/layout";
import Summary from "./summary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("week");

  const usageChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Nitrogen",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Phosphorus",
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Potassium",
        data: [45, 30, 50, 60, 70, 40],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const yieldChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Crop Yield",
        data: [30, 40, 45, 50, 55, 60],
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
      {
        label: "Expected Yield",
        data: [35, 42, 48, 53, 58, 62],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        borderDash: [5, 5],
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const recentActivities = [
    {
      id: 1,
      activity: "Nitrogen fertilizer applied",
      field: "Field A",
      date: "2023-06-15",
      amount: "250 kg",
      status: "completed",
    },
    {
      id: 2,
      activity: "Phosphorus fertilizer ordered",
      field: "Field B",
      date: "2023-06-14",
      amount: "150 kg",
      status: "pending",
    },
    {
      id: 3,
      activity: "Soil test conducted",
      field: "Field C",
      date: "2023-06-12",
      amount: "-",
      status: "completed",
    },
    {
      id: 4,
      activity: "Potassium fertilizer applied",
      field: "Field D",
      date: "2023-06-10",
      amount: "100 kg",
      status: "completed",
    },
    {
      id: 5,
      activity: "Micronutrient mix ordered",
      field: "Field A",
      date: "2023-06-08",
      amount: "50 kg",
      status: "shipped",
    },
  ];

  return (
    <Layout>
      <main className='flex flex-1 flex-col gap-2 md:gap-4'>
        <Summary />

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='lg:col-span-4'>
            <CardHeader className='flex flex-row items-center'>
              <div className='grid gap-2'>
                <CardTitle>Fertilizer Usage</CardTitle>
                <CardDescription>
                  Monthly usage breakdown by fertilizer type
                </CardDescription>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeframe("week")}>
                  Week
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeframe("month")}>
                  Month
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setTimeframe("year")}>
                  Year
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <Bar data={usageChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>
                Current stock levels of key fertilizers
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='font-medium'>Nitrogen (N)</div>
                  </div>
                  <div>75%</div>
                </div>
                <Progress value={75} className='h-2' />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='font-medium'>Phosphorus (P)</div>
                  </div>
                  <div>45%</div>
                </div>
                <Progress value={45} className='h-2' />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='font-medium'>Potassium (K)</div>
                  </div>
                  <div>90%</div>
                </div>
                <Progress value={90} className='h-2' />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='font-medium'>Micronutrients</div>
                  </div>
                  <div>20%</div>
                </div>
                <Progress value={20} className='h-2' />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='font-medium'>Organic Fertilizer</div>
                  </div>
                  <div>60%</div>
                </div>
                <Progress value={60} className='h-2' />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                <Package className='mr-2 h-4 w-4' />
                View Full Inventory
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='lg:col-span-4'>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest fertilizer applications and inventory changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.field}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            activity.status === "completed"
                              ? "default"
                              : activity.status === "pending"
                              ? "outline"
                              : "secondary"
                          }>
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                <Calendar className='mr-2 h-4 w-4' />
                View All Activities
              </Button>
            </CardFooter>
          </Card>
          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Crop Yield Impact</CardTitle>
              <CardDescription>
                Correlation between fertilizer application and crop yield
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <Line data={yieldChartData} options={chartOptions} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                <BarChart3 className='mr-2 h-4 w-4' />
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Applications</CardTitle>
              <CardDescription>
                Scheduled fertilizer applications for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <div className='flex-1 space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      Field A - Nitrogen Application
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Tomorrow, 8:00 AM
                    </p>
                  </div>
                  <Badge>200 kg</Badge>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                  <div className='flex-1 space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      Field C - Phosphorus Application
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Jun 18, 9:30 AM
                    </p>
                  </div>
                  <Badge>150 kg</Badge>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-2 h-2 rounded-full bg-purple-500'></div>
                  <div className='flex-1 space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      Field B - Micronutrient Mix
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Jun 20, 7:00 AM
                    </p>
                  </div>
                  <Badge>50 kg</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                Schedule New Application
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Metrics</CardTitle>
              <CardDescription>
                Current soil conditions across fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='nitrogen'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='nitrogen'>N</TabsTrigger>
                  <TabsTrigger value='phosphorus'>P</TabsTrigger>
                  <TabsTrigger value='potassium'>K</TabsTrigger>
                </TabsList>
                <TabsContent value='nitrogen' className='space-y-4 pt-4'>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field A</div>
                      <div className='font-medium'>Good (65 ppm)</div>
                    </div>
                    <Progress value={65} className='h-2' />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field B</div>
                      <div className='font-medium'>Low (30 ppm)</div>
                    </div>
                    <Progress value={30} className='h-2' />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field C</div>
                      <div className='font-medium'>Optimal (80 ppm)</div>
                    </div>
                    <Progress value={80} className='h-2' />
                  </div>
                </TabsContent>
                <TabsContent value='phosphorus' className='space-y-4 pt-4'>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field A</div>
                      <div className='font-medium'>Optimal (75 ppm)</div>
                    </div>
                    <Progress value={75} className='h-2' />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field B</div>
                      <div className='font-medium'>Good (60 ppm)</div>
                    </div>
                    <Progress value={60} className='h-2' />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field C</div>
                      <div className='font-medium'>Low (25 ppm)</div>
                    </div>
                    <Progress value={25} className='h-2' />
                  </div>
                </TabsContent>
                <TabsContent value='potassium' className='space-y-4 pt-4'>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field A</div>
                      <div className='font-medium'>Low (35 ppm)</div>
                    </div>
                    <Progress value={35} className='h-2' />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field B</div>
                      <div className='font-medium'>Optimal (85 ppm)</div>
                    </div>
                    <Progress value={85} className='h-2' />
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center justify-between'>
                      <div>Field C</div>
                      <div className='font-medium'>Good (70 ppm)</div>
                    </div>
                    <Progress value={70} className='h-2' />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                Schedule Soil Test
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                AI-powered fertilizer recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='rounded-lg border p-3'>
                  <div className='font-medium'>Field A needs nitrogen</div>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Soil tests indicate nitrogen deficiency. Apply 150kg/ha
                    within 7 days for optimal growth.
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline' className='bg-green-50'>
                      High Priority
                    </Badge>
                  </div>
                </div>
                <div className='rounded-lg border p-3'>
                  <div className='font-medium'>
                    Restock phosphorus fertilizer
                  </div>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Current inventory will be depleted within 2 weeks based on
                    application schedule.
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline' className='bg-amber-50'>
                      Medium Priority
                    </Badge>
                  </div>
                </div>
                <div className='rounded-lg border p-3'>
                  <div className='font-medium'>Field C pH adjustment</div>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Soil pH is 5.2, which is too acidic. Consider applying lime
                    to raise pH to 6.5.
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline' className='bg-blue-50'>
                      Low Priority
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full'>
                View All Recommendations
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </Layout>
  );
}

// import Layout from "@/layout";
// import MyBigBarChartInteractive from "./big-bar-chart-interactive";
// import MyAreaChart from "./area-chart-gradient";
// import MyBarChart from "./bar-chart-multiple";
// import MyPieChart from "./pie-chart-donut";
// import MyBigAreaChartInteractive from "./big-area-chart-interactive";
// import React from "react";
// import Summary from "./summary";

// const Dashboard = () => {
//   return (
//     <Layout>
//       <Summary />
//       <MyBigBarChartInteractive />
//       <div className='grid grid-cols-3 gap-3'>
//         <MyAreaChart />
//         <MyBarChart />
//         <MyPieChart />
//       </div>
//       <MyBigAreaChartInteractive />
//     </Layout>
//   );
// };

// export default Dashboard;
