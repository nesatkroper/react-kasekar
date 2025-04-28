import React, { useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import FormInput from "@/components/app/form/form-input";
import PropTypes from "prop-types";
import FormTextArea from "@/components/app/form/form-textarea";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { apiUrl } from "@/constants/api";
import { getCategorys } from "@/contexts/reducer/category-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { Check, Loader } from "lucide-react";
import { toast } from "sonner";
import { showToast } from "@/components/app/toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CategoryEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formData,
    getFormDataForSubmission,
    handleChange,
    handleImageData,
    resetForm,
  } = useFormHandler({
    picture: items?.picture,
    categoryName: items?.categoryName,
    categoryCode: items?.categoryCode,
    memo: items?.memo,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const submissionData = getFormDataForSubmission();
      const response = await axiosInstance.put(
        `/category/${items.categoryId}`,
        submissionData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.categoryName} Update Successfully.`,
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
      showToast("Failed to update department", "error");
      console.log(err);
    }
  };

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle className='text-md'>
            Product Category Details Information
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3'>
          <FormInput
            onCallbackInput={handleChange}
            name='categoryName'
            value={formData.categoryName || ""}
            label='Category Name'
          />
          <FormImageResize
            onCallbackFormData={handleImageData}
            resolution={600}
          />
          <FormTextArea
            onCallbackInput={handleChange}
            label='Description'
            name='memo'
            value={formData.memo || "N/A"}
            rows={7}
          />
          <FormImagePreview
            imgSrc={
              formData.picture
                ? `${apiUrl}/uploads/${formData.picture}`
                : formData.picture
                ? URL.createObjectURL(formData.picture)
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

CategoryEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default CategoryEdit;
