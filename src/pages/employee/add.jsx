import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import { GENDER } from "@/utils/default-data";
import { useFormHandler } from "@/hooks/use-form-handler";
import { getDepartments, getEmployees, getPositions } from "@/contexts/reducer";
import { FormComboBox, FormDatePicker, FormInput } from "@/components/app/form";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EmployeeAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: depData } = useSelector((state) => state.departments);
  const { data: posData } = useSelector((state) => state.positions);
  const { formData, resetForm, handleChange } = useFormHandler({
    status: "active",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    positionId: "",
    departmentId: "",
    salary: "",
    hiredDate: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosAuth.post("/employee", formData);

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
      dispatch(
        getEmployees({ params: { status: "all", info: true, position: true } })
      );
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add employee", "error");
      console.error("Submission error:", e);
    }
  };

  useEffect(() => {
    dispatch(getDepartments({ params: { positions: true } }));
    dispatch(getPositions());
  }, [dispatch]);

  const filteredPositions = posData.filter(
    (pos) => pos.departmentId === formData.departmentId
  );

  return (
    <DialogContent className='max-w-[500px] p-4'>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>Employee Details</DialogTitle>
        </DialogHeader>
        <Separator className='my-2' />
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
            label='Phone Number'
            name='phone'
            placeholder='010280202'
          />

          <FormDatePicker
            onCallbackPicker={(event) => handleChange("dob", event)}
            label='Date of Birth*'
          />
          <FormDatePicker
            onCallbackPicker={(event) => handleChange("hiredDate", event)}
            label='Hired Date*'
          />

          <FormComboBox
            onCallbackSelect={(event) => handleChange("departmentId", event)}
            label='Department*'
            item={depData}
            optID='departmentId'
            optLabel='departmentName'
          />
          <FormComboBox
            onCallbackSelect={(event) => handleChange("positionId", event)}
            label='Position*'
            item={filteredPositions}
            optID='positionId'
            optLabel='positionName'
          />

          <FormInput
            onCallbackInput={handleChange}
            label='Salary*'
            name='salary'
            placeholder='$250.00'
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

EmployeeAdd.propTypes = {
  lastCode: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default EmployeeAdd;
