import React from "react";

//contentの型はReact.ReactNode or JSX.Element
let content: React.ReactNode;
// let content: JSX.Element;

//ここにユーザー認証
let isLoggedIn = true;

//ログイン済みの人
const AdminPaned = () => {
  return <h1>Admin</h1>;
};

//ログインしてない人
const LoginForm = () => {
  return <h1>Login Form</h1>;
};

//どちらを表示するか
if (isLoggedIn) {
  content = <AdminPaned />;
} else {
  content = <LoginForm />;
}

//表示
export default function IsLogined() {
  return (
    <div>
      {content}
      {isLoggedIn ? <AdminPaned /> : <LoginForm />}
      {isLoggedIn && <AdminPaned />}
    </div>
  );
}
