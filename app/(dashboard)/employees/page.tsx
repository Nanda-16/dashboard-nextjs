"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Link from "next/link";
import { useEffect, useState } from "react";
import Alert from "@/components/Alert";
import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeModal from "@/components/employees/EmployeeModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteEmployee,
  getEmployees,
  selectEmployee,
} from "@/redux/features/employeeSlice";
import { selectUser } from "@/redux/features/userSlice";
import withAuth from "@/app/withAuth";
import Loading from "@/components/Loading";

export const metadata = {
  title: "Employees - Employee Mananager",
  description: "Employee Manangement application",
};

export interface EmployeeType {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  join_date?: string;
  email?: string;
  gender?: string;
  designation_id?: string | number;
  mobile?: string | number;
  landline?: number | string;
  permanent_address?: string;
  present_address?: string;
  profile_image?: string;
  profile_picture?: string | File;
  resume?: string | File;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const tableHeads = [
  "ID",
  "Name",
  "Join Date",
  "DOB",
  "Gender",
  "Email Address",
  "Action",
];

function Employees() {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector(selectEmployee);
  const { user_data } = useAppSelector(selectUser);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState<EmployeeType[] | null>(null);
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState(false);
  const [employeeId, setEmployeeId] = useState<string | number>("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const token = user_data.access_token;
    if (token !== "") {
      setLogin(true);
      setLoading(true);
      fetchEmployees(token);
    }
  }, []);

  const fetchEmployees = async (token: string) => {
    try {
      const response = await dispatch(getEmployees({ token }));

      if (response.payload && response.payload.data) {
        setEmployeeData(employees);
        setLength(response.payload.data.last_page);
        setLoading(false);
      } else {
        setMessage("Something went wrong");
        setError(true);
        setLoading(false);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteModal = (id: string | number) => {
    setModal(true);
    setEmployeeId(id);
  };

  const closeModal = () => {
    setModal(false);
    setEmployeeId("");
  };

  const handleDelete = async (id: string | number) => {
    try {
      const token = user_data.access_token;
      const response = await dispatch(deleteEmployee({ token, id }));

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

      dispatch(getEmployees({ token }));
      closeModal();
      setLoading(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setEmployeeData(employees);
  }, [employees, getEmployees, loading]);

  return (
    <>
      <Container>
        {login ? (
          <Card className="px-3 pt-2 mt-4">
            <Card.Header className="bg-white border-none grid grid-cols-7 gap-0">
              <Card.Title>Employees</Card.Title>

              <Card.SubTitle>
                Showing {employeeData?.length} employees
              </Card.SubTitle>

              <Card.Action>
                <Link href="/employees/create">
                  <Button variant="outline-primary" size="sm">
                    + Add
                  </Button>
                </Link>

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

            {!loading ? (
              <EmployeeTable
                headings={tableHeads}
                data={employeeData}
                handleDeleteModal={handleDeleteModal}
                pages={length}
              />
            ) : (
              <Loading />
            )}
          </Card>
        ) : (
          <Loading />
        )}

        {/* modal */}
        <EmployeeModal
          show={modal}
          employee_id={employeeId}
          onSubmit={handleDelete}
          onCancel={() => setModal(false)}
          onClose={closeModal}
        />
      </Container>
    </>
  );
}

export default withAuth(Employees);
