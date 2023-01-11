import { Database } from "./supabase";

export type CourseType = Database["public"]["Tables"]["courses"]["Row"];
export type StudentType = Database["public"]["Tables"]["students"]["Row"];
