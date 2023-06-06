import { useEffect, useState } from "react";
import Button from "../common/Button";
import FormField from "../Form";
import Modal from "../common/Modal";
import { useAppSelector } from "@/redux/hooks";
import { selectDesignation } from "@/redux/features/designationSlice";
import { DesignationType } from "./DesignationHome";

export type ModalType = "Edit" | "Delete" | "NONE";

interface FormProps {
  show: boolean;
  type: ModalType;
  designation_id?: string | number;
  onClose: () => void;
  onSubmit: ({
    modal_type,
    id,
    data,
  }: {
    modal_type: ModalType;
    id: string | number;
    data: DesignationType | {};
  }) => void;
  onCancel: () => void;
}

export default function DesignationModal({
  show,
  type,
  designation_id,
  onClose,
  onSubmit,
  onCancel,
}: FormProps) {
  const { designations } = useAppSelector(selectDesignation);
  const [data, setData] = useState<DesignationType | {}>();
  const [editDesignation, setEditDesignation] =useState<DesignationType | null>();
  
  useEffect(() => {
    if (designation_id && designations) {
      const designation = designations.find(
        (designation) => designation.id === designation_id
      );
      setEditDesignation(designation);
    }
  }, []);

  useEffect(() => {
    if (designation_id) {
      const designation = designations?.find(
        (designation) => designation.id == designation_id
      );
      if (designation) {
        setEditDesignation(designation);
        setData({ designation_name: designation.name });
      }
    }
  }, [designation_id]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      const id = editDesignation?.id!;
      onSubmit({ modal_type: type, id, data });
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          {type === "Delete" ? (
            <Modal.Header className="text-red-500">Warning</Modal.Header>
          ) : (
            <Modal.Header className="">{type} Designation</Modal.Header>
          )}
          <Modal.Body className="">
            {type === "Delete" ? (
              <>
                Do you really want to delete the Designation{" "}
                {editDesignation?.name} ?
              </>
            ) : (
              <>
                <FormField>
                  <FormField.Label htmlFor="name" className="me-1">
                    Designation Name
                  </FormField.Label>

                  <FormField.Input
                    type="text"
                    id="name"
                    name="designation_name"
                    defaultValue={editDesignation?.name}
                    onChange={handleInput}
                    required
                  />
                </FormField>
              </>
            )}
          </Modal.Body>
        </Modal.Content>
        <Modal.Footer>
          <Button
            size="default"
            variant={type === "Delete" ? "danger" : "primary"}
            type="submit"
          >
            {type === "Edit" ? "Update" : "Delete"}
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
      </form>
    </Modal>
  );
}
