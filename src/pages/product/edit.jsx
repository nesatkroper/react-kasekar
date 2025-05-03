import React, { useEffect, useState } from "react";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/contexts/reducer/product-slice";
import { getCategorys } from "@/contexts/reducer/category-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormHandler } from "@/hooks/use-form-handler";
import PropTypes from "prop-types";
import { apiUrl } from "@/constants/api";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import { Check, Loader } from "lucide-react";

const ProductEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: pcaData } = useSelector((state) => state?.categories);
  const {
    formData,
    handleChange,
    handleImageData,
    resetForm,
    getFormDataForSubmission,
  } = useFormHandler({
    productName: items?.productName,
    productCode: items?.productCode,
    categoryId: items?.categoryId,
    picture: items?.picture,
    unit: items?.unit,
    capacity: items?.capacity,
    sellPrice: items?.sellPrice,
    costPrice: items?.costPrice,
    discountRate: items?.discountRate,
    status: items?.status,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const submissionData = getFormDataForSubmission();
      const response = await axiosInstance.put(
        `/product/${items.productId}`,
        submissionData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.productName} Update Successfully.`,
            "success",
            false,
            {
              duration: 5000,
            }
          );

        if (onSuccess) onSuccess();
        setIsSubmitting(false);
      }, 100);

      resetForm();
      dispatch(getProducts({ params: { category: true } }));
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to update department", "error");
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <DialogHeader className='mb-0'>
          <DialogTitle className='text-md'>
            Product Edit Information
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3 my-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='Product Name'
            name='productName'
            value={formData.productName}
            type='text'
            required
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Product Code'
            name='productCode'
            value={formData.productCode.toUpperCase()}
            readonly
            required
          />

          <FormComboBox
            onCallbackSelect={(event) => handleChange("categoryId", event)}
            label='Category'
            item={pcaData}
            optID='categoryId'
            optLabel='categoryName'
            required
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Product Unit'
            name='unit'
            value={formData.unit}
            type='text'
            required
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Cost Price'
            name='costPrice'
            value={formData.costPrice}
            type='number'
            placeholder='$ 39.99'
            required
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Sell Price'
            name='sellPrice'
            value={formData.sellPrice}
            type='number'
            placeholder='$ 39.99'
            required
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Discount Rate*'
            name='discountRate'
            value={formData.discountRate}
            type='number'
            placeholder='5 %'
            step={1}
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Capacity'
            name='capacity'
            value={formData.capacity}
            type='number'
            placeholder='1'
            required
          />

          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={400}
          />

          <FormImagePreview
            imgSrc={
              formData.picture instanceof File
                ? URL.createObjectURL(formData.picture)
                : formData.picture
                ? `${apiUrl}/uploads/${formData.picture}`
                : null
            }
          />
        </div>
        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? <Loader className='animate-spin' /> : <Check />}
          Submit
        </Button>
      </form>
    </DialogContent>
  );
};

ProductEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default ProductEdit;
