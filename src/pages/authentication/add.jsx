import React, { useEffect, useState } from "react";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "@/contexts/reducer/employee-slice";
import { Check, Loader } from "lucide-react";
import { getAuth } from "@/contexts/reducer/auth-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { FormComboBox, FormInput, FormSelect } from "@/components/app/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { ROLE } from "@/constants/role";

const AuthenticationAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { data: empData } = useSelector((state) => state.employees);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentId: 0,
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosAuth.post("/auth/register", formData);

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(`${formData.email} Add Successfully.`, "success", false, {
            duration: 5000,
          });

        if (onSuccess) onSuccess();
        setIsSubmitting(false);
      }, 100);

      resetForm();
      dispatch(getAuth({ params: { employee: true } }));
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add customer", "error");
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[350px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Authentication Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-3 mb-3'>
          <FormComboBox
            onCallbackSelect={(e) => handleChange("departmentId", e)}
            name='departmentId'
            label='Employee'
            item={empData}
            optID='employeeId'
            optLabel='lastName'
          />
          <FormSelect
            onCallbackSelect={(e) => handleChange("role", e)}
            label='Role'
            item={ROLE}
            optID='value'
            optLabel='data'
          />

          <FormInput
            onCallbackInput={handleChange}
            name='email'
            type='email'
            label='Email*'
            placeholder='someone@something.com'
            required={true}
          />
          <FormInput
            onCallbackInput={handleChange}
            name='password'
            label='Password*'
            placeholder='1234'
            required={true}
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

AuthenticationAdd.propTypes = {
  onSuccess: PropTypes.func,
};

export default AuthenticationAdd;
