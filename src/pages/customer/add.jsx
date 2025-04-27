import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "@/lib/axios-instance";
import { useFormHandler } from "@/hooks/use-form-handler";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { Loader } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormComboBox, FormInput } from "@/components/app/form";
import { getCustomers } from "@/contexts/reducer/customer-slice";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";

const CustomerAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, resetForm, handleChange } = useFormHandler({
    status: "active",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosInstance.post("/customer", formData);

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.lastName} ${formData.firstName} Add Successfully.`,
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
      dispatch(getCustomers());
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add customer", "error");
      console.log("Submission error:", e);
    }
  };

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle className='text-md'>Customer Details</DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid sm:grid-cols-2 gap-3 mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='First Name*'
            name='firstName'
            placeholder='John, ...'
            required
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Last Name*'
            name='lastName'
            placeholder='Doe, ...'
            required
          />
          <FormComboBox
            item={GENDER}
            optID='value'
            optLabel='label'
            name='gender'
            label='Gender'
            onCallbackSelect={(event) => handleChange("gender", event)}
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Phone Number*'
            name='phone'
            type='number'
            placeholder='010280202'
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

CustomerAdd.propTypes = {
  lastCode: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default CustomerAdd;
