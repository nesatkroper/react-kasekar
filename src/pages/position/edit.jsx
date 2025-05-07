import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getPositions } from "@/contexts/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@/contexts/reducer/department-slice";
import { useFormHandler } from "@/hooks/use-form-handler";
import { FormComboBox, FormInput, FormTextArea } from "@/components/app/form";
import { Check, Loader } from "lucide-react";
import { showToast } from "@/components/app/toast";
import { toast } from "sonner";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PositionEdit = ({ items = {}, onSuccess }) => {
  const dispatch = useDispatch();
  const { data: depData } = useSelector((state) => state.departments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, handleChange, resetForm } = useFormHandler({
    departmentId: items?.departmentId || "",
    positionName: items?.positionName || "",
    memo: items?.memo || "",
  });

  console.table(items);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });
    try {
      const response = await axiosAuth.put(
        `/position/${items.positionId}`,
        formData
      );

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.positionName} Update Successfully.`,
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
      dispatch(getPositions({ status: "all", department: true }));
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to update position", "error");
      console.log(e);
    }
  };
  return (
    <DialogContent className='max-w-[350px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Position Edit Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
          <FormInput
            onCallbackInput={handleChange}
            name='positionName'
            value={formData.positionName}
            label='Position Name*'
            placeholder='IT, Finance, ...'
            required
          />
          <FormInput
            inputClass='uppercase'
            label='Position Code'
            value={items.positionCode}
            readonly
          />

          <FormComboBox
            onCallbackSelect={(val) => handleChange("departmentId", val)}
            name='departmentId'
            label='Department'
            item={depData || []}
            optID='departmentId'
            optLabel='departmentName'
            defaultValue={items?.departmentId || ""}
          />

          <FormTextArea
            onCallbackInput={handleChange}
            label='Decription'
            name='memo'
            value={formData?.memo}
            placeholder='N/A'
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

PositionEdit.propTypes = {
  items: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default PositionEdit;
