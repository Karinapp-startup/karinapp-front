import { Button } from "@/components/ui/button";

export const ComplaintsHeader = () => {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Button>
        <span>Complaints</span>
      </div>
      <h1 className="text-2xl font-semibold mb-6">Complaints Index</h1>
    </>
  );
}; 