import { AntdLayout, Dropdown, Icons, Menu, MenuProps, Space } from "@pankod/refine-antd";
import { HeaderProps } from "interfaces";

enum MenuOpts {
  "superuser" = "Administrator",
  "user" = "User",
}

const handleChange: MenuProps["onClick"] = ({ key }) => {
  localStorage.setItem("role", key);
  location.reload();
};
const menu = (
  <Menu
    onClick={handleChange}
    items={[
      {
        key: "superuser",
        label: "Administrator",
      },
      {
        key: "user",
        label: "User",
      },
    ]}
  />
);

export const Header: React.FC<HeaderProps> = ({ role }) => {
  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Dropdown overlay={menu}>
        <Space>
          {MenuOpts[role]}
          <Icons.DownOutlined />
        </Space>
      </Dropdown>
    </AntdLayout.Header>
  );
};
