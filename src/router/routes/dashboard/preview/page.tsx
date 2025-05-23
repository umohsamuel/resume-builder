import { ResumeForm } from "@/components/form";
import { ResumePDF } from "@/components/resume";
import { useFormStore } from "@/store/form.store";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

export default function PreviewResume() {
  const resumeData = useFormStore((state) => state.resumeData);

  return (
    <div className="w-full grid grid-cols-2 h-[calc(100vh-60px)] overflow-hidden">
      <ResumeForm />
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}

function ResumePreview({ resumeData }: { resumeData: ResumeData }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [resumeData]);

  return (
    <PDFViewer
      width="100%"
      height="100%"
      key={key}
      style={{ width: "100%", height: "100%" }}
    >
      <ResumePDF data={resumeData} />
    </PDFViewer>
  );
}
