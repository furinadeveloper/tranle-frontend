"use client";
import { _redirect } from "@/action";
import { instance } from "@/config";
import { Form, Input, InputRef, Tabs } from "antd";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { isStrongPassword } from "validator";
type TabPosition = "left" | "right" | "top" | "bottom";

const validatorPassword = (password: string) => {
  return isStrongPassword(password, {
    minLength: 8,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  });
};

const DoiMatKhau = () => {
  const oldPassRef = useRef<null | InputRef>(null);
  const newPassRef = useRef<null | InputRef>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!oldPassRef.current || !newPassRef.current) {
      return toast.error("Đã xảy ra lỗi trong quá trình render");
    }
    const oldPass = oldPassRef.current.input?.value;
    const newPass = newPassRef.current.input?.value;
    if (!oldPass || !newPass) {
      return toast.error("Vui lòng nhập nội dung của form");
    }
    if (!validatorPassword(oldPass) || !validatorPassword(newPass)) {
      return toast.error("Mật khẩu không hợp lệ");
    }

    try {
      const res = await instance.put(
        "/account/changePassword/",
        {
          oldPassword: oldPass,
          newPassword: newPass,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res);

      if (res.data.code === 200) {
        return toast.success("Đổi mật khẩu thành công");
      } else if (res.data.code === 401) {
        return toast.error("Sai mật khẩu");
      } else {
        return toast.error("Đã xảy ra lỗi không xác định");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Form.Item
        name="oldPassword"
        rules={[
          {
            required: true,
            message: (
              <p className="text-lg my-2 max-sm:text-base">
                Vui lòng nhập mật khẩu *
              </p>
            ),
          },
        ]}
      >
        <Input
          ref={oldPassRef}
          autoComplete="old-password"
          maxLength={32}
          minLength={8}
          type="password"
          name="oldPassword"
          className="p-4 rounded-none  text-xl max-sm:text-base placeholder-gray-600"
          placeholder="Mật khẩu cũ"
        />
      </Form.Item>
      <Form.Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: (
              <p className="text-lg my-2 max-sm:text-base">
                Vui lòng nhập mật khẩu *
              </p>
            ),
          },
        ]}
      >
        <Input
          ref={newPassRef}
          name="newPassword"
          autoComplete="new-password"
          maxLength={32}
          minLength={8}
          type="password"
          className="p-4 rounded-none  text-xl max-sm:text-base placeholder-gray-600"
          placeholder="Mật khẩu mới"
        />
      </Form.Item>
      <button
        type="submit"
        className="p-2 px-3 text-xl bg-greenTheme text-white"
      >
        Xác nhận
      </button>
    </form>
  );
};
const DoiTenDangNhap = () => {
  const [name, setName] = useState("");

  const changeName = async () => {
    const res = await instance.put(`/account/changeName`, { name });
    console.log(res.data);
    if (res.data.code === 200) {
      localStorage.setItem("user", res.data.data);
      toast.success("Cập nhật thành công!!");
      return;
    }
  };
  return (
    <form>
      <Form.Item
        name="newPassword"
        rules={[
          {
            required: true,
            message: (
              <p className="text-lg my-2 max-sm:text-base">Tên đăng nhập</p>
            ),
          },
        ]}
      >
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="p-4 rounded-none  text-xl max-sm:text-base placeholder-gray-600"
          placeholder="Tên đăng nhập mới"
        />
      </Form.Item>

      <button
        onClick={changeName}
        disabled={!name.length ? true : false}
        className={`p-2 px-3 text-xl bg-greenTheme text-white ${
          !name.length ? "cursor-no-drop opacity-20" : ""
        }`}
      >
        Lưu thay đổi
      </button>
    </form>
  );
};
const data = [
  {
    label: "Đổi mật khẩu",
    content: <DoiMatKhau />,
  },
  {
    label: "Đổi tên đăng nhập",
    content: <DoiTenDangNhap />,
  },
];

const ThongTinCaNhan = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  const [user, setUser] = useState<any>();
  useEffect(() => {
    (async () => {
      const res = await instance.get("/account/", {
        withCredentials: true,
      });
      if (res.data.code === 200) {
        setUser(res.data.data);
      } else {
        _redirect("/dang-nhap");
      }
    })();
  }, []);
  return (
    <section className="py-10 flex justify-center space-x-3 h-[600px]">
      <div
        className="space-y-5 p-10 h-full"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <div className="flex justify-center flex-col space-y-3 items-center">
          <p className="capitalize bg-slate-200 flex justify-center w-[100px] h-[100px] items-center p-3 rounded-full cursor-pointer transition-all text-[#272727 ] text-xl  font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </p>
          <div>
            <h3 className="text-2xl text-center font-bold">Hồ sơ</h3>
            <div className="space-y-2 mt-2">
              <p className="text-xl">Tên đăng nhập : {user?.name}</p>
              <p className="text-xl">Email : {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="space-y-5 py-10 pr-10 h-full "
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <div className="pl-10 pb-5 space-y-3 ">
          <h2 className="text-2xl font-bold ">Thông tin cá nhân</h2>
          <p className="text-xl">Xin chào, {user?.name} !</p>
          <p className="text-xl flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              color="white"
              viewBox="0 0 24 24"
              fill="#27a449"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-badge-check"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Thông tin được bảo mật</span>
          </p>
          <p className="text-xl flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              color="white"
              viewBox="0 0 24 24"
              fill="#27a449"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-badge-check"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span> Tài khoản đã được xác thực</span>
          </p>
        </div>
        <Tabs
          className="!w-[600px] pl-5"
          tabPosition={tabPosition}
          items={data.map((item, i) => {
            const id = String(i + 1);
            return {
              label: <p className="text-xl">{item.label}</p>,
              key: id,
              children: item.content,
            };
          })}
        />
      </div>
    </section>
  );
};

export default ThongTinCaNhan;
