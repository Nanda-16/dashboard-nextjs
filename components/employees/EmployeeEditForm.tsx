"use client";
import Button from "../common/Button";
import Link from "next/link";
import Card from "../common/Card";
import { useEffect, useRef, useState } from "react";
import FormField from "../Form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDesignations } from "@/redux/features/designationSlice";
import { selectUser } from "@/redux/features/userSlice";
import { OptionProps } from "../Form";
import moment from "moment";
import Image from "next/image";
import { EmployeeType } from "./EmployeeHome";
import { DesignationType } from "../designations/DesignationHome";

type UpdateData = {
  id: string | number;
  data: EmployeeType;
};

interface FormProps {
  onSubmit: (data: UpdateData) => void;
  employee: EmployeeType;
}

type Event =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const statusOptions = [
  { value: "PERMANENT", name: "Permanent" },
  { value: "TEMPORERY", name: "Temperory" },
];

export default function EmployeeEditForm({ onSubmit, employee }: FormProps) {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);
  const [data, setData] = useState(employee);
  const [sameAddress, setSameAddress] = useState(false);
  const [selectOptions, setSelectOptions] = useState<OptionProps[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = user_data.access_token;
    dispatch(getDesignations({ token })).then((response) => {
      if (response && response.payload) {
        const designations = response.payload?.data?.data;
        const options = designations.map((option: DesignationType) => ({
          value: option.id,
          name: option.name,
        }));
        setSelectOptions(options);
      }
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnChange = (event: Event) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
    if (name === "present_address" || name === "permanent_address")
      setSameAddress(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const id = data.id ?? "";
    onSubmit({ id, data });
  };

  useEffect(() => {
    if (sameAddress) {
      const value = data.present_address;
      setData({ ...data, permanent_address: value });
    }
  }, [sameAddress]);

  const getDate = (date: string) => {
    const formatted_date = moment(date).format("YYYY-MM-DD");
    return formatted_date;
  };

  return (
      <form onSubmit={handleSubmit} id="employeeForm">
        <Card.Body className="px-4">
          <FormField>
            <FormField.Label htmlFor="employeeFirstName">
              First Name
            </FormField.Label>
            <FormField.Input
              type="text"
              id="employeeFirstName"
              name="first_name"
              ref={inputRef}
              defaultValue={data?.first_name}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeLastName">
              Last Name
            </FormField.Label>
            <FormField.Input
              type="text"
              id="employeeLastName"
              name="last_name"
              defaultValue={data?.last_name}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeJoiningDate">
              Joining Date
            </FormField.Label>
            <FormField.Input
              id="employeeJoiningDate"
              type="date"
              name="join_date"
              defaultValue={getDate(data?.join_date ?? "")}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeDateOfBirth">
              Date of Birth
            </FormField.Label>
            <FormField.Input
              id="employeeDateOfBirth"
              type="date"
              name="date_of_birth"
              defaultValue={getDate(data?.date_of_birth ?? "")}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeDesignation">
              Designation
            </FormField.Label>
            <FormField.Select
              id="employeeDesignation"
              name="designation_id"
              onChange={handleOnChange}
              value={data?.designation_id || ""}
              required
            >
              {selectOptions && <FormField.Option options={selectOptions} />}
            </FormField.Select>
          </FormField>

          <FormField>
            <FormField.Label htmlFor="gender">Gender</FormField.Label>

            <div className="flex">
              <FormField.Input
                type="radio"
                id="employeeMale"
                name="gender"
                value="Male"
                checked={data?.gender === "Male"}
                onChange={handleOnChange}
                className="mt-1"
                required
              />

              <FormField.Label htmlFor="employeeMale" className="p-1">
                Male
              </FormField.Label>
            </div>

            <div className="flex">
              <FormField.Input
                type="radio"
                id="employeeFemale"
                name="gender"
                value="Female"
                checked={data?.gender === "Female"}
                onChange={handleOnChange}
                className="mt-1"
                required
              />

              <FormField.Label htmlFor="employeeFemale" className="p-1">
                Female
              </FormField.Label>
            </div>
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeMobileNumber">
              Mobile Number
            </FormField.Label>

            <FormField.Input
              id="employeeMobileNumber"
              type="text"
              name="mobile"
              pattern="[6-9]{1}[0-9]{9}"
              defaultValue={data?.mobile}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeLandline">
              Landline
            </FormField.Label>

            <FormField.Input
              id="employeeLandline"
              type="text"
              name="landline"
              pattern="[0-9]{4}[1-9]{1}[0-9]{3}"
              defaultValue={data?.landline}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeEmail">
              Email Address
            </FormField.Label>

            <FormField.Input
              id="employeeEmail"
              type="email"
              name="email"
              defaultValue={data?.email}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="present_address_id">
              Present Address
            </FormField.Label>

            <FormField.Textarea
              id="present_address_id"
              name="present_address"
              rows={5}
              value={data?.present_address}
              onChange={handleOnChange}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label> </FormField.Label>

            <div className="md:w-2/3 flex">
              <FormField.Input
                type="checkbox"
                id="sameAddress"
                checked={sameAddress}
                onChange={(e) => {
                  setSameAddress(e.currentTarget.checked);
                }}
              />

              <label
                htmlFor="sameAddress"
                className="text-sm font-semibold ms-1 cursor-pointer"
              >
                Same as present address
              </label>
            </div>
          </FormField>

          <FormField>
            <FormField.Label htmlFor="permanent_address_id">
              Permanent Address
            </FormField.Label>

            <FormField.Textarea
              id="permanent_address_id"
              name="permanent_address"
              rows={5}
              onChange={handleOnChange}
              value={data?.permanent_address}
              required
            />
          </FormField>

          <FormField>
            <FormField.Label htmlFor="employeeStatus">Status</FormField.Label>

            <FormField.Select
              id="employeeStatus"
              name="status"
              onChange={handleOnChange}
              defaultValue={data?.status}
              required
            >
              <FormField.Option options={statusOptions} />
            </FormField.Select>
          </FormField>

          <FormField>
            <FormField.Label>Current Profile</FormField.Label>

            <div className="md:w-3/4 my-2">
              {data?.profile_image ? (
                <Image
                  src={data?.profile_image}
                  alt="Employee Profile"
                  width={80}
                  height={80}
                />
              ) : (
                <span className="text-slate-600">No Image Found</span>
              )}
            </div>
          </FormField>
        </Card.Body>
        <Card.Footer>
          <Button type="submit" variant="primary" size="default">
            Update
          </Button>

          <Link href="/employees">
            <Button type="button" variant="secondary" size="default">
              Cancel
            </Button>
          </Link>
        </Card.Footer>
      </form>
  );
}
