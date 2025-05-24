import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

<Form {...form}>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="max-w-[850px] w-full mx-auto text-black"
  >
    <div className="text-center space-y-4">
      <h3 className="uppercase text-base font-normal text-[#344054]">
        Contact Us
      </h3>
      <h1 className="font-bold text-xl lg:text-3xl">
        Umbrella Capitals Enquires
      </h1>
      <p className="font-normal text-base">
        Umbrella Capitals is ready to assist you in navigating the expanding
        digital landscape. Feel free to reach out with any{" "}
        <b>Investment, Consultation</b> or <b>Partnership</b> inquiries you may
        have.
      </p>
    </div>

    <div className="flex flex-col divide-y-[1px] divide-[#EAECF0] gap-6">
      {contactArr.map((section, idx) => (
        <div
          key={idx}
          className="grid lg:grid-cols-2 pt-6 w-full gap-x-10 gap-y-4"
        >
          {section.section.map((input) =>
            input.type === "textarea" ? (
              <FormField
                control={form.control}
                name={input.name as keyof ContactInputs}
                key={input.name}
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormControl>
                      <div className="flex flex-col gap-[6px] ">
                        <label
                          htmlFor={input.name}
                          className="font-medium text-sm"
                        >
                          {(form.formState.errors as Record<string, any>)[
                            input.name
                          ]?.message ? (
                            <span className="text-red-500">
                              {
                                (form.formState.errors as Record<string, any>)[
                                  input.name
                                ]?.message
                              }
                            </span>
                          ) : (
                            input.label
                          )}
                        </label>
                        <Textarea
                          className="h-[145px]"
                          placeholder={input.placeholder}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : input.type === "select" ? (
              <FormField
                control={form.control}
                name={input.name as keyof ContactInputs}
                key={input.name}
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormControl>
                      <div className="flex flex-col gap-[6px] ">
                        <label
                          htmlFor={input.name}
                          className="font-medium text-sm"
                        >
                          {(form.formState.errors as Record<string, any>)[
                            input.name
                          ]?.message ? (
                            <span className="text-red-500">
                              {
                                (form.formState.errors as Record<string, any>)[
                                  input.name
                                ]?.message
                              }
                            </span>
                          ) : (
                            input.label
                          )}
                        </label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full h-[45px]">
                            <SelectValue placeholder={input.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {input.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name={input.name as keyof ContactInputs}
                key={input.name}
                render={({ field }) => (
                  <FormItem
                    className={`${
                      input.name === "email" ? "lg:col-span-2" : ""
                    }`}
                  >
                    <FormControl>
                      <div className={`flex flex-col gap-[6px]`}>
                        <label
                          htmlFor={input.name}
                          className="font-medium text-sm"
                        >
                          {(form.formState.errors as Record<string, any>)[
                            input.name
                          ]?.message ? (
                            <span className="text-red-500">
                              {
                                (form.formState.errors as Record<string, any>)[
                                  input.name
                                ]?.message
                              }
                            </span>
                          ) : (
                            input.label
                          )}
                        </label>
                        <Input
                          placeholder={input.placeholder}
                          className="h-[45px]"
                          type={input.type}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )
          )}
        </div>
      ))}
    </div>

    <div className="w-full flex items-center justify-end mt-6 gap-4">
      <Link
        href="/"
        aria-disabled={isLoading}
        className="uppercase border-black border text-black px-5 py-3 rounded-full bg-white inline-flex items-center justify-center hover:text-white hover:bg-black"
      >
        cancel
      </Link>
      <button
        type="submit"
        disabled={isLoading}
        className="uppercase bg-black text-white px-5 py-3 rounded-full inline-flex items-center justify-center hover:bg-white hover:text-black"
      >
        {isLoading ? "Sending..." : "submit"}
      </button>
    </div>
  </form>
</Form>;
