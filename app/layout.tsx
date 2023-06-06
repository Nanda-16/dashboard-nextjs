import "./globals.css";
import { Inconsolata } from "next/font/google";
import { Providers } from "@/redux/provider";
import Header from "./components/common/Header";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata = {
  title: "Employee Manager",
  description: "Employee Management Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inconsolata.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
