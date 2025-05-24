import { defaultFormValues } from "@/lib/form.default";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  resumeData: ResumeData;
};

type Action = {
  updateResumeData: (resumeData: State["resumeData"]) => void;
};

export const useFormStore = create<State & Action>()(
  persist(
    (set) => ({
      resumeData: defaultFormValues,
      updateResumeData: (resumeData) => set({ resumeData }),
    }),
    {
      name: "form-store",
    }
  )
);
