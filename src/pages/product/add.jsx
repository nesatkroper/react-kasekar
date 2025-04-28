import React, { useEffect, useState } from "react";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import axiosInstance from "@/lib/axios-instance";
import PropTypes from "prop-types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/contexts/reducer/product-slice";
import { getCategorys } from "@/contexts/reducer/category-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import { Check, Loader } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductAdd = ({ onSuccess }) => {
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
    productName: "",
    productCode: "",
    categoryId: "",
    picture: "",
    discountRate: 0,
    status: "active",
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const submissionData = getFormDataForSubmission();
      const response = await axiosInstance.post("/product", submissionData);

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.departmentName} Add Successfully.`,
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
      dispatch(getProducts());
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add department", "error");
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
            Product Details Information
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3 mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='Product Name*'
            name='productName'
            type='text'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("categoryId", event)}
            label='Category*'
            item={pcaData}
            optID='categoryId'
            optLabel='categoryName'
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Price*'
            name='price'
            type='number'
            placeholder='$ 39.99'
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Discount Rate*'
            name='discountRate'
            type='number'
            placeholder='5 %'
            step={1}
          />
          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={400}
          />
          <FormImagePreview
            imgSrc={
              formData.picture ? URL.createObjectURL(formData.picture) : null
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

ProductAdd.propTypes = {
  onSuccess: PropTypes.func,
};

export default ProductAdd;
