import { ResumeForm } from "@/components/form";
import { ResumePDF } from "@/components/resume";
import { useFormStore } from "@/store/form.store";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

export default function PreviewResume() {
  const resumeData = useFormStore((state) => state.resumeData);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-60px)] lg:overflow-hidden">
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

  if (resumeData.contactInfo.name === "") {
    return (
      <div>
        <div className="w-full h-screen lg:h-[calc(100vh-60px)] px-[5%] bg-black/40 flex justify-center items-center">
          <h1 className="text-xl text-center font-bold">
            Start editing and save changes to preview your resume
          </h1>
        </div>
      </div>
    );
  }

  return (
    <PDFViewer
      width="100%"
      height="100%"
      key={key}
      className="!h-[100vh] !w-full lg:!h-[calc(100vh-60px)]"
    >
      <ResumePDF data={resumeData} />
    </PDFViewer>
  );
}
