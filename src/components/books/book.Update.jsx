import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { handleUpdateFileApi, updateBookApi } from "../../services/api.service";
import { UploadOutlined } from "@ant-design/icons";

const BookUpdateModal = ({
  openUpdateBook,
  setOpenUpdateBook,
  dataUpdateBook,
  setDataUpdateBook,
  loadBooks,
}) => {
  const formRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (dataUpdateBook && dataUpdateBook._id) {
      formRef.current?.setFieldsValue({
        id: dataUpdateBook._id,
        mainText: dataUpdateBook.mainText,
        author: dataUpdateBook.author,
        price: dataUpdateBook.price,
        quantity: dataUpdateBook.quantity,
        category: dataUpdateBook.category,
      });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdateBook.thumbnail
        }`
      );
    }
  }, [dataUpdateBook]);

  const handleFileChange = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      setSelectedFile(info.file.originFileObj);
      setPreview(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const handleSubmit = async (values) => {
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error",
        description: "Please upload a book cover",
      });
      return;
    }
    let newThumbnail = dataUpdateBook?.thumbnail;
    if (selectedFile) {
      try {
        const resUpload = await handleUpdateFileApi(selectedFile, "book");
        newThumbnail = resUpload.data?.fileUploaded || newThumbnail;
      } catch (error) {
        notification.error({
          message: "Error uploading file",
          description: error.message || "Something went wrong",
        });
        return;
      }
    }
    try {
      await updateBookApi(
        values.id,
        newThumbnail,
        values.mainText,
        values.author,
        values.price,
        values.quantity,
        values.category
      );
      notification.success({
        message: "Updated",
        description: "Book updated successfully",
      });
      resetForm();
      await loadBooks();
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: error.message || "Something went wrong",
      });
    }
  };

  const resetForm = () => {
    setOpenUpdateBook(false);
    setDataUpdateBook(null);
    setPreview(null);
    formRef.current?.resetFields();
  };

  return (
    <Modal
      title="Update Book"
      open={openUpdateBook}
      onCancel={resetForm}
      footer={null}
    >
      <Form ref={formRef} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="mainText"
          label="Title"
          rules={[{ required: true, message: "Please enter book title" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter author name" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Enter quantity" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select a category"
            options={[
              "Arts",
              "Business",
              "Comics",
              "Cooking",
              "Entertainment",
              "History",
              "Music",
              "Sports",
              "Teen",
              "Travel",
            ].map((cat) => ({ value: cat, label: cat }))}
          />
        </Form.Item>
        <Form.Item label="Book Cover">
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>Upload Book Cover</Button>
          </Upload>
        </Form.Item>
        {preview && (
          <img
            src={preview}
            alt="Book Cover Preview"
            height={250}
            width={300}
            style={{ borderRadius: "10px", marginBottom: "15px" }}
          />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookUpdateModal;
