import "@/app/globals.css";
import Layout from "@/Components/Layout/Layout";

export const metadata = {
  title: "Home Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
