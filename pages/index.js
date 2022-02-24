import { getSession } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header.js";
import Login from "../components/Login.js";
import Sidebar from "../components/Sidebar.js";
import Feed from "../components/Feed.js";
import Widgets from "../components/Widgets.js";

export default function Home({ session }) {
  if (!session) return <Login />;
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook_clone</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
