import { Drawer } from "antd";

const ViewBookDetail = (props) => {
  const { openViewBookDetail, setOpenViewBookDetail, dataBook, setDataBook } =
    props;

  ////////////////

  return (
    <Drawer
      width={"40vw"}
      title="Detail Book"
      onClose={() => {
        setDataBook(null);
        setOpenViewBookDetail(false);
        console.log("book c", dataBook);
      }}
      open={openViewBookDetail}
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {dataBook ? (
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
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                dataBook.thumbnail
              }`}
              alt="Book image"
              style={{
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
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
              <hr
                style={{
                  color: "yelow",
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
              {dataBook._id}
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
                Title:
              </span>
              {dataBook.mainText}
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
                Author:
              </span>{" "}
              {dataBook.author}
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
                Price:
              </span>{" "}
              {dataBook.price}
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
                sold:
              </span>{" "}
              {dataBook.sold}
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
                quantity:
              </span>
              {dataBook.quantity}
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
                category:
              </span>
              {dataBook.category}
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
                createdAt :
              </span>
              {dataBook.createdAt}
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
                updatedAt :
              </span>
              {dataBook.updatedAt}
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

export default ViewBookDetail;
