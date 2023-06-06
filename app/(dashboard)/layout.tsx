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
      {children}
    </div>
  );
}