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

  const prefixSelector = (phonePrefix) => {
    return (
      <Form.Item
        initialValue={phonePrefix ? phonePrefix : "90"}
        name="prefix"
        noStyle
      >
        <Select style={{ width: 70 }}>
          <Option value="90">+90</Option>
        </Select>
      </Form.Item>
    );
  };

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
          name="title"
          label="Address Title"
          initialValue={address.title}
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
          name="firstName"
          label="Name"
          initialValue={address.firstName}
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
          name="lastName"
          label="Last Name"
          initialValue={address.lastName}
          rules={[
            {
              required: true,
              message: "Please input last name!",
            },
          ]}
        >
          <Input placeholder="Enter the Last Name" />
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
          <Input
            name="phonePrefix"
            placeholder="Enter the phone number"
            addonBefore={prefixSelector(address.phonePrefix)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="details"
          label="Address Details"
          initialValue={address.details}
          rules={[
            {
              required: true,
              message: "Please input the address!",
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
