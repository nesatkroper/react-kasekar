import React, { useState } from "react";
import PropTypes from "prop-types";
import axiosAuth from "@/lib/axios-auth";
import { useFormHandler } from "@/hooks/use-form-handler";
import { showToast } from "@/components/app/toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { FormInput, FormTextArea } from "@/components/app/form";
import { toast } from "sonner";
import { Check, Loader } from "lucide-react";
import { getDepartments } from "@/contexts/reducer/department-slice";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DepartmentAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formData, resetForm, handleChange } = useFormHandler({
    departmentName: "",
    memo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = showToast("Loading...", "info", true, {
      description: "Please wait",
    });

    try {
      const response = await axiosAuth.post("/department", formData);

      setTimeout(() => {
        toast.dismiss(toastId);

        if (response.status === 201)
          showToast(
            `${formData.departmentName} Add Successfully.`,
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
      dispatch(getDepartments({ params: { status: "all" } }));
    } catch (e) {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      showToast("Failed to add department", "error");
      console.log(e);
    }
  };

  return (
    <DialogContent className='max-w-[350px] p-4'>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle className='text-md'>
            Department Details Information.
          </DialogTitle>
        </DialogHeader>
        <Separator className='my-3' />
        <div className='grid gap-4'>
          <FormInput
            onCallbackInput={handleChange}
            name='departmentName'
            value={formData.departmentName}
            label='Department Name*'
            type='text'
            placeholder='IT, Finance, ...'
            required={true}
          />
          <FormTextArea
            onCallbackInput={handleChange}
            label='Decription'
            name='memo'
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

DepartmentAdd.propTypes = {
  lastCode: PropTypes.number,
  onSuccess: PropTypes.func,
};

export default DepartmentAdd;
