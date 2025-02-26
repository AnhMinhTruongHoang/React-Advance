import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import {
  BookCreatorApi,
  handleUpdateFileApi,
} from "../../services/api.service";

const BookCreator = (props) => {
  const { openBookCreator, setOpenBookCreator, loadBooks } = props;

  // State variables
  const [thumbnail, setThumbnail] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  // Upload file state
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // File Upload Handler
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

  // Reset Form
  const resetForm = () => {
    setOpenBookCreator(false);
    setThumbnail("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setPreview(null);
    setSelectedFile(null);
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error",
        description: "Please upload a book cover",
      });
      return;
    }

    try {
      // Upload the file
      const resUpload = await handleUpdateFileApi(selectedFile, "book");

      if (resUpload.data) {
        const newThumbnail = resUpload.data.fileUploaded;

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
          resetForm();
          await loadBooks();
          notification.success({
            message: "Created",
            description: "Successfully created a new book",
          });
        } else {
          notification.error({
            message: "Failed",
            description: "Failed to create a new book",
          });
        }
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Modal
      title="Create New Book"
      open={openBookCreator}
      onOk={handleSubmit}
      onCancel={resetForm}
      footer={null}
    >
      <div>
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

        <hr />

        {/* Form Fields */}
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>Title</span>
          <Input
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
          />
        </div>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>Author</span>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>Price</span>
          <InputNumber
            style={{ width: "100%" }}
            value={price}
            addonAfter={" đ"}
            onChange={(event) => {
              setPrice(event);
            }}
          />
        </div>

        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Quantity
          </span>
          <InputNumber
            style={{ width: "100%" }}
            value={quantity}
            onChange={(event) => {
              setQuantity(event);
            }}
          />
        </div>
        <div>
          <span style={{ display: "block", marginBottom: "5px" }}>
            Category
          </span>
          <Select
            value={category}
            onChange={(value) => {
              setCategory(value);
            }}
            style={{ width: "100%" }}
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
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          type="primary"
          style={{ width: "100%", marginTop: "10px" }}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default BookCreator;
