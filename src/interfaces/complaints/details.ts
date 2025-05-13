export interface ComplaintTimelineProps {
  events: {
    date: string;
    title: string;
    description: string;
    status: ComplaintStatus["value"];
  }[];
}

export interface ComplaintDocumentProps {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
} 