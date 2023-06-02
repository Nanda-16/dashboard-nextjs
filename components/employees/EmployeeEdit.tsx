"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EmployeeType } from "./EmployeeHome";
import { selectUser } from "@/redux/features/userSlice";
import { editEmployee, selectEmployee } from "@/redux/features/employeeSlice";
import { useEffect, useState } from "react";
import Container from "../common/Container";
import Alert from "../common/Alert";
import Card from "../common/Card";
import EmployeeEditForm from "./EmployeeEditForm";
import { useRouter } from "next/navigation";

type UpdateData = {
  id: string | number;
  data: EmployeeType;
};

function EmployeeEdit({ id }: { id: string | number }) {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);
  const { employees } = useAppSelector(selectEmployee);
  const [employee, setEmployee] = useState<EmployeeType>();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user_data?.access_token) {
      setLoading(false);
      const editEmployee = employees?.find((employee) => employee.id == id);
      if (editEmployee) setEmployee(editEmployee);
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (data: UpdateData) => {
    try {
      const token = user_data?.access_token;
      const id = data.id;
      const { resume, profile_image, profile_picture, ...rest } = data.data;
      if (token) {
        const response = await dispatch(
          editEmployee({ token, id, formData: rest })
        );

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container loading={loading}>
      <Alert
        variant={error ? "danger" : "success"}
        title={error ? "Failed" : "Success"}
        message={message}
        show={toast}
        close
      />
      <Card className="px-3 sm:px-8 pt-2 w-2/3">
        <Card.Header className="bg-white border-none grid grid-cols-7 gap-0">
          <Card.Title>Edit Employee</Card.Title>
        </Card.Header>
        {employee && (
          <EmployeeEditForm onSubmit={handleSubmit} employee={employee} />
        )}
      </Card>
    </Container>
  );
}

export default EmployeeEdit;
