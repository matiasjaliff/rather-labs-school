export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          capacity: number;
          course_id: number;
          created_at: string;
          grade: string;
          section: string;
          shift: string;
        };
        Insert: {
          capacity?: number;
          course_id?: number;
          created_at?: string;
          grade?: string;
          section?: string;
          shift?: string;
        };
        Update: {
          capacity?: number;
          course_id?: number;
          created_at?: string;
          grade?: string;
          section?: string;
          shift?: string;
        };
      };
      students: {
        Row: {
          birth_date: string;
          course_id: number | null;
          created_at: string;
          first_name: string;
          gender: string;
          has_siblings: boolean;
          last_name: string;
          middle_names: string;
          siblings_ids: number[];
          student_id: number;
        };
        Insert: {
          birth_date?: string;
          course_id?: number | null;
          created_at?: string;
          first_name?: string;
          gender?: string;
          has_siblings?: boolean;
          last_name?: string;
          middle_names?: string;
          siblings_ids?: number[];
          student_id?: number;
        };
        Update: {
          birth_date?: string;
          course_id?: number | null;
          created_at?: string;
          first_name?: string;
          gender?: string;
          has_siblings?: boolean;
          last_name?: string;
          middle_names?: string;
          siblings_ids?: number[];
          student_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
