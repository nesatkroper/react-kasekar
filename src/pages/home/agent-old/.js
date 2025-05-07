const filteredCustomerInfos = customerInfos.filter(
  (info) =>
    info.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    info.region?.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredAddresses = addresses.filter(
  (address) =>
    address.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.stateName.toLowerCase().includes(searchTerm.toLowerCase())
);

<TabsContent value='info' className='m-0'>
                  <div className='rounded-md border'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className='w-[60px]'>Photo</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className='hidden md:table-cell'>
                            Region
                          </TableHead>
                          <TableHead className='hidden lg:table-cell'>
                            Gov ID
                          </TableHead>
                          <TableHead className='hidden xl:table-cell'>
                            Gov Expires
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomerInfos.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className='h-24 text-center'>
                              No customer information found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCustomerInfos.map((info) => (
                            <TableRow key={info.customerId}>
                              <TableCell>
                                <div className='relative h-10 w-10 rounded-full overflow-hidden'>
                                  <image
                                    src={
                                      info.picture ||
                                      "/placeholder.svg?height=40&width=40"
                                    }
                                    alt='Customer'
                                    className='object-cover'
                                  />
                                </div>
                              </TableCell>
                              <TableCell className='font-medium max-w-[120px] sm:max-w-[180px] md:max-w-[220px]'>
                                <div className='truncate' title={info.email}>
                                  {info.email}
                                </div>
                              </TableCell>
                              <TableCell className='hidden md:table-cell'>
                                {info.region}
                              </TableCell>
                              <TableCell className='hidden lg:table-cell'>
                                {info.govId}
                              </TableCell>
                              <TableCell className='hidden xl:table-cell'>
                                {info.govExpire?.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    info.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }>
                                  {info.status}
                                </Badge>
                              </TableCell>
                              <TableCell className='text-right'>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      className='h-8 w-8 p-0'>
                                      <span className='sr-only'>Open menu</span>
                                      <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align='end'>
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      View details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Edit information
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      View government ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-destructive'>
                                      Delete information
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value='addresses' className='m-0'>
                  <div className='rounded-md border'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Location</TableHead>
                          <TableHead className='hidden md:table-cell'>
                            Coordinates
                          </TableHead>
                          <TableHead className='hidden lg:table-cell'>
                            Created
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAddresses.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className='h-24 text-center'>
                              No addresses found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredAddresses.map((address) => (
                            <TableRow key={address.addressId}>
                              <TableCell className='font-medium'>
                                {address.cityName}, {address.stateName}
                              </TableCell>
                              <TableCell className='hidden md:table-cell'>
                                {address.latitude.toFixed(4)},{" "}
                                {address.longitude.toFixed(4)}
                              </TableCell>
                              <TableCell className='hidden lg:table-cell'>
                                {address.createdAt.toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    address.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }>
                                  {address.status}
                                </Badge>
                              </TableCell>
                              <TableCell className='text-right'>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      className='h-8 w-8 p-0'>
                                      <span className='sr-only'>Open menu</span>
                                      <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align='end'>
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      View on map
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Edit address
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-destructive'>
                                      Delete address
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent> 
