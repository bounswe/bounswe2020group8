import { Form, Input, Modal } from "antd";

import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import services from "../../../apis/services";

const { TextArea } = Input;

const TicketModal = (props) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    form.validateFields().then(async (values) => {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };

      const resp = await services.post("/ticket", values, config);
      console.log(resp);
      props.setModal({ visible: false });
      window.location.reload();
    });
  };

  const handleCancel = () => {
    props.setModal({ visible: false });
  };

  return (
    <Modal
      title={"Create New Ticket"}
      centered
      visible={props.visible}
      footer={[<ButtonPrimary title={"Save"} onClick={handleFormSubmit} />]}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        size="middle"
        form={form}
      >
        <Form.Item
          name="topic"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of the ticket!",
            },
          ]}
        >
          <Input placeholder="Enter Title of the Ticket" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[
            {
              required: true,
              message: "Please input an valid message",
            },
          ]}
        >
          <TextArea placeholder="Enter your message/complaint" rows={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TicketModal;
