"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import DesignationTable from "@/components/designations/DesignationTable";
import DesignationModal from "@/components/designations/DesignationModal";
import { useEffect, useState } from "react";
import { ModalType } from "@/components/designations/DesignationModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createDesignation,
  deleteDesignation,
  editDesignation,
  getDesignations,
  selectDesignation,
} from "@/redux/features/designationSlice";
import { selectUser } from "@/redux/features/userSlice";
import withAuth from "@/app/withAuth";
import Loading from "@/components/Loading";
import DesignationAddModal from "@/components/designations/DesignationAddModal";

export const metadata = {
  title: "Designations - Employee Mananager",
  description: "Employee Manangement application",
};

export interface DesignationsType {
  id: string | number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

type updateData = {
  modal_type: ModalType;
  id: string | number;
  data: {};
};

const tableHeads = ["ID", "Name", "Action"];

function Designation() {
  const dispatch = useAppDispatch();
  const { designations } = useAppSelector(selectDesignation);
  const { user_data } = useAppSelector(selectUser);
  const [designationData, setDesignationData] = useState<
    DesignationsType[] | null
  >(null);
  const [login, setLogin] = useState(false);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [type, setType] = useState<ModalType>("NONE");
  const [designationId, setDesignationId] = useState<string | number>("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = user_data.access_token;
    if (token !== "") {
      setLogin(true);
      setLoading(true);
      fetchDesignations(token);
    }
  }, []);

  const fetchDesignations = async (token: string) => {
    try {
      const response = await dispatch(getDesignations({ token }));

      if (response.payload && response.payload.data) {
        setDesignationData(designations);
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

  const handleAdd = async (data: DesignationsType | {}) => {
    try {
      const token = user_data.access_token;
      const response = await dispatch(
        createDesignation({ token, formData: data })
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

      dispatch(getDesignations({ token }));
      setAddModal(false);
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

  const handleEditModal = (id: string | number) => {
    setModal(true);
    setDesignationId(id);
    setType("Edit");
  };

  const handleDeleteModal = (id: string | number) => {
    setModal(true);
    setDesignationId(id);
    setType("Delete");
  };

  const closeModal = () => {
    setModal(false);
    setAddModal(false);
    setType("NONE");
    setDesignationId("");
  };

  const handleModalSubmit = (data: updateData) => {
    const modal_type = data.modal_type;
    if (modal_type === "Edit") {
      handleEdit(data);
    } else if (modal_type === "Delete") {
      handleDelete(data);
    }

    setToast(true);
    setTimeout(() => {
      setLoading(false);
      setToast(false);
    }, 3000);
    setModal(false);
  };

  const handleEdit = async (data: updateData) => {
    try {
      const token = user_data.access_token;
      const response = await dispatch(
        editDesignation({ token, id: data.id, formData: data.data })
      );

      if (response && response.payload) {
        setMessage(
          response.payload.message
            ? response.payload.message
            : response.payload.error
        );
        setError(response.payload.error);
        dispatch(getDesignations({ token }));
        setDesignationId("");
        setLoading(true);
      } else {
        setMessage("Something went wrong");
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (data: updateData) => {
    try {
      const token = user_data.access_token;
      const response = await dispatch(
        deleteDesignation({ token, id: data.id })
      );

      if (response && response.payload) {
        setMessage(
          response.payload.message
            ? response.payload.message
            : response.payload.error
        );
        setError(response.payload.error);
        dispatch(getDesignations({ token }));
        setDesignationId("");
        setLoading(true);
      } else {
        setMessage("Something went wrong");
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDesignationData(designations);
  }, [designations, getDesignations, loading]);

  return (
    <>
      <Container className="px-3 sm:px-8">
        {login ? (
          <Card className="px-3">
            <Card.Header className="bg-white border-none grid grid-cols-7 gap-0">
              <Card.Title>Designations</Card.Title>

              <Card.SubTitle>
                Showing {designationData?.length} Designations
              </Card.SubTitle>

              <Card.Action>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setAddModal(true)}
                >
                  + Add
                </Button>

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

            <Card.Body>
              {/* table */}
              {!loading ? (
                <DesignationTable
                  headings={tableHeads}
                  data={designationData}
                  handleDeleteModal={handleDeleteModal}
                  handleEditModal={handleEditModal}
                  pages={length}
                />
              ) : (
                <Loading />
              )}
            </Card.Body>
          </Card>
        ) : (
          <Loading />
        )}

        {/* modal */}
        <DesignationModal
          show={modal}
          type={type}
          designation_id={designationId}
          onSubmit={handleModalSubmit}
          onCancel={() => setModal(false)}
          onClose={closeModal}
        />

        <DesignationAddModal
          show={addModal}
          onSubmit={handleAdd}
          onCancel={() => setAddModal(false)}
          onClose={closeModal}
        />
      </Container>
    </>
  );
}

export default withAuth(Designation);
