export interface DocumentUploaderProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string[];
  maxSize?: number;
}

export interface DocumentListProps {
  documents: ComplaintDocumentProps[];
  onDelete?: (id: string) => void;
  onDownload?: (document: ComplaintDocumentProps) => void;
} 