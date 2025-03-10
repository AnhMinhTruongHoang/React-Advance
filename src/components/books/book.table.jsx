import { notification, Popconfirm, Table } from "antd";
import { BookOutlined, DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import ViewBookDetail from "./book.viewDetail";
import BookCreatorUncontrolled from "./book.create.uncontroller";
import BookUpdateModal from "./book.UpdateModalControlled";
import { deleteBookApi, fetchAllBookApi } from "../../services/api.service";

const BookTable = (props) => {
  const { bookList, loadBooks } = props;
  ///////////////////////
  const [loadingTable, SetLoadingTable] = useState(false);
  const [dataBook, setDataBook] = useState(null);
  const [openViewBookDetail, setOpenViewBookDetail] = useState(false);
  const [openBookCreator, setOpenBookCreator] = useState(false);
  const [openUpdateBook, setOpenUpdateBook] = useState(false);
  const [dataUpdateBook, setDataUpdateBook] = useState(null);

  // const loadBook = useCallback(async () => {
  //   ////////// loading table
  //   setLoadingTable(true);
  //   const res = await fetchAllBookApi(current, pageSize);
  //   if (res.data) {
  //     setDataBook(res.data.result);
  //     setCurrent(res.data.meta.current);
  //     setPageSize(res.data.meta.pageSize);
  //     setTotal(res.data.meta.total);
  //   }
  //   setLoadingTable(false);
  // }, [current, pageSize]);

  // useEffect(() => {
  //   loadBook();
  // }, []);

  ///////////////delete
  const handleDeleteBook = async (id) => {
    const res = await deleteBookApi(id);
    if (res.data) {
      notification.success({
        message: "Deleted",
        description: "deleted",
      });
      await loadBooks();
    } else {
      notification.error({
        message: "Error delete User",
        description: JSON.stringify(res.message),
      });
    }
  };

  /////////////

  const columns = [
    {
      title: "No",
      dataIndex: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Ngăn load lại trang
              setDataBook(record);
              setOpenViewBookDetail(true);
            }}
            style={{
              textDecoration: "none",
              color: "#1677ff",
              fontWeight: "bold",
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <EditOutlined
            onClick={(e) => {
              setDataUpdateBook(record);
              setOpenUpdateBook(true);
            }}
            style={{ cursor: "pointer", color: "orange", fontSize: "18px" }}
          />

          <Popconfirm
            title="Delete Book"
            description=" Delete this book?"
            onConfirm={() => handleDeleteBook(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteFilled
              style={{ cursor: "pointer", color: "red", fontSize: "18px" }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "greenyellow",
            marginBottom: "5px",
          }}
        >
          Table Books
        </h1>
        <BookOutlined
          type="submit"
          onClick={() => setOpenBookCreator(true)}
          style={{ fontSize: "30px", color: "#1677ff", cursor: "pointer" }}
        />
      </div>
      <div
        style={{
          width: "90%",
          height: "70vh",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          padding: "15px",
        }}
      >
        <Table
          dataSource={bookList}
          columns={columns}
          rowKey={"_id"}
          loading={loadingTable}
          pagination={{ pageSize: 10, position: ["bottomCenter"] }}
        />
      </div>
      <ViewBookDetail
        openViewBookDetail={openViewBookDetail}
        setOpenViewBookDetail={setOpenViewBookDetail}
        dataBook={dataBook}
        setDataBook={setDataBook}
      />
      {/* <BookCreator
        dataBook={dataBook}
        setDataBook={setDataBook}
        openBookCreator={openBookCreator}
        setOpenBookCreator={setOpenBookCreator}
        loadBooks={loadBooks}
      /> */}

      <BookCreatorUncontrolled
        openBookCreator={openBookCreator}
        setOpenBookCreator={setOpenBookCreator}
        loadBooks={loadBooks}
        dataBook={dataBook}
        setDataBook={setDataBook}
      />
      <BookUpdateModal
        openUpdateBook={openUpdateBook}
        setOpenUpdateBook={setOpenUpdateBook}
        dataUpdateBook={dataUpdateBook}
        setDataUpdateBook={setDataUpdateBook}
        loadBooks={loadBooks}
      />
      {/* <BookUpdateFormModal
        openUpdateBook={openUpdateBook}
        setOpenUpdateBook={setOpenUpdateBook}
        dataUpdateBook={dataUpdateBook}
        setDataUpdateBook={setDataUpdateBook}
        loadBooks={loadBooks}
      /> */}
    </div>
  );
};

export default BookTable;
