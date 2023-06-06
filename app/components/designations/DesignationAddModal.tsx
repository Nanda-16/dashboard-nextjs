import { useState } from "react";
import Button from "../common/Button";
import FormField from "../Form";
import Modal from "../common/Modal";
interface FormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: {}) => void;
  onCancel: () => void;
}

function DesignationAddModal({
  show,
  onClose,
  onSubmit,
  onCancel,
}: FormProps) {
  const [data, setData] = useState({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
    console.log(data, "designation addddd");
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <Modal.Header className="">Add Designation</Modal.Header>

          <Modal.Body className="">
            <FormField>
              <FormField.Label htmlFor="name" className="me-1">
                Designation Name
              </FormField.Label>
              <FormField.Input
                type="text"
                id="name"
                name="designation_name"
                onChange={handleInput}
                required
              />
            </FormField>
          </Modal.Body>
        </Modal.Content>
        <Modal.Footer>
          <Button size="default" variant="primary" type="submit">
            Submit
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

export default DesignationAddModal;