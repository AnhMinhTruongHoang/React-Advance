import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUpdateFileApi, updateBookApi } from "../../services/api.service";

const BookUpdateModal = (props) => {
  const {
    openUpdateBook,
    setOpenUpdateBook,
    dataUpdateBook,
    setDataUpdateBook,
    loadBooks,
  } = props;

  useEffect(() => {
    if (dataUpdateBook && dataUpdateBook._id) {
      setId(dataUpdateBook._id);
      setMainText(dataUpdateBook.mainText);
      setAuthor(dataUpdateBook.author);
      setPrice(dataUpdateBook.price);
      setQuantity(dataUpdateBook.quantity);
      setCategory(dataUpdateBook.category);
      setThumbnail(dataUpdateBook.thumbnail);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdateBook.thumbnail
        }`
      );
    }
  }, [dataUpdateBook]);

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleClickBtn = async () => {
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error",
        description: "Please upload a book cover",
      });
      return;
    }

    let newThumbnail = dataUpdateBook.thumbnail;

    if (selectedFile) {
      try {
        const resUpload = await handleUpdateFileApi(selectedFile, "book");
        if (resUpload.data) {
          newThumbnail = resUpload.data.fileUploaded;
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        notification.error({
          message: "Error uploading file",
          description: error.message || "Something went wrong",
        });
        return;
      }
    }

    await updateBook(newThumbnail);
  };

  const updateBook = async (newThumbnail) => {
    try {
      const resBook = await updateBookApi(
        id,
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
          message: "Updated",
          description: "Book updated successfully",
        });
      } else {
        throw new Error(resBook.message || "Update failed");
      }
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: error.message || "Something went wrong",
      });
    }
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

  const resetForm = () => {
    setOpenUpdateBook(false);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setDataUpdateBook(null);
    setPreview(null);
  };

  return (
    <Modal
      title={
        <h1
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            color: "greenyellow",
          }}
        >
          Update book
        </h1>
      }
      open={openUpdateBook}
      onOk={() => setOpenUpdateBook(false)}
      onCancel={() => resetForm()}
      footer={null}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* ID (Hidden) */}
        <Input value={id} disabled style={{ display: "none" }} />

        {/* Title Input */}
        <Input
          value={mainText}
          onChange={(e) => setMainText(e.target.value)}
          placeholder="Enter book title"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #d9d9d9",
          }}
        />

        {/* Author Input */}
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #d9d9d9",
          }}
        />

        {/* Price Input */}
        <InputNumber
          value={price}
          onChange={setPrice}
          placeholder="Enter price"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #d9d9d9",
          }}
        />

        {/* Quantity Input */}
        <InputNumber
          value={quantity}
          onChange={setQuantity}
          placeholder="Enter quantity"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #d9d9d9",
          }}
        />

        {/* Category Select */}
        <Select
          value={category}
          onChange={setCategory}
          style={{
            width: "100%",
            height: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #d9d9d9",
          }}
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
      </div>

      {/* File Upload */}
      <label
        style={{
          display: "block",
          textAlign: "center",
          color: "#1677ff",
          cursor: "pointer",
          marginTop: "1rem",
          fontWeight: "bold",
        }}
        htmlFor="uploadBookCover"
      >
        Upload Book Cover
      </label>
      <input
        id="uploadBookCover"
        type="file"
        onChange={handleOnchangeFile}
        style={{ display: "none" }}
      />

      {/* Preview Image */}
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
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          />
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleClickBtn}
        type="primary"
        style={{
          width: "100%",
          marginTop: "10px",
          backgroundColor: "#1677ff",
          borderColor: "#1677ff",
          color: "#fff",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Submit
      </Button>
    </Modal>
  );
};

export default BookUpdateModal;
