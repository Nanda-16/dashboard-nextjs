type DesignationType = {
  id: string | number;
  name: string;
  created_at?: string;
  updated_at?: string;
};
type EmployeeType = {
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
};
