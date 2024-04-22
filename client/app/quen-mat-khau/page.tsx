"use client";
import { Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";

const ForgotPassword = () => {
  return (
    <section className="flex justify-center py-10">
      <Form
        name="basic"
        style={{
          padding: 30,
          paddingBottom: 70,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className="relative space-y-7 w-[500px] max-sm:w-[320px]"
      >
        <div className="absolute top-[15px] left-[30px]">
          <Link
            className="flex items-center text-lg max-sm:text-base font-medium !text-greenTheme"
            href="/dang-nhap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-chevrons-left cursor-pointer"
            >
              <path d="m11 17-5-5 5-5" />
              <path d="m18 17-5-5 5-5" />
            </svg>
            <span>BACK</span>
          </Link>
        </div>
        <div className="">
          <h2 className="text-2xl text-center font-bold max-sm:text-lg">
            Quên mật khẩu
          </h2>
          <p className="text-center text-xl my-3 max-sm:text-base">
            Sử dụng email bạn đăng kí để có thể dễ dàng tìm lại mật khẩu{" "}
          </p>
          <div className="mt-5">
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: (
                    <p className="text-lg my-2 max-sm:text-base">
                      Email không hợp lệ *
                    </p>
                  ),
                },
                {
                  required: true,
                  message: (
                    <p className="text-lg my-2 max-sm:text-base">
                      Vui lòng nhập email *
                    </p>
                  ),
                },
              ]}
            >
              <Input
                className="p-4 rounded-none  text-xl max-sm:text-base placeholder-gray-600"
                placeholder="Email"
              />
            </Form.Item>
          </div>
        </div>
        <button className="text-xl flex justify-center space-x-2 items-center rounded-none w-full max-sm:text-base hover:bg-green-800 max-lg:py-2 mt-5 font-bold uppercase bg-greenTheme text-white p-4 ">
          <span>Gửi</span>
        </button>
      </Form>
    </section>
  );
};

export default ForgotPassword;