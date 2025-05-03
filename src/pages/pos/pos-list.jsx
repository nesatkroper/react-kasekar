import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { defimg } from "@/utils/resize-crop-image";
import { apiUrl } from "@/constants/api";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "@/contexts/reducer/cart-slice";
import { Plus } from "lucide-react";
import { cDollar } from "@/utils/dec-format";
import { getMe } from "@/contexts/reducer";

const POSList = ({ data = {} }) => {
  const dispatch = useDispatch();
  const { data: crtData } = useSelector((state) => state.cart);
  const { data: meData } = useSelector((state) => state.me);

  const handleAddToCart = async (item) => {
    const isAlreadyAdd = crtData?.some(
      (cartItem) => cartItem.productId === item.productId
    );
    console.log("Is already added:", isAlreadyAdd);

    try {
      if (!isAlreadyAdd) {
        const newItem = { authId: meData[0].authId, productId: item.productId };
        const response = await axiosAuth.post("/cart", newItem);
        dispatch(getCarts({ id: meData[0].authId }));
        console.log("Cart submitted successfully:", response.data);
      } else {
        try {
          const cartItem = crtData.find(
            (cItem) => cItem.productId === item.productId
          );

          const cartID = cartItem ? cartItem.cartId : null;
          const inc = await axiosAuth.put(`/cart/inc/${cartID}`);
          dispatch(getCarts({ id: meData[0].authId }));
          console.log("Item is already in the cart.", inc);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log("Error submitting cart:", error);
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3'>
      {data?.map((item) => (
        <Card
          key={item.productId}
          onClick={() => handleAddToCart(item)}
          className='relative cursor-pointer'>
          <CardContent className='p-0 relative'>
            <Button
              type='button'
              className='absolute top-2 left-2 h-6 font-normal px-2'>
              <Plus /> Note
            </Button>

            <img
              src={`${apiUrl}/uploads/${item?.picture}`}
              crossOrigin='anonymous'
              onError={(e) => (e.target.src = defimg)}
              alt={item?.productName}
              className='rounded-t-lg h-full w-full object-cover'
            />
            <div className='px-3 pt-1 flex justify-between'>
              <p className='font-semibold'>{item?.productName}</p>
              <p className='font-bold text-red-500'>
                {cDollar(item?.sellPrice)}
              </p>
            </div>
            <div className='px-3 pb-2 flex justify-between text-xs'>
              <p className='text-sm'>
                {item?.category?.categoryName ?? "Uncategorized"}
              </p>
              <p className='font-bold text-red-500'>
                {item?.discountRate <= 0
                  ? ""
                  : `- ${cDollar(item?.price, item?.discountRate)}`}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

POSList.propTypes = {
  data: PropTypes.array,
};

export default POSList;
