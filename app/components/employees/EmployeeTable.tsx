import Card from "../common/Card";
import Table from "../Table";
import Link from "next/link";
import Button from "../common/Button";
import moment from "moment";
import PaginationComponent from "../Pagination";
import { getEmployees } from "@/redux/features/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/userSlice";

interface EmployeeTable {
  headings: string[];
  data: EmployeeType[] | null;
  handleDeleteModal: (id: string | number) => void;
  pages?: number;
}

export default function EmployeeTable({
  headings,
  data,
  handleDeleteModal,
  pages,
}: EmployeeTable) {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);

  const handlePageChange = (page: number) => {
    const token = user_data?.access_token;
    if (token) dispatch(getEmployees({ token, page: page }));
  };

  const getDate = (date: string) => {
    const formatted_date = moment(date).format("DD-MM-YYYY");
    return formatted_date;
  };

  return (
    <>
      <div className="flex justify-end">
        <PaginationComponent
          maxPageNumber={3}
          pageLength={pages ?? 0}
          onPageChange={handlePageChange}
        />
      </div>

      <Card.Body>
        {data && data.length > 0 ? (
          <>
            <Table columnHeads={headings}>
              {data?.map((data, index) => (
                <Table.Body key={index}>
                  <Table.Row>{data?.id}</Table.Row>

                  <Table.Row>
                    {data?.first_name + " " + data?.last_name}
                  </Table.Row>

                  <Table.Row>{getDate(data?.join_date ?? "")}</Table.Row>
                  <Table.Row>{getDate(data?.date_of_birth ?? "")}</Table.Row>

                  <Table.Row>{data?.gender}</Table.Row>
                  <Table.Row>{data?.email}</Table.Row>

                  <Table.Row>
                    <div className="flex">
                      <Link
                        href={`/employees/${data?.id}/edit`}
                        className="m-0 p-0"
                      >
                        <Button
                          size="default"
                          variant="icon-primary"
                          className="rounded p-1 rounded-r-none"
                          title="Edit Employee"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Button>
                      </Link>

                      <Button
                        size="default"
                        variant="icon-danger"
                        className="rounded p-1 rounded-l-none"
                        title="Remove Employee"
                        onClick={() => handleDeleteModal(data.id ?? "")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </Button>
                    </div>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <>
            <Table columnHeads={headings}> </Table>
            <div className="w-full text-center py-5">No Data Found !!!</div>
          </>
        )}
      </Card.Body>
    </>
  );
}
