import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "@/lib/axios-instance";
import { useFormHandler } from "@/hooks/use-form-handler";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Check, Loader } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import { FormComboBox, FormInput, FormTextArea } from "@/components/app/form";
import { getCustomers } from "@/contexts/reducer/customer-slice";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MapWithLocation from "@/components/app/map/getmap";
import { CameraCapture } from "@/components/app/camera";

const CustomerAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { data: empData } = useSelector((state) => state.employees);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formData: cusData,
    resetForm: resetCus,
    handleChange: handleChangeCus,
  } = useFormHandler({
    status: "active",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    employeeId: "",
  });

  const {
    formData: infoData,
    resetForm: resetInfo,
    handleChange: handleChangeInfo,
    handleImageData,
    getFormDataForSubmission,
  } = useFormHandler({
    customerId: "",
    picture: "",
    region: "",
    email: "",
    address: "",
    country: "",
    note: "",
    status: "",
  });

  const handleGetImages = (img) => {
    alert(img);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosInstance.post("/customer", cusData);

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${cusData.lastName} ${cusData.firstName} Add Successfully.`,
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
      showToast("Failed to add customer", "error");
      console.log("Submission error:", e);
    }
  };

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <Tabs defaultValue='default'>
        <TabsList className='w-[93%] flex items-center justify-between'>
          <TabsTrigger className='w-full' value='default'>
            Default
          </TabsTrigger>
          <TabsTrigger className='w-full' value='detail'>
            Detail
          </TabsTrigger>
          <TabsTrigger className='w-full' value='address'>
            Address
          </TabsTrigger>
        </TabsList>
        <TabsContent value='default'>
          <form onSubmit={handleSubmit} className='py-4'>
            <DialogHeader className='mb-3'>
              <DialogTitle className='text-md text-center'>
                Customer Details
              </DialogTitle>
            </DialogHeader>
            <Separator className='my-3' />
            <div className='grid sm:grid-cols-2 gap-3 mb-3'>
              <FormInput
                onCallbackInput={handleChangeCus}
                label='First Name'
                name='firstName'
                placeholder='John, ...'
                required
              />
              <FormInput
                onCallbackInput={handleChangeCus}
                label='Last Name'
                name='lastName'
                placeholder='Doe, ...'
                required
              />
              <FormComboBox
                item={empData}
                optID='employeeId'
                optLabel='lastName'
                name='employeeId'
                label='Employee Member'
                onCallbackSelect={(event) =>
                  handleChangeCus("employeeId", event)
                }
                required
              />
              <FormComboBox
                item={GENDER}
                optID='value'
                optLabel='label'
                name='gender'
                label='Gender'
                onCallbackSelect={(event) => handleChangeCus("gender", event)}
                required
              />
              <FormInput
                onCallbackInput={handleChangeCus}
                label='Phone Number'
                name='phone'
                type='number'
                placeholder='010280202'
                required
              />
            </div>
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? <Loader className='animate-spin' /> : <Check />}
              Submit
            </Button>
          </form>
        </TabsContent>
        <TabsContent value='detail'>
          <form onSubmit={handleSubmit} className='py-4'>
            <DialogHeader className='mb-3'>
              <DialogTitle className='text-md text-center'>
                Customer Infomations
              </DialogTitle>
            </DialogHeader>
            <Separator className='my-3' />
            <div className='grid sm:grid-cols-2 gap-3 mb-3'>
              <FormInput
                onCallbackInput={handleChangeInfo}
                label='Region'
                name='region'
                placeholder='khmer'
                required
              />

              <FormInput
                onCallbackInput={handleChangeInfo}
                label='Email Address'
                name='email'
                placeholder='someone@something.com'
              />

              <FormTextArea />

              <FormComboBox
                item={empData}
                optID='employeeId'
                optLabel='lastName'
                name='employeeId'
                label='Employee Member'
                onCallbackSelect={(event) =>
                  handleChangeInfo("employeeId", event)
                }
                required
              />

              <FormComboBox
                item={GENDER}
                optID='value'
                optLabel='label'
                name='gender'
                label='Gender'
                onCallbackSelect={(event) => handleChangeInfo("gender", event)}
                required
              />

              <FormInput
                onCallbackInput={handleChangeInfo}
                label='Phone Number'
                name='phone'
                type='number'
                placeholder='010280202'
                required
              />
            </div>
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? <Loader className='animate-spin' /> : <Check />}
              Submit
            </Button>
          </form>
        </TabsContent>
        <TabsContent value='address'>
          <form onSubmit={handleSubmit} className='py-4'>
            <DialogHeader className='mb-3'>
              <DialogTitle className='text-md text-center'>
                Customer Address
              </DialogTitle>
            </DialogHeader>
            <Separator className='my-3' />
            <div className='grid sm:grid-cols-2 gap-3 mb-3'>
              <FormComboBox
                item={empData}
                optID='employeeId'
                optLabel='lastName'
                name='employeeId'
                label='Employee Member'
                onCallbackSelect={(event) =>
                  handleChangeInfo("employeeId", event)
                }
                required
              />
              <FormComboBox
                item={empData}
                optID='employeeId'
                optLabel='lastName'
                name='employeeId'
                label='Employee Member'
                onCallbackSelect={(event) =>
                  handleChangeInfo("employeeId", event)
                }
                required
              />
            </div>
            <MapWithLocation height='300px' />
            <CameraCapture onGetImage={handleGetImages} />
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full mt-4'>
              {isSubmitting ? <Loader className='animate-spin' /> : <Check />}
              Submit
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

CustomerAdd.propTypes = {
  lastCode: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default CustomerAdd;
