import { userAdd, userUpdate } from "@/api";
import { Content } from "@/components";
import { USER_ROLE, USER_SEX, USER_STATUS } from "@/constants";
import { UserFormProps, UserType } from "@/types";
import { useCurrentUser } from "@/utils/hoos";
import { Button, Form, Input, Radio, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

const UserForm: React.FC<UserFormProps> = ({
  title,
  editData = {
    sex: USER_SEX.MALE,
    status: USER_STATUS.ON,
    role: USER_ROLE.USER,
    _id: null,
  },
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const user = useCurrentUser();
  useEffect(() => {
    form.setFieldsValue(editData);
  }, [editData, form]);

  const handleFinish = async (values: UserType) => {
    try {
      if (editData?._id) {
        await userUpdate(editData._id, values);
        message.success("Successfully edit");
      } else {
        await userAdd(values);
        message.success("Successfully create");
      }
      setTimeout(() => {
        router.push("/user");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isEdit = !!editData?._id;

  return (
    <>
      <Content title={title}>
        <Form
          name="book"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          className={styles.form}
          initialValues={editData}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Account"
            extra="Account for login"
            name="name"
            rules={[
              {
                required: true,
                message: "please enter name",
              },
            ]}
          >
            <Input placeholder="please enter" />
          </Form.Item>
          <Form.Item
            label="name"
            extra="Name for show"
            name="nickName"
            rules={[
              {
                required: true,
                message: "please enter name",
              },
            ]}
          >
            <Input placeholder="please enter" />
          </Form.Item>
          <Form.Item label="gender" name="sex">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: isEdit ? false : true,
                message: "please enter author",
              },
            ]}
          >
            <Input.Password placeholder="please enter" type="password" />
          </Form.Item>
          <Form.Item label="status" name="status">
            <Radio.Group disabled={user?.role === USER_ROLE.USER}>
              <Radio value="on">Active</Radio>
              <Radio value="off">Forbidden</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Radio.Group disabled={user?.role === USER_ROLE.USER}>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.btn}
            >
              {editData?._id ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default UserForm;
