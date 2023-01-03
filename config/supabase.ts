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
          course_id: number;
          created_at: string;
          grade: string;
          section: string;
          shift: string;
          capacity: number;
        };
        Insert: {
          course_id?: number;
          created_at?: string;
          grade: string;
          section: string;
          shift: string;
          capacity: number;
        };
        Update: {
          course_id?: number;
          created_at?: string;
          grade?: string;
          section?: string;
          shift?: string;
          capacity?: number;
        };
      };
      students: {
        Row: {
          student_id: number;
          created_at: string;
          first_name: string;
          middle_names: string;
          last_name: string;
          birth_date: string;
          gender: string;
          has_siblings: boolean;
          siblings_ids: number;
        };
        Insert: {
          student_id?: number;
          created_at?: string;
          first_name: string;
          middle_names?: string;
          last_name: string;
          birth_date: string;
          gender?: string;
          has_siblings?: boolean;
          siblings_ids: number;
        };
        Update: {
          student_id?: number;
          created_at?: string;
          first_name?: string;
          middle_names?: string;
          last_name?: string;
          birth_date?: string;
          gender?: string;
          has_siblings?: boolean;
          siblings_ids?: number;
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
