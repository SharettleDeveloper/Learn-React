// "use client";
type UserRole = "Admin" | "Editor" | "Viewer";

interface DashboardProps {
  username: string;
  lastLogin: string;
}

const AdminDashboard = ({ username, lastLogin }: DashboardProps) => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>
      Welcome, {username}. Last login: {lastLogin}
    </p>
    <button>Manage Users</button>
    <button>View Reports</button>
  </div>
);

const EditorDashboard = ({ username, lastLogin }: DashboardProps) => (
  <div>
    <h1>Editor Dashboard</h1>
    <p>
      Welcome, {username}. Last login: {lastLogin}
    </p>
    <button>Create New Content</button>
    <button>Edit Existing Content</button>
  </div>
);
const ViewerDashboard = ({ username, lastLogin }: DashboardProps) => (
  <div>
    <h1>Viewer Dashboard</h1>
    <p>
      Welcome, {username}. Last login: {lastLogin}
    </p>
    <p>You have read-only access.</p>
  </div>
);

const DashboardFactory = (role: UserRole, props: DashboardProps) => {
  switch (role) {
    case "Admin":
      return <AdminDashboard {...props} />;
    case "Editor":
      return <EditorDashboard {...props} />;
    case "Viewer":
      return <ViewerDashboard {...props} />;
  }
};

const getRandomUserRole = (): UserRole => {
  const roles: UserRole[] = ["Admin", "Editor", "Viewer"];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

const Appfactory = () => {
  const userRole: UserRole = getRandomUserRole();
  const userProps: DashboardProps = { username: "John Doe", lastLogin: "2024-09-25" };

  return (
    <div>
      <h1>UserDashboard</h1>
      {DashboardFactory(userRole, userProps)}
    </div>
  );
};

export default Appfactory;
