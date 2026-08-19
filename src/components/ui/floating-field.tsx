/* eslint-disable prettier/prettier */
import * as React from "react";

import { cn } from "@/lib/utils";

type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerClassName?: string;
};

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, containerClassName, placeholder, ...props }, ref) => {
    const labelText = label ?? placeholder;

    return (
      <label className={cn("relative block", containerClassName)}>
        <input
          {...props}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer block h-[60px] w-full rounded-lg border border-gray-700 bg-white px-4 pt-5 pb-3 text-[16px] font-medium text-brand-navy placeholder-transparent transition-colors focus:border-brand-blue focus:outline-none",
            className,
          )}
        />
        {labelText ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded-sm bg-white px-1 text-[15px] text-brand-navy/70 transition-all duration-150 ease-out peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[12px] peer-focus:text-brand-blue peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:text-brand-blue">
            {labelText}
          </span>
        ) : null}
      </label>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

type FloatingTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  containerClassName?: string;
};

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, className, containerClassName, placeholder, ...props }, ref) => {
    const labelText = label ?? placeholder;

    return (
      <label className={cn("relative block", containerClassName)}>
        <textarea
          {...props}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer block w-full min-h-[120px] rounded-lg border border-gray-700 bg-white px-4 pb-3 pt-7 text-[14px] font-medium text-brand-navy placeholder-transparent transition-colors focus:border-brand-blue focus:outline-none",
            className,
          )}
        />
        {labelText ? (
          <span className="pointer-events-none absolute left-4 top-6 rounded-sm bg-white px-1 whitespace-pre text-[15px] text-brand-navy/70 transition-all duration-150 ease-out peer-focus:top-0 peer-focus:text-[12px] peer-focus:text-brand-blue peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[12px] peer-[&:not(:placeholder-shown)]:text-brand-blue">
            {labelText}
          </span>
        ) : null}
      </label>
    );
  },
);
FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingInput, FloatingTextarea };