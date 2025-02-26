import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUpdateFileApi,
  updateUserAvatarApi,
} from "../../services/api.service";

const UserViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataUser,
    setDataUser,
    loadUsers,
  } = props;
  //////////////////
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  ///// upfile
  const handleOnchangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      selectedFile(null);
      setPreview(null);
      return;
    }

    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
    console.log("file", preview);
  };

  const handleUpdateFile = async (file, folder) => {
    const resUpload = await handleUpdateFileApi(selectedFile, "avatar");
    if (resUpload.data) {
      const NewAvatar = resUpload.data.fileUploaded;
      const resUploadAvatar = await updateUserAvatarApi(
        NewAvatar,
        dataUser._id,
        dataUser.fullName,
        dataUser.phone
      );
      if (resUploadAvatar.data) {
        setOpenViewDetail(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUsers();
        notification.success({
          message: " Success upload",
          description: "Avatar uploaded",
        });
      } else {
        notification.error({
          message: "upload Failed",
          description: JSON.stringify(resUploadAvatar.message),
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  return (
    <Drawer
      width={"40vw"}
      title="Detail User"
      onClose={() => {
        setDataUser(null);
        setOpenViewDetail(false);
        console.log("v", dataUser);
      }}
      open={openViewDetail}
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {dataUser ? (
        <div className="p-4">
          <div
            className="mt-4 flex justify-center"
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              className="rounded-lg shadow-lg border border-gray-200"
              height={250}
              width={300}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataUser.avatar
              }`}
              alt="User Avatar"
              style={{
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>

          <div>
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
              Upload Avatar
            </label>
            <input
              onChange={(event) => handleOnchangeFile(event)}
              type="file"
              id="btnAvatar"
              style={{ display: "none" }}
            />
          </div>
          <ul
            className="space-y-3 text-gray-800"
            style={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            <li
              className="font-semibold"
              style={{
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#1f2937",
              }}
            >
              {preview && (
                <>
                  <div
                    className="mt-4 flex justify-center"
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="rounded-lg shadow-lg border border-gray-200"
                      height={250}
                      width={300}
                      src={preview}
                      alt="User Avatar"
                      style={{
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Button
                      onClick={() => handleUpdateFile()}
                      style={{
                        border: "3px solid green",
                        padding: "10px",
                      }}
                      type="primary"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}
              <hr
                style={{
                  color: "greenyellow",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <span
                className="text-gray-500"
                style={{ color: "#6b7280", fontWeight: 400 }}
              >
                ID:
              </span>{" "}
              {dataUser._id}
            </li>
            <li
              className="font-semibold"
              style={{
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#1f2937",
              }}
            >
              <span
                className="text-gray-500"
                style={{ color: "#6b7280", fontWeight: 400 }}
              >
                Full Name:
              </span>{" "}
              {dataUser.fullName}
            </li>
            <li
              className="font-semibold"
              style={{
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#1f2937",
              }}
            >
              <span
                className="text-gray-500"
                style={{ color: "#6b7280", fontWeight: 400 }}
              >
                Email:
              </span>{" "}
              {dataUser.email}
            </li>
            <li
              className="font-semibold"
              style={{
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#1f2937",
              }}
            >
              <span
                className="text-gray-500"
                style={{ color: "#6b7280", fontWeight: 400 }}
              >
                Phone:
              </span>{" "}
              {dataUser.phone}
            </li>
          </ul>
        </div>
      ) : (
        <div
          className="p-4 text-center text-gray-500"
          style={{ padding: "1rem", textAlign: "center", color: "#9ca3af" }}
        >
          No information available
        </div>
      )}
    </Drawer>
  );
};

export default UserViewDetail;
