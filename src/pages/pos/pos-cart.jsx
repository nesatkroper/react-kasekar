import React, { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import axiosAuth from "@/lib/axios-auth";
import Invoice from "@/components/app/admin/invoice";
import RequestKHQR from "@/components/app/admin/khqr/request-khqr";
import PropTypes from "prop-types";
import { afterPerDollar, cDollar, toUnit } from "@/utils/dec-format";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/constants/api";
import { getMe, getCarts } from "@/contexts/reducer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TaxRate = 10;

const POSCart = () => {
  const dispatch = useDispatch();
  const { data: meData } = useSelector((state) => state.me);
  const { data: crtData } = useSelector((state) => state.cart);

  const { total, discount, finalAmount } = useMemo(() => {
    const total =
      crtData?.reduce(
        (sum, item) => sum + (item?.product?.price || 0) * (item.quantity || 0),
        0
      ) || 0;

    const discount =
      crtData?.reduce(
        (sum, item) =>
          sum +
          ((item?.product?.price || 0) *
            (item.quantity || 0) *
            (item.product?.discountRate || 0)) /
            100,
        0
      ) || 0;

    const tax = total * (TaxRate / 100);
    const finalAmount = total + tax - discount;

    Cookies.set("finalAmount", finalAmount, {
      expires: 1,
    });

    console.log({ total, discount, tax, finalAmount });

    return { total, tax, discount, finalAmount };
  }, [crtData]);

  const handleQuantityChange = async (cartId, action) => {
    try {
      const url =
        action === "up" ? `/cart/inc/${cartId}` : `/cart/dec/${cartId}`;
      await axiosAuth.put(url);
      dispatch(getCarts({ id: meData?.authId }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getMe());
    dispatch(getCarts({ id: meData?.authId }));
  }, [dispatch]);

  console.log(crtData);

  const renderCartItem = (item) => (
    <Card key={item.cartId} className='shadow-none rounded-md'>
      <CardContent className='p-0 flex justify-between'>
        <div className='flex gap-3'>
          <img
            src={`${apiUrl}/uploads/${item.product?.picture}`}
            onError={(e) => (e.target.src = defimg)}
            alt={item?.product?.productName}
            className='h-[60px] object-cover rounded-s-md'
          />
          <div className='flex flex-col justify-between py-1'>
            <p className='text-sm'>{item.product?.productName}</p>
            <p className='text-red-700 text-sm'>
              {afterPerDollar(
                item.product?.price * item.quantity,
                item.product?.discountRate
              )}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center font-semibold'>
          <Button
            variant='icon'
            size='icon'
            className='h-5 w-6'
            onClick={() => handleQuantityChange(item.cartId, "up")}>
            <ChevronUp className='text-green-600' />
          </Button>
          <p className='text-xs mx-2'>{toUnit(item.quantity, 0, "Pcs")}</p>
          <Button
            variant='icon'
            size='icon'
            className='h-5 w-6'
            onClick={() => handleQuantityChange(item.cartId, "down")}>
            <ChevronDown className='text-red-600' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSummary = () => (
    <div className='w-full'>
      <SummaryRow label='Total' value={cDollar(total)} />
      <SummaryRow
        label={`Tax (${TaxRate}%)`}
        value={`+ ${cDollar(total, TaxRate)}`}
      />
      <SummaryRow label='Discount' value={`- ${cDollar(discount)}`} />
      <Separator className='my-1' />
      <SummaryRow label='Amount' value={cDollar(finalAmount)} isTotal />
    </div>
  );

  const SummaryRow = ({ label, value, isTotal }) => (
    <div
      className={`flex justify-between w-full text-sm font-semibold ${
        isTotal ? "" : ""
      }`}>
      <p className='text-sm'>{label} :</p>
      <p className={`text-sm text-red-700 ${isTotal ? "font-bold" : ""}`}>
        {value}
      </p>
    </div>
  );

  return (
    <div className='2xl:col-span-1 lg:col-span-1 md:col-span-2 col-span-1 mt-0'>
      <Card className='rounded-md'>
        <CardContent className='p-2 pt-1'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-sm'>Cart Order</p>
          </div>
          <Separator className='my-2' />
          <div className='flex flex-col gap-2'>
            {crtData?.map(renderCartItem)}
          </div>
          <Separator className='my-2' />
          {renderSummary()}
          <CheckoutDialog amount={finalAmount} />
        </CardContent>
      </Card>
    </div>
  );
};

const CheckoutDialog = ({ amount }) => (
  <AlertDialog>
    <AlertDialogTrigger className='w-full' asChild>
      <Button className='w-full mt-2'>Check Out</Button>
    </AlertDialogTrigger>
    <AlertDialogContent className='w-[400px]'>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-center text-md'>
          Invoice Check Out
        </AlertDialogTitle>
      </AlertDialogHeader>
      <Separator />
      <Invoice />
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <ConfirmDialog amount={amount} />
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const ConfirmDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[350px] p-6'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <RequestKHQR />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Success</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

POSCart.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  isTotal: PropTypes.any,
};

CheckoutDialog.propTypes = {
  amount: PropTypes.number,
};

export default POSCart;
