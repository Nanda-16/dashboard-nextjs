import Header from "@/components/dashboard/Header";

export const metadata = {
  title: "Home - Employee Manager",
  description: "Employee Management Website",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}