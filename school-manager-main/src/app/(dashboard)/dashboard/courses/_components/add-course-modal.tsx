"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AddCourseForm } from "./add-course-form";
import { useState } from "react";

interface AddCourseModalProps {
  children: JSX.Element;
}

export function AddCourseModal({ children }: AddCourseModalProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Course</SheetTitle>
          <SheetDescription>
            Enter course details to add a course
          </SheetDescription>
        </SheetHeader>
        <AddCourseForm onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
