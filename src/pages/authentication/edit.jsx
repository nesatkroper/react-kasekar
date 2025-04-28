import { FormComboBox, FormInput, FormSelect } from "@/components/app/form";
import { showToast } from "@/components/app/toast";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ROLE } from "@/constants/role";
import { getAuth } from "@/contexts/reducer/auth-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import axiosAuth from "@/lib/axios-auth";
import { Check, Loader } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AuthenticationEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const { data: empData } = useSelector((state) => state.employees);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentId: items?.departmentId,
    email: items?.email,
    password: items?.password,
    role: items?.role,
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
      dispatch(getAuth());
    } catch (err) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add customer", "error");
      console.log(err);
    }
  };

  return (
    <DialogContent className='max-w-[350px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Authentication Edit Information.
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
            value={formData.email}
            label='Email*'
            placeholder='someone@something.com'
            required
            readonly
          />
          <FormInput
            onCallbackInput={handleChange}
            name='password'
            label='New Password*'
            placeholder='1234'
            required
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

AuthenticationEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default AuthenticationEdit;
