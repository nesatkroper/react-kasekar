import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Check, Loader } from "lucide-react";
import { GENDER, REGION } from "@/utils/default-data";
import { getCustomers } from "@/contexts/reducer/customer-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";
import { FormComboBox, FormInput } from "@/components/app/form";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getCustomerInfos } from "@/contexts/reducer";

const CustomerEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const { data: infData } = useSelector((state) => state.cusinfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formData: cusData,
    resetForm: resetCus,
    handleChange,
  } = useFormHandler({
    picture: items?.picture,
    firstName: items?.firstName,
    lastName: items?.lastName,
    gender: items?.gender,
    phone: items?.phone,
  });

  const { formData: infoData, resetForm: resetInfo } = useFormHandler({
    picture: infData?.picture,
    region: infData.region,
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
        cusData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${cusData.lastName} ${cusData.firstName} Update Successfully.`,
            "success",
            false,
            {
              duration: 5000,
            }
          );

        if (onSuccess) onSuccess();
        setIsSubmitting(false);
      }, 100);

      resetCus();
      dispatch(getCustomers());
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to update department", "error");
      console.log("Submission error:", e);
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosInstance.put(
        `/customer/info/${items.customerId}`,
        cusData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${cusData.lastName} ${cusData.firstName} Update Successfully.`,
            "success",
            false,
            {
              duration: 5000,
            }
          );

        if (onSuccess) onSuccess();
        setIsSubmitting(false);
      }, 100);

      resetCus();
      dispatch(getCustomers());
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to update department", "error");
      console.log("Submission error:", e);
    }
  };

  useEffect(() => {
    dispatch(getCustomerInfos({ id: items.customerId }));
  }, [dispatch]);

  console.log(infData);

  return (
    <DialogContent className='p-6'>
      <DialogTitle></DialogTitle>
      <Tabs defaultValue='customer' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='customer'>Customer</TabsTrigger>
          <TabsTrigger value='customerinfo'>Customer Info</TabsTrigger>
        </TabsList>
        <TabsContent value='customer'>
          <Label className='text-md'>Customer Details</Label>
          <Separator className='my-3' />
          <form onSubmit={handleSubmit}>
            <div className='grid sm:grid-cols-2 gap-3 mb-3'>
              <FormInput
                onCallbackInput={handleChange}
                label='First Name*'
                name='firstName'
                value={cusData?.firstName}
                placeholder='John, ...'
                required
              />
              <FormInput
                onCallbackInput={handleChange}
                label='Last Name*'
                name='lastName'
                value={cusData?.lastName}
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
                value={cusData?.phone}
                type='tel'
                placeholder='010280202'
              />
            </div>

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? <Loader className='animate-spin' /> : <Check />}
              Submit
            </Button>
          </form>
        </TabsContent>
        <TabsContent value='customerinfo'>
          <Label className='text-md'>Customer Info</Label>
          <Separator className='my-3' />
          <form onSubmit={handleSubmitInfo}>
            <div className='grid sm:grid-cols-2 gap-3 mb-3'>
              <FormComboBox
                item={REGION}
                optID='value'
                optLabel='label'
                name='region'
                label='Region'
                onCallbackSelect={(event) => handleChange("region", event)}
              />
              <FormInput
                onCallbackInput={handleChange}
                label='Email'
                name='email'
                type='email'
                placeholder='example@something.com'
                required
              />
              <FormInput
                onCallbackInput={handleChange}
                label='Last Name*'
                name='lastName'
                placeholder='Doe, ...'
                required
              />

              <FormInput
                onCallbackInput={handleChange}
                label='Phone Number*'
                name='phone'
                type='tel'
                placeholder='010280202'
              />
            </div>
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? <Loader className='animate-spin' /> : <Check />}
              Submit
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

CustomerEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default CustomerEdit;
