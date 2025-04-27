import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { Loader } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import { getCustomers } from "@/contexts/reducer/customer-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { getCities, getStates } from "@/contexts/reducer";
import { showToast } from "@/components/app/toast";
import { FormComboBox, FormInput } from "@/components/app/form";
import { toast } from "sonner";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CustomerEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, resetForm, handleChange } = useFormHandler({
    picture: items?.picture,
    firstName: items?.firstName,
    lastName: items?.lastName,
    gender: items?.gender,
    phone: items?.phone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosInstance.put(
        `/customer/${items.customerId}`,
        formData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.lastName} ${formData.firstName} Update Successfully.`,
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
      showToast("Failed to update department", "error");
      console.log("Submission error:", e);
    }
  };

  useEffect(() => {
    dispatch(getStates({ status: "all" }));
    dispatch(getCities({ status: "all" }));
  }, [dispatch]);

  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='grid sm:grid-cols-2 gap-3 mb-3'>
          <FormInput
            onCallbackInput={handleChange}
            label='First Name*'
            name='firstName'
            value={formData?.firstName}
            placeholder='John, ...'
            required
          />
          <FormInput
            onCallbackInput={handleChange}
            label='Last Name*'
            name='lastName'
            value={formData?.lastName}
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
            value={formData?.phone}
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

CustomerEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default CustomerEdit;
