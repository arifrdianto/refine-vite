import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout, ErrorComponent } from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { newEnforcer } from "casbin";

import "./styles/custom.less";

import { Header, Sider } from "./components/layout";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { adapter, model } from "./accessControl";
import { HeaderProps } from "./interfaces";

const App: React.FC = () => {
  const role = localStorage.getItem("role") ?? "superuser";
  const domain = import.meta.env.VITE_RBAC_DOMAIN || "";

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={notificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
      accessControlProvider={{
        can: async ({ action, params, resource }) => {
          const enforcer = await newEnforcer(model, adapter);
          return Promise.resolve({
            can: await enforcer.enforce(role, domain, resource, action),
          });
        },
      }}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
          canDelete: true,
        },
      ]}
      Header={() => <Header role={role as unknown as "superuser" | "user"} />}
      Sider={Sider}
      options={{ disableTelemetry: true }}
    />
  );
};

export default App;
