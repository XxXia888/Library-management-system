import { UserLoginType } from "@/types";
import request from "@/utils/request";
import Icon from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import classnames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./index.module.css";

export default function Login() {
  const router = useRouter();
  const onFinish = async (values: UserLoginType) => {
    try {
      const res = await request.post("/api/login", values);
      console.log(
        "%c [ res ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        res
      );
      localStorage.setItem("user", JSON.stringify(res.data || {}));
      message.success("Successfully login");

      router.push("/book");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Library management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Image
            className={styles.img}
            width={100}
            height={100}
            src="/logo.svg"
            alt="logo"
          />
          Library management system
        </header>
        <div className={styles.form}>
          <Form
            name="basic"
            initialValues={{ name: "", password: "" }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="name"
              label={<span className={styles.label}>Account</span>}
              rules={[{ required: true, message: "please enter account" }]}
            >
              <Input placeholder="please enter username" />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className={styles.label}>Password</span>}
              rules={[{ required: true, message: "please enter password" }]}
            >
              <Input.Password placeholder="please enter password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={classnames(styles.btn, styles.loginBtn)}
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    </>
  );
}
