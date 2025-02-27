import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  notification,
} from "antd";
import { useState } from "react";
import {
  BookCreatorApi,
  handleUpdateFileApi,
} from "../../services/api.service";

const BookCreatorModal = (props) => {
  const { openBookCreator, setOpenBookCreator, loadBooks } = props;
  ////////////////////////
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (values) => {
    if (!selectedFile) {
      notification.error({
        message: "Error",
        description: "Please upload a book cover",
      });
      return;
    }

    // Upload the file
    const resUpload = await handleUpdateFileApi(selectedFile, "book");

    if (resUpload.data) {
      const newThumbnail = resUpload.data.fileUploaded;

      const { mainText, author, price, quantity, category } = values;

      // Create the book
      const resBook = await BookCreatorApi(
        newThumbnail,
        mainText,
        author,
        price,
        quantity,
        category
      );

      if (resBook.data) {
        resetNCloseForm();
        await loadBooks();
        notification.success({
          message: "Created",
          description: "Successfully created a new book",
        });
      } else {
        notification.error({
          message: "Failed",
          description: JSON.stringify(resBook.message),
        });
      }
    }
  };

  const resetNCloseForm = () => {
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
    setOpenBookCreator(false);
  };

  const handleOnchangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal
      title="Book Creator"
      open={openBookCreator}
      onOk={() => form.submit()}
      onCancel={() => resetNCloseForm()}
      maskClosable={false}
      okText={"CREATE"}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="mainText"
          rules={[
            { required: true, message: "Please input Title" },
            { min: 3, message: "Title must have at least 3 characters" },
          ]}
        >
          <Input placeholder="Enter Book Title" />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            { required: true, message: "Please input Author" },
            { min: 1, message: "Author name must have at least 1 character" },
          ]}
        >
          <Input placeholder="Enter Book Author" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input Price" }]}
        >
          <InputNumber
            placeholder="Enter Book Price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input quantity" }]}
        >
          <InputNumber
            placeholder="Enter Book Quantity"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select a category"
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </Form.Item>
        <hr />
        {/* File Upload */}
        <label
          style={{
            display: "block",
            textAlign: "center",
            color: "#3b82f6",
            cursor: "pointer",
            marginTop: "1rem",
          }}
          htmlFor="btnAvatar"
        >
          Upload Book Cover
        </label>
        <input
          type="file"
          id="btnAvatar"
          style={{ display: "none" }}
          onChange={(event) => handleOnchangeFile(event)}
          onClick={(event) => (event.target.value = null)}
        />

        {/* Image Preview */}
        {preview && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            <img
              height={250}
              width={300}
              src={preview}
              alt="Book cover preview"
              style={{
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: "15px" }}
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookCreatorModal;
