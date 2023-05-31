import { useEffect, useState } from "react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { useAppSelector } from "@/redux/hooks";
import { selectEmployee } from "@/redux/features/employeeSlice";
import { EmployeeType } from "./EmployeeHome";

interface FormProps {
  show: boolean;
  employee_id?: string | number;
  onClose: () => void;
  onSubmit: (id: string | number) => void;
  onCancel: () => void;
}

export default function EmployeeModal({
  show,
  employee_id,
  onClose,
  onSubmit,
  onCancel,
}: FormProps) {
  const { employees } = useAppSelector(selectEmployee);
  const [editEmployee, setEditEmployee] = useState<EmployeeType | null>(null);

  useEffect(() => {
    if (employee_id && employees) {
      const employee = employees.find(
        (employee) => employee.id === employee_id
      );
      if (employee) setEditEmployee(employee);
    }
  }, []);

  const handleDelete = () => {
    if (employee_id) onSubmit(employee_id);
  };

  useEffect(() => {
    if (employee_id) {
      const employee = employees?.find(
        (employee) => employee.id === employee_id
      );
      if (employee) setEditEmployee(employee);
    }
  }, [employee_id]);

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Content>
        <Modal.Body className="">
          Do you really want to remove the Employee{" "}
          {editEmployee?.first_name + " " + editEmployee?.last_name} ?
        </Modal.Body>
      </Modal.Content>

      <Modal.Footer>
        <Button
          size="default"
          variant="danger"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </Button>

        <Button
          size="default"
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
