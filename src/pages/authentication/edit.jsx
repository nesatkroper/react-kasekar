import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axiosAuth from "@/lib/axios-auth";
import { FormComboBox, FormInput } from "@/components/app/form";
import { showToast } from "@/components/app/toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/contexts/reducer/auth-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { Check, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getRoles } from "@/contexts/reducer";

const AuthenticationEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const { data: rolData } = useSelector((state) => state.roles);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentId: items?.departmentId,
    email: items?.email,
    password: items?.password,
    role: items?.role,
  });

  console.log(rolData);

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
    getRoles();
  }, [dispatch]);

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
          <FormInput
            onCallbackSelect={(e) => handleChange("departmentId", e)}
            name='departmentId'
            label='Employee'
            value={`${items?.employee?.firstName} ${items?.employee?.lastName}`}
            readonly
            required
          />
          <FormComboBox
            onCallbackSelect={(e) => handleChange("roleId", e)}
            name='roleId'
            label='Role'
            item={rolData}
            optID='roleId'
            optLabel='name'
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
