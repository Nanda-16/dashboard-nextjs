"use client";
import withAuth from "@/app/withAuth";
import Card from "@/components/Card";
import Container from "@/components/Container";
import { editEmployee, selectEmployee } from "@/redux/features/employeeSlice";
import { selectUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { EmployeeType } from "../../page";
import EmployeeEditForm from "@/components/employees/EmployeeEditForm";
import Alert from "@/components/Alert";

interface EditEmployeeProps {
  params: {
    id: string | number;
  };
}

type UpdateData = {
  id: string | number;
  data: EmployeeType;
};

function EditEmployee({ params }: EditEmployeeProps) {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);
  const { employees } = useAppSelector(selectEmployee);
  const [employee, setEmployee] = useState<EmployeeType>();
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const editEmployee = employees?.find(
      (employee) => employee.id == params.id
    );
    if (editEmployee) setEmployee(editEmployee);
  }, []);

  const handleSubmit = async (data: UpdateData) => {
    try {
      const token = user_data.access_token;
      const id = data.id;
      const { resume, profile_image, profile_picture, ...rest } = data.data;
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Card className="px-3 sm:px-8 pt-2 w-2/3">
          <Card.Header className="bg-white border-none grid grid-cols-7 gap-0">
            <Card.Title>Edit Employee</Card.Title>

            <Card.Action>
              {toast && (
                <Alert
                  variant={error ? "danger" : "success"}
                  title={error ? "Failed" : "Success"}
                  message={message}
                  close
                />
              )}
            </Card.Action>
          </Card.Header>

          {employee && (
            <EmployeeEditForm onSubmit={handleSubmit} employee={employee} />
          )}
        </Card>
      </Container>
    </>
  );
}

export default withAuth(EditEmployee);
