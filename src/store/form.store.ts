import { defaultFormValues } from "@/lib/form.default";
import { create } from "zustand";

type State = {
  resumeData: ResumeData;
};

type Action = {
  updateResumeData: (resumeData: State["resumeData"]) => void;
};

export const useFormStore = create<State & Action>((set) => ({
  resumeData: defaultFormValues,
  updateResumeData: (resumeData) => set({ resumeData }),
}));
