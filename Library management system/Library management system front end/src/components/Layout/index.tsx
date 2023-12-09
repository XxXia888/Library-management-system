import { setLogout } from "@/api";
import { USER_ROLE } from "@/constants";
import { useCurrentUser } from "@/utils/hoos";
import { DownOutlined } from "@ant-design/icons";
import {
  ProfileOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout as AntdLayout,
  Dropdown,
  Menu,
  MenuProps,
  Space,
  message,
} from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { PropsWithChildren, ReactElement, useMemo } from "react";

import styles from "./index.module.css";

const { Header, Sider, Content } = AntdLayout;

const ITEMS = [
  {
    label: "Book Manage",
    key: "book",
    role: USER_ROLE.USER,
    icon: <SnippetsOutlined />,
    children: [
      {
        label: "Book List",
        key: "/book",
        role: USER_ROLE.USER,
      },
      {
        label: "Book Add",
        key: "/book/add",
        role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    label: "Borrow Manage",
    key: "borrow",
    role: USER_ROLE.USER,
    icon: <SolutionOutlined />,
    children: [
      {
        label: "Borrow List",
        key: "/borrow",
        role: USER_ROLE.USER,
      },
      {
        label: "Book Borrow",
        key: "/borrow/add",
        role: USER_ROLE.ADMIN,
      },
    ],
  },
  {
    label: "Tag Manage",
    key: "/category",
    icon: <ProfileOutlined />,
    role: USER_ROLE.ADMIN,
  },
  {
    label: "User Manage",
    key: "user",
    icon: <UserOutlined />,
    role: USER_ROLE.ADMIN,
    children: [
      {
        label: "User List",
        key: "/user",
        role: USER_ROLE.ADMIN,
      },
      {
        label: "User Add",
        key: "/user/add",
        role: USER_ROLE.ADMIN,
      },
    ],
  },
];

const Layout: React.FC<
  PropsWithChildren & { title?: string; operation?: ReactElement }
> = ({ children, title = "Book List", operation }) => {
  const router = useRouter();
  const user = useCurrentUser();

  const activeMenu = router.pathname;
  const defaultOpenKeys = [activeMenu.split("/")[1]];

  const handleChangeMenu: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  const USER_ITEMS: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`/user/edit/${user?._id}`}>Personal</Link>,
    },
    {
      key: "2",
      label: (
        <span
          onClick={async () => {
            await setLogout();
            localStorage.removeItem("user");
            message.success("Successfully logout");
            router.push("/login");
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  const items = useMemo(() => {
    if (user?.role === USER_ROLE.USER) {
      return ITEMS.filter((item) => {
        if (item.children) {
          item.children = item.children.filter(
            (k) => k.role === USER_ROLE.USER
          );
        }
        return item.role === USER_ROLE.USER;
      });
    } else {
      return ITEMS;
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Book Manage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AntdLayout className={styles.container}>
          <Header className={styles.header}>
            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="logo"
              className={styles.logo}
            />
            Book Manage System
            <span className={styles.user}>
              <Dropdown menu={{ items: USER_ITEMS }} placement="bottom">
                <span onClick={(e) => e.preventDefault()}>
                  <Space>
                    {user?.nickName}
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </span>
          </Header>
          <AntdLayout>
            <Sider className={styles.sider}>
              <Menu
                className={styles.menu}
                onClick={handleChangeMenu}
                selectedKeys={[activeMenu]}
                items={items}
                mode="inline"
                theme="light"
                defaultOpenKeys={defaultOpenKeys}
              />
            </Sider>
            <Content className={styles.content}>{children}</Content>
          </AntdLayout>
        </AntdLayout>
      </main>
    </>
  );
};

export default Layout;