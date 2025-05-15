export interface SignatureFormData {
  fullName: string;
  rut: string;
  signature: string;
  font?: string;
  signatureType: "draw" | "type";
}

export const defaultSignatureFormData: SignatureFormData = {
  fullName: "",
  rut: "",
  signature: "",
  font: undefined,
  signatureType: "draw"
}; 