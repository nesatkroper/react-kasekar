import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useFormHandler } from "@/hooks/use-form-handler";
import { FormInput, FormTextArea } from "@/components/app/form";
import { Loader } from "lucide-react";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import { getDepartments } from "@/contexts/reducer/department-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DepartmentEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentName: items?.departmentName || "",
    memo: items?.memo || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosAuth.put(
        `/department/${items.departmentId}`,
        formData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.departmentName} Update Successfully.`,
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
      dispatch(getDepartments({ status: "all" }));
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to update department", "error");
      console.log(e);
    }
  };

  return (
    <DialogContent className='max-w-[350px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Department Update Information
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
          <FormInput
            onCallbackInput={handleChange}
            name='departmentName'
            value={formData.departmentName}
            label='Department Name*'
            type='text'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormInput
            label='Department Code*'
            value={items.departmentCode}
            readonly
          />
          <FormTextArea
            onCallbackInput={handleChange}
            label='Description'
            name='memo'
            placeholder='N/A'
            value={formData.memo}
          />
        </div>
        <Button type='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? <Loader className='animate-spin' /> : ""}
          Submit
        </Button>
      </form>
    </DialogContent>
  );
};

DepartmentEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default DepartmentEdit;
