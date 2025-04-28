import React, { useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useFormHandler } from "@/hooks/use-form-handler";
import { getCategorys } from "@/contexts/reducer/category-slice";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import { Check, Loader } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormImagePreview,
  FormImageResize,
  FormInput,
  FormTextArea,
} from "@/components/app/form";
import PropTypes from "prop-types";

const CategoryAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formData,
    resetForm,
    handleChange,
    handleImageData,
    getFormDataForSubmission,
  } = useFormHandler({
    picture: "",
    categoryName: "",
    categoryCode: "",
    memo: "",
    status: "active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const submissionData = getFormDataForSubmission();
      const response = await axiosInstance.post("/category", submissionData);

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.categoryName} Add Successfully.`,
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
      dispatch(getCategorys());
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add category", "error");
      console.log(err);
    }
  };

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <DialogHeader>
          <DialogTitle className='text-md'>Category Details</DialogTitle>
        </DialogHeader>
        <Separator />

        <div className='grid sm:grid-cols-2 gap-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='Product Category Name*'
            name='categoryName'
            type='text'
          />
          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={400}
          />
          <FormTextArea
            onCallbackInput={handleChange}
            name='memo'
            label='Description'
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

CategoryAdd.propTypes = {
  onSuccess: PropTypes.func,
};

export default CategoryAdd;
