"use client";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div>
      {children}
      <button className="textButton" type="button" onClick={() => router.push("/")}>
        Back to homepage...
      </button>
    </div>
  );
}
