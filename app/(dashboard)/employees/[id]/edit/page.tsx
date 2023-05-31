import EmployeeEdit from "@/components/employees/EmployeeEdit";

export const metadata = {
  title: "Edit Employee - Employee Mananager",
};

interface EditEmployeeProps {
  params: {
    id: string | number;
  };
}

function EditEmployee({ params }: EditEmployeeProps) {
  return <EmployeeEdit id={params.id} />;
}

export default EditEmployee;
