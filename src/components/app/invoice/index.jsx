


import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, Printer, Receipt } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Layout from "@/layout";

const InvoicePage = () => {
  const [invoiceFormat, setInvoiceFormat] = useState("a4");
  const invoiceRef = useRef(null);
  const receiptRef = useRef(null);

  const downloadAsPDF = () => {
    const element =
      invoiceFormat === "a4" ? invoiceRef.current : receiptRef.current;
    if (!element) return;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      if (invoiceFormat === "a4") {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("invoice.pdf");
      } else {
        // For receipt format
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [80, (canvas.height * 80) / canvas.width],
        });
        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          80,
          (canvas.height * 80) / canvas.width
        );
        pdf.save("receipt.pdf");
      }
    });
  };

  const downloadAsPNG = () => {
    const element =
      invoiceFormat === "a4" ? invoiceRef.current : receiptRef.current;
    if (!element) return;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = invoiceFormat === "a4" ? "invoice.png" : "receipt.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <Layout>
      <div className='container mx-auto px-4'>
        <div className='flex items-center mb-6'>
          <div className='flex items-center gap-2'>
            <Link href='/'>
              <Button variant='ghost' className='flex items-center gap-1'>
                <ArrowLeft className='h-4 w-4' />
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>

        <div className='flex gap-2'>
          <Tabs
            value={invoiceFormat}
            onValueChange={setInvoiceFormat}
            className='w-full'>
            <div className='flex justify-between mb-6'>
              <TabsList>
                <TabsTrigger value='a4' className='flex items-center gap-1'>
                  <FileText className='h-4 w-4' />
                  A4
                </TabsTrigger>
                <TabsTrigger
                  value='receipt'
                  className='flex items-center gap-1'>
                  <Receipt className='h-4 w-4' />
                  Receipt
                </TabsTrigger>
              </TabsList>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={() => window.print()}
                  className='flex items-center gap-2'>
                  <Printer className='h-4 w-4' />
                  Print
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className='flex items-center gap-2'>
                      <Download className='h-4 w-4' />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={downloadAsPDF}>
                      Download as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={downloadAsPNG}>
                      Download as PNG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value='a4' className='mt-0'>
              <Card className='max-w-4xl mx-auto shadow-lg' ref={invoiceRef}>
                <CardHeader className='border-b bg-gradient-to-r from-slate-50 to-slate-100'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <CardTitle className='text-lg text-slate-800'>
                        Invoice #INV-2023-1001
                      </CardTitle>
                      <p className='text-muted-foreground'>Date: May 8, 2025</p>
                    </div>
                    <div className='text-right'>
                      <h2 className='font-bold text-xl text-slate-800'>
                        NUN Kasekar
                      </h2>
                      <p className='text-sm text-muted-foreground'>
                        123 Business Street
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        City, State 12345
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Phone: (123) 456-7890
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className='p-6 space-y-6'>
                  <div className='grid md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg'>
                    <div className='space-y-1'>
                      <h3 className='font-semibold text-slate-800 mb-2'>
                        Bill To:
                      </h3>
                      <p className='text-slate-700'>Alice Johnson</p>
                      <p className='text-slate-600'>456 Customer Avenue</p>
                      <p className='text-slate-600'>City, State 12345</p>
                      <p className='text-slate-600'>Email: alice@example.com</p>
                      <p className='text-slate-600'>Phone: (987) 654-3210</p>
                    </div>
                    <div className='space-y-1'>
                      <h3 className='font-semibold text-slate-800 mb-2'>
                        Payment Information:
                      </h3>
                      <p className='text-slate-700'>
                        <span className='font-medium'>Employee:</span> John Doe
                      </p>
                      <p className='text-slate-700'>
                        <span className='font-medium'>Room:</span> Main Sales
                        Floor
                      </p>
                      <p className='text-slate-700'>
                        <span className='font-medium'>Payment Method:</span>{" "}
                        Credit Card
                      </p>
                      <p>
                        <span className='font-medium text-slate-700'>
                          Status:
                        </span>
                        <span className='text-green-600 font-medium ml-1 px-2 py-0.5 bg-green-50 rounded-full text-sm'>
                          Paid
                        </span>
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className='font-semibold text-slate-800 mb-4'>
                      Order Details:
                    </h3>
                    <div className='overflow-x-auto rounded-lg border'>
                      <table className='w-full border-collapse'>
                        <thead>
                          <tr className='bg-slate-50'>
                            <th className='text-left py-3 px-4 font-semibold text-slate-700'>
                              Product
                            </th>
                            <th className='text-center py-3 px-4 font-semibold text-slate-700'>
                              Quantity
                            </th>
                            <th className='text-right py-3 px-4 font-semibold text-slate-700'>
                              Price
                            </th>
                            <th className='text-right py-3 px-4 font-semibold text-slate-700'>
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='border-t'>
                            <td className='py-4 px-4'>
                              <div className='flex items-center gap-3'>
                                <div className='relative h-12 w-12 flex-shrink-0 rounded-md border overflow-hidden bg-white'>
                                  <image
                                    src='/placeholder.svg?height=48&width=48'
                                    alt='Ergonomic Office Chair'
                                    className='object-contain p-1'
                                  />
                                </div>
                                <span className='font-medium text-slate-800'>
                                  Ergonomic Office Chair
                                </span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-4 text-slate-700'>
                              1
                            </td>
                            <td className='text-right py-4 px-4 text-slate-700'>
                              $299.99
                            </td>
                            <td className='text-right py-4 px-4 font-medium text-slate-800'>
                              $299.99
                            </td>
                          </tr>
                          <tr className='border-t'>
                            <td className='py-4 px-4'>
                              <div className='flex items-center gap-3'>
                                <div className='relative h-12 w-12 flex-shrink-0 rounded-md border overflow-hidden bg-white'>
                                  <image
                                    src='/placeholder.svg?height=48&width=48'
                                    alt='Wireless Headphones'
                                    className='object-contain p-1'
                                  />
                                </div>
                                <span className='font-medium text-slate-800'>
                                  Wireless Headphones
                                </span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-4 text-slate-700'>
                              1
                            </td>
                            <td className='text-right py-4 px-4 text-slate-700'>
                              $149.99
                            </td>
                            <td className='text-right py-4 px-4 font-medium text-slate-800'>
                              $149.99
                            </td>
                          </tr>
                          <tr className='border-t'>
                            <td className='py-4 px-4'>
                              <div className='flex items-center gap-3'>
                                <div className='relative h-12 w-12 flex-shrink-0 rounded-md border overflow-hidden bg-white'>
                                  <image
                                    src='/placeholder.svg?height=48&width=48'
                                    alt='Smart Watch'
                                    className='object-contain p-1'
                                  />
                                </div>
                                <span className='font-medium text-slate-800'>
                                  Smart Watch
                                </span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-4 text-slate-700'>
                              1
                            </td>
                            <td className='text-right py-4 px-4 text-slate-700'>
                              $199.99
                            </td>
                            <td className='text-right py-4 px-4 font-medium text-slate-800'>
                              $199.99
                            </td>
                          </tr>
                          <tr className='border-t'>
                            <td className='py-4 px-4'>
                              <div className='flex items-center gap-3'>
                                <div className='relative h-12 w-12 flex-shrink-0 rounded-md border overflow-hidden bg-white'>
                                  <image
                                    src='/placeholder.svg?height=48&width=48'
                                    alt='Ergonomic Office Chair'
                                    className='object-contain p-1'
                                  />
                                </div>
                                <span className='font-medium text-slate-800'>
                                  Ergonomic Office Chair
                                </span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-4 text-slate-700'>
                              1
                            </td>
                            <td className='text-right py-4 px-4 text-slate-700'>
                              $299.99
                            </td>
                            <td className='text-right py-4 px-4 font-medium text-slate-800'>
                              $299.99
                            </td>
                          </tr>
                          <tr className='border-t'>
                            <td className='py-4 px-4'>
                              <div className='flex items-center gap-3'>
                                <div className='relative h-12 w-12 flex-shrink-0 rounded-md border overflow-hidden bg-white'>
                                  <image
                                    src='/placeholder.svg?height=48&width=48'
                                    alt='Wireless Headphones'
                                    className='object-contain p-1'
                                  />
                                </div>
                                <span className='font-medium text-slate-800'>
                                  Wireless Headphones
                                </span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-4 text-slate-700'>
                              1
                            </td>
                            <td className='text-right py-4 px-4 text-slate-700'>
                              $149.99
                            </td>
                            <td className='text-right py-4 px-4 font-medium text-slate-800'>
                              $149.99
                            </td>
                          </tr>
                          <tr className='border-t'>
                            <td className='py-4 px-4'>
                              <div className='flex items-center gap-3'>
                                <div className='relative h-12 w-12 flex-shrink-0 rounded-md border overflow-hidden bg-white'>
                                  <image
                                    src='/placeholder.svg?height=48&width=48'
                                    alt='Smart Watch'
                                    className='object-contain p-1'
                                  />
                                </div>
                                <span className='font-medium text-slate-800'>
                                  Smart Watch
                                </span>
                              </div>
                            </td>
                            <td className='text-center py-4 px-4 text-slate-700'>
                              1
                            </td>
                            <td className='text-right py-4 px-4 text-slate-700'>
                              $199.99
                            </td>
                            <td className='text-right py-4 px-4 font-medium text-slate-800'>
                              $199.99
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <div className='w-full max-w-xs space-y-2 bg-slate-50 p-4 rounded-lg'>
                      <div className='flex justify-between text-slate-700'>
                        <span>Subtotal:</span>
                        <span>$649.97</span>
                      </div>
                      <div className='flex justify-between text-slate-700'>
                        <span>Tax (8%):</span>
                        <span>$52.00</span>
                      </div>
                      <div className='flex justify-between text-slate-700'>
                        <span>Shipping:</span>
                        <span>$0.00</span>
                      </div>
                      <Separator />
                      <div className='flex justify-between font-bold text-lg text-slate-800'>
                        <span>Total:</span>
                        <span>$701.97</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className='bg-slate-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-slate-800 mb-2'>
                      Notes:
                    </h3>
                    <p className='text-sm text-slate-600'>
                      Thank you for your purchase! If you have any questions
                      about this invoice, please contact our customer service
                      department at support@example.com or call (123) 456-7890.
                    </p>
                  </div>
                </CardContent>

                <CardFooter className='bg-gradient-to-r from-slate-50 to-slate-100 flex justify-between items-center p-6 border-t'>
                  <div>
                    <p className='text-sm text-slate-500'>
                      This is a computer-generated invoice. No signature
                      required.
                    </p>
                    <div className='mt-2'>
                      <div className='h-10 w-10'>
                        <image
                          src='/placeholder.svg?height=40&width=40&text=QR'
                          alt='QR Code'
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-slate-700'>
                      Receipt ID: REC-2023-1001
                    </p>
                    <p className='text-xs text-slate-500'>
                      Generated on: May 8, 2025 at 3:22 PM
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value='receipt' className='mt-0'>
              <div className='flex justify-center'>
                <Card className='w-[320px] shadow-lg' ref={receiptRef}>
                  <CardHeader className='text-center border-b py-4 bg-gradient-to-b from-slate-50 to-white'>
                    <div className='mx-auto mb-2'>
                      <div className='h-16 w-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center'>
                        <image
                          src='https://github.com/nesatkroper/img/blob/main/phanunlogo.png?raw=true'
                          alt='Company Logo'
                          width={64}
                          height={64}
                        />
                      </div>
                    </div>
                    <CardTitle className='text-lg font-bold'>
                      Company Name
                    </CardTitle>
                    <p className='text-xs text-muted-foreground mt-1'>
                      123 Business Street, City
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Phone: (123) 456-7890
                    </p>

                    <div className='mt-3 pt-3 border-t border-dashed'>
                      <div className='inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-medium'>
                        RECEIPT
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className='p-4 space-y-4 text-sm'>
                    <div className='text-center bg-slate-50 py-2 rounded-md'>
                      <p className='font-medium'>Receipt #REC-2023-1001</p>
                      <p className='text-xs text-muted-foreground'>
                        May 8, 2025 at 3:22 PM
                      </p>
                    </div>

                    <div className='grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-md'>
                      <div>
                        <p className='text-xs text-muted-foreground'>
                          Customer
                        </p>
                        <p className='font-medium'>Alice Johnson</p>
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground'>
                          Employee
                        </p>
                        <p className='font-medium'>John Doe</p>
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground'>
                          Payment Method
                        </p>
                        <p className='font-medium'>Credit Card</p>
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground'>Status</p>
                        <p className='font-medium text-green-600'>Paid</p>
                      </div>
                    </div>

                    <div>
                      <div className='flex justify-between items-center mb-2'>
                        <h3 className='font-medium'>Items</h3>
                        <div className='h-px bg-slate-200 flex-grow ml-2'></div>
                      </div>

                      <div className='space-y-3'>
                        <div className='border-b pb-2'>
                          <div className='flex justify-between items-start'>
                            <div>
                              <p className='font-medium'>Ergonomic Chair</p>
                            </div>
                            <p className='text-right font-medium'>$299.99</p>
                          </div>
                          <div className='flex justify-between text-xs text-slate-500 mt-1'>
                            <span>1 × $299.99</span>
                            <span>SKU: CH-001</span>
                          </div>
                        </div>

                        <div className='border-b pb-2'>
                          <div className='flex justify-between items-start'>
                            <div>
                              <p className='font-medium'>Wireless Headphones</p>
                            </div>
                            <p className='text-right font-medium'>$149.99</p>
                          </div>
                          <div className='flex justify-between text-xs text-slate-500 mt-1'>
                            <span>1 × $149.99</span>
                            <span>SKU: HP-002</span>
                          </div>
                        </div>

                        <div className='border-b pb-2'>
                          <div className='flex justify-between items-start'>
                            <div>
                              <p className='font-medium'>Smart Watch</p>
                            </div>
                            <p className='text-right font-medium'>$199.99</p>
                          </div>
                          <div className='flex justify-between text-xs text-slate-500 mt-1'>
                            <span>1 × $199.99</span>
                            <span>SKU: SW-003</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='bg-slate-50 p-3 rounded-md'>
                      <div className='flex justify-between text-sm'>
                        <span>Subtotal:</span>
                        <span>$649.97</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span>Tax (8%):</span>
                        <span>$52.00</span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span>Shipping:</span>
                        <span>$0.00</span>
                      </div>
                      <div className='border-t mt-2 pt-2 flex justify-between font-bold'>
                        <span>Total:</span>
                        <span>$701.97</span>
                      </div>
                    </div>

                    <div className='pt-2 flex justify-center'>
                      <div className='text-center'>
                        <div className='h-24 w-24 mx-auto bg-white p-2 border rounded-md'>
                          <image
                            src='/placeholder.svg?height=96&width=96&text=QR'
                            alt='QR Code'
                            width={96}
                            height={96}
                          />
                        </div>
                        <p className='text-xs text-muted-foreground mt-2'>
                          Scan to verify purchase
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className='text-center text-xs text-muted-foreground p-4 border-t border-dashed bg-slate-50'>
                    <div className='w-full space-y-1'>
                      <p className='font-medium'>
                        Thank you for your purchase!
                      </p>
                      <p>www.konkmeng.site</p>
                      <div className='pt-2 flex justify-center items-center gap-1'>
                        <div className='h-px w-16 bg-slate-300'></div>
                        <span>★</span>
                        <div className='h-px w-16 bg-slate-300'></div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

InvoicePage