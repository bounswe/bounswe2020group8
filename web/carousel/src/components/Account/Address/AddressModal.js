import { fireEvent } from "@testing-library/react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Divider,
  Modal,
} from "antd";

import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";

const { Option } = Select;
const { TextArea } = Input;

const AddressModal = (props) => {
  const [form] = Form.useForm();

  const title = props.edit ? "Edit the Address" : "Add a New Address";
  const address = props.edit ? props.address : {};

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      props.setModal({ visible: false, edit: false, address: {} });

      if (props.edit) {
        props.handleUpdateAddress({ id: props.address.id, ...values });
      } else {
        props.handleAddAddress(values);
      }
    });
  };

  const handleCancel = () => {
    props.setModal({ visible: false, edit: false, address: {} });
  };

  return (
    <Modal
      title={title}
      centered
      visible={props.visible}
      footer={[<ButtonPrimary title={"Save"} onClick={handleFormSubmit} />]}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="middle"
        form={form}
      >
        <Form.Item
          name="addressName"
          label="Address Name"
          initialValue={address.addressName}
          rules={[
            {
              required: true,
              message: "Please input the title of the address!",
            },
          ]}
        >
          <Input placeholder="Enter Title of the Address" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          initialValue={address.name}
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input placeholder="Enter the Name" />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          initialValue={address.city}
          rules={[
            {
              required: true,
              message: "Please input city!",
            },
          ]}
        >
          <Input placeholder="Enter the city" />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          initialValue={address.state}
          rules={[
            {
              required: true,
              message: "Please input state!",
            },
          ]}
        >
          <Input placeholder="Enter the state" />
        </Form.Item>
        <Form.Item
          name="zipCode"
          label="ZIP Code"
          initialValue={address.zipCode}
          rules={[
            {
              required: true,
              message: "Please input the ZIP Code!",
            },
          ]}
        >
          <Input placeholder="Enter the state" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          initialValue={address.phone}
          rules={[
            {
              required: true,
              message: "Please input an valid phone number",
            },
          ]}
        >
          <Input placeholder="Enter the phone number" />
        </Form.Item>

        <Form.Item
          name="addressLine"
          label="Address Line"
          initialValue={address.addressLine}
          rules={[
            {
              required: true,
              message: "Please input the Address Details!",
            },
          ]}
        >
          <TextArea placeholder="Enter the details of the address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddressModal;
