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
import { defaultFormValues } from "@/lib/form.default";
import { useFormStore } from "@/store/form.store";

export default function ResumeForm() {
  const updateResumeData = useFormStore((state) => state.updateResumeData);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema) as Resolver<ResumeFormData>,
    defaultValues: defaultFormValues as ResumeFormData,
  });

  const onSubmit = (data: ResumeFormData) => {
    console.log("Resume Data:", data);
    updateResumeData(data);
  };

  return (
    <div className=" w-full lg:max-w-4xl overflow-y-auto min-h-full h-full mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resume Builder
        </h1>
        <p className="text-gray-600">
          Fill out the form below to create your professional resume
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <ContactInformation register={register} errors={errors} />
        <ProfessionalSummary register={register} errors={errors} />
        <Experience register={register} control={control} errors={errors} />
        <Education register={register} control={control} errors={errors} />
        <Skills register={register} control={control} errors={errors} />
        <OptionalSections
          register={register}
          control={control}
          errors={errors}
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
    </div>
  );
}
