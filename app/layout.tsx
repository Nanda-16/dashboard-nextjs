import "./globals.css";
import { Inconsolata } from "next/font/google";
import { Providers } from "@/redux/provider";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}