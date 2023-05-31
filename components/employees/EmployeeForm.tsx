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
import { EmployeeType } from "./EmployeeHome";
import { DesignationType } from "../designations/DesignationHome";

interface FormProps {
  onSubmit: (data: EmployeeType | {}) => void;
}

type Event =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

const statusOptions = [
  { value: "TEMPORERY", name: "Temperory" },
  { value: "PERMANENT", name: "Permanent" },
];

export default function EmployeeForm({ onSubmit }: FormProps) {
  const dispatch = useAppDispatch();
  const { user_data } = useAppSelector(selectUser);
  const [data, setData] = useState<EmployeeType>();
  const [sameAddress, setSameAddress] = useState(false);
  const [profile, setProfile] = useState("");
  const [resume, setResume] = useState("");
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

  useEffect(() => {
    if (sameAddress) {
      const value = data?.present_address;
      setData({ ...data, permanent_address: value });
    }
  }, [sameAddress]);

  const handleOnChange = (event: Event) => {
    const name = event.target.name;
    setData({ ...data, [name]: event.target.value });
    if (name === "present_address" || name === "permanent_address")
      setSameAddress(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.files) {
      const uploadedfile = e.target.files[0];
      if (name === "profile_picture") {
        setData({ ...data, profile_picture: uploadedfile });
        setProfile(uploadedfile?.name);
      } else if (name === "resume") {
        setData({ ...data, resume: uploadedfile });
        setResume(uploadedfile?.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data, ":dataaaa form");
    onSubmit(data ?? {});
    if (inputRef.current) {
      inputRef.current.focus();
    }
    let form = document.getElementById("employeeForm") as HTMLFormElement;
    form.reset();
    setData({});
    setProfile("");
    setResume("");
    setSameAddress(false);
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
            required
          >
            <option disabled selected>
              choose an option
            </option>
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
              value="MALE"
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
              value="FEMALE"
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
            pattern="[6-9]{1}[0-9]{9}"
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </FormField>

        <FormField>
          <FormField.Label htmlFor="employeeLandline">Landline</FormField.Label>

          <FormField.Input
            id="employeeLandline"
            type="text"
            name="landline"
            pattern="[0-9]{4}[1-9]{1}[0-9]{3}"
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
          ></FormField.Textarea>
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
            value={data?.permanent_address}
            rows={5}
            onChange={handleOnChange}
            required
          ></FormField.Textarea>
        </FormField>

        <FormField>
          <FormField.Label htmlFor="employeeStatus">Status</FormField.Label>

          <FormField.Select
            id="employeeStatus"
            name="status"
            onChange={handleOnChange}
            required
          >
            <option disabled selected>
              choose an option
            </option>
            <FormField.Option options={statusOptions} />
          </FormField.Select>
        </FormField>

        <FormField>
          <FormField.Label>Profile Pic</FormField.Label>

          <input
            id="employeeProfilePic"
            type="file"
            className="hidden"
            accept=".jpg, .png, .jpeg"
            name="profile_picture"
            onChange={handleFileInput}
            required
          />

          <label
            htmlFor="employeeProfilePic"
            className="cursor-pointer sm:flex"
          >
            <div className="bg-neutral-400  text-white rounded p-1 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 me-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Choose Image
            </div>

            <span className="text-sm font-semibold m-1">{profile}</span>
          </label>
        </FormField>

        <FormField>
          <FormField.Label>Resume</FormField.Label>

          <input
            id="employeeResume"
            type="file"
            className="hidden"
            accept=".doc, .pdf"
            name="resume"
            onChange={handleFileInput}
            required
          />

          <label
            htmlFor="employeeResume"
            className="cursor-pointer sm:flex  md:w-3/4"
          >
            <div className="bg-neutral-400  text-white rounded p-1 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 me-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Choose File
            </div>

            <span className="text-sm font-semibold m-1">{resume}</span>
          </label>
        </FormField>
      </Card.Body>
      <Card.Footer>
        <Button type="submit" variant="primary" size="default">
          Submit
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
