import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resumeSchema, type ResumeFormData } from "@/lib/form.validation";
import {
  ContactInformation,
  Education,
  Experience,
  OptionalSections,
  ProfessionalSummary,
  Skills,
} from "./form.resume.items";
import { useFormStore } from "@/store/form.store";
import { Form } from "@/components/ui/form";

export default function ResumeForm() {
  const resumeData = useFormStore((state) => state.resumeData);
  const updateResumeData = useFormStore((state) => state.updateResumeData);

  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema) as Resolver<ResumeFormData>,
    defaultValues: resumeData,
  });

  const onSubmit = (data: ResumeFormData) => {
    console.log("Resume Data:", data);
    updateResumeData(data);
  };

  return (
    <div className="w-full h-full lg:max-h-[calc(100vh-60px)] overflow-y-auto flex flex-col mx-auto px-[5%] py-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resume Builder
        </h1>
        <p className="text-gray-600">
          Fill out the form below to create your professional resume
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <ContactInformation
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />
          <ProfessionalSummary
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />
          <Experience
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />
          <Education
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />
          <Skills
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />
          <OptionalSections
            register={form.register}
            control={form.control}
            errors={form.formState.errors}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
            >
              Generate Resume
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
