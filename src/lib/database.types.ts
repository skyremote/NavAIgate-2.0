export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      checkin_items: {
        Row: {
          category: string
          checkin_id: string
          content: string
          created_at: string | null
          id: string
          is_important: boolean | null
          position: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          checkin_id: string
          content: string
          created_at?: string | null
          id?: string
          is_important?: boolean | null
          position?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          checkin_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_important?: boolean | null
          position?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checkin_items_checkin_id_fkey"
            columns: ["checkin_id"]
            isOneToOne: false
            referencedRelation: "weekly_checkins"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          checkin_id: string
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          checkin_id: string
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          checkin_id?: string
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_checkin_id_fkey"
            columns: ["checkin_id"]
            isOneToOne: false
            referencedRelation: "weekly_checkins"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          app_source: string | null
          avatar_url: string | null
          created_at: string | null
          credits: number | null
          email: string | null
          full_name: string | null
          id: string
          total_credits_purchased: number | null
          updated_at: string | null
        }
        Insert: {
          app_source?: string | null
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id: string
          total_credits_purchased?: number | null
          updated_at?: string | null
        }
        Update: {
          app_source?: string | null
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          total_credits_purchased?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sharing_connections: {
        Row: {
          created_at: string | null
          id: string
          owner_id: string
          updated_at: string | null
          viewer_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner_id: string
          updated_at?: string | null
          viewer_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          owner_id?: string
          updated_at?: string | null
          viewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sharing_connections_owner_id_fkey_profiles"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sharing_connections_viewer_id_fkey_profiles"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_cents: number
          created_at: string | null
          credits_purchased: number
          currency: string | null
          id: string
          metadata: Json | null
          status: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          credits_purchased: number
          currency?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          credits_purchased?: number
          currency?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      translation_history: {
        Row: {
          audio_url: string | null
          created_at: string | null
          id: string
          original_text: string
          source_language: string
          target_language: string
          translated_text: string
          user_id: string
          voice_profile_id: string | null
          voice_profile_name: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          id?: string
          original_text: string
          source_language: string
          target_language: string
          translated_text: string
          user_id: string
          voice_profile_id?: string | null
          voice_profile_name?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          id?: string
          original_text?: string
          source_language?: string
          target_language?: string
          translated_text?: string
          user_id?: string
          voice_profile_id?: string | null
          voice_profile_name?: string | null
        }
        Relationships: []
      }
      usage_history: {
        Row: {
          action_type: string
          created_at: string | null
          credits_used: number
          id: string
          input_length: number | null
          metadata: Json | null
          output_length: number | null
          source_language: string | null
          target_language: string | null
          user_id: string
          voice_profile_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          credits_used?: number
          id?: string
          input_length?: number | null
          metadata?: Json | null
          output_length?: number | null
          source_language?: string | null
          target_language?: string | null
          user_id: string
          voice_profile_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          credits_used?: number
          id?: string
          input_length?: number | null
          metadata?: Json | null
          output_length?: number | null
          source_language?: string | null
          target_language?: string | null
          user_id?: string
          voice_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_history_voice_profile_id_fkey"
            columns: ["voice_profile_id"]
            isOneToOne: false
            referencedRelation: "voice_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_profiles: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          language: string | null
          name: string
          updated_at: string | null
          user_id: string
          voice_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name: string
          updated_at?: string | null
          user_id: string
          voice_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      weekly_checkins: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          updated_at: string | null
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          updated_at?: string | null
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_credits: {
        Args: { p_amount: number; p_user_id: string }
        Returns: undefined
      }
      deduct_credits: {
        Args: {
          p_action_type: string
          p_amount: number
          p_metadata?: Json
          p_user_id: string
        }
        Returns: boolean
      }
      get_credits: { Args: { p_user_id: string }; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier access
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Commonly used types
export type Profile = Tables<'profiles'>
export type WaitlistEntry = Tables<'waitlist'>
export type Transaction = Tables<'transactions'>
export type UsageHistory = Tables<'usage_history'>
export type VoiceProfile = Tables<'voice_profiles'>

// App source identifiers - add your apps here
export type AppSource = 'ente-prise' | 'navaigate' | 'katana' | string
