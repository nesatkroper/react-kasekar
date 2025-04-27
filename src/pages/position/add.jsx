import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getPositions } from "@/contexts/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";
import { FormComboBox, FormInput, FormTextArea } from "@/components/app/form";
import { toast } from "sonner";
import { Loader } from "lucide-react";
// import { handleSendNotification } from "@/components/app/notification/handle-notification";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PositionAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, resetForm, handleChange } = useFormHandler({
    departmentId: 0,
    positionName: "",
    memo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosAuth.post("/position", formData);

      setTimeout(() => {
        toast.dismiss(toastId);
        // handleSendNotification(
        //   "Admin",
        //   "31007b7e-93da-47fb-9e6e-c6c9bc0f317d",
        //   "New Position Created",
        //   "Created"
        // );
        if (response.status === 201)
          showToast(
            `${formData.positionName} Add Successfully.`,
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
      dispatch(getPositions({ params: { status: "all", department: true } }));
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add position", "error");
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <DialogContent className='max-w-[350px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Position Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
          <FormInput
            onCallbackInput={handleChange}
            name='positionName'
            value={formData.departmentName}
            label='Position Name*'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormComboBox
            onCallbackSelect={(val) => handleChange("departmentId", val)}
            name='departmentId'
            label='Department'
            item={depData}
            optID='departmentId'
            optLabel='departmentName'
          />

          <FormTextArea
            onCallbackInput={handleChange}
            label='Decription'
            name='memo'
            placeholder='N/A'
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

PositionAdd.propTypes = {
  lastCode: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default PositionAdd;
