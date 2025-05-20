"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Complaints } from "@/components/complaints/components/list-compliance";
import { complaintsMockData } from "@/components/complaints/components/list-compliance/complements/data/mockData";

export default function ComplaintsPage() {
  return (
    <main className="min-h-screen">
      <Complaints complaints={complaintsMockData} />
    </main>
  );
}
