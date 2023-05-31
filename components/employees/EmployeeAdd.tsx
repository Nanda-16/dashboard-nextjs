"use client";
import { createEmployee } from "@/redux/features/employeeSlice";
import Alert from "../common/Alert";
import Card from "../common/Card";
import Container from "../common/Container";
import EmployeeForm from "./EmployeeForm";
import { EmployeeType } from "./EmployeeHome";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/userSlice";
import { useState } from "react";

function EmployeeAdd() {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (data: EmployeeType) => {
    try {
      const token = user_data.access_token;

      const formData = new FormData();
      formData.append("first_name", data.first_name ?? "");
      formData.append("last_name", data.last_name ?? "");
      formData.append("date_of_birth", data.date_of_birth ?? "");
      formData.append("join_date", data.join_date ?? "");
      formData.append("email", data.email ?? "");
      formData.append("gender", data.gender ?? "");
      formData.append("permanent_address", data.permanent_address ?? "");
      formData.append("present_address", data.present_address ?? "");
      formData.append("status", data.status ?? "");
      formData.append("profile_picture", data.profile_picture ?? "");
      formData.append("resume", data.resume ?? "");
      formData.append("mobile", data.mobile ? (data.mobile as string) : "");
      formData.append(
        "designation_id",
        data.designation_id ? (data.designation_id as string) : ""
      );
      formData.append(
        "landline",
        data.landline ? (data.landline as string) : ""
      );

      const response = await dispatch(createEmployee({ token, formData }));

      if (response && response.payload) {
        setMessage(
          response.payload.message
            ? response.payload.message
            : response.payload.error
        );
        setError(response.payload.error);
      } else {
        setMessage("Something went wrong");
        setError(true);
      }

      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="w-full">
      <Alert
        variant={error ? "danger" : "success"}
        title={error ? "Failed" : "Success"}
        message={message}
        close
        show={toast}
      />
      <Card className="px-3 sm:px-8 pt-2 w-2/3">
        <Card.Header className="bg-white border-none grid grid-cols-7 gap-0">
          <Card.Title>Add Employee</Card.Title>
        </Card.Header>

        <EmployeeForm onSubmit={handleSubmit} />
      </Card>
    </Container>
  );
}

export default EmployeeAdd;
