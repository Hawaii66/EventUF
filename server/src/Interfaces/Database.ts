export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      business: {
        Row: {
          city: string
          created_at: string | null
          description: string
          id: number
          image: string
          name: string
        }
        Insert: {
          city: string
          created_at?: string | null
          description: string
          id?: number
          image: string
          name: string
        }
        Update: {
          city?: string
          created_at?: string | null
          description?: string
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          business: number
          city: string
          colaborator: number | null
          created_at: string | null
          description: string
          end: number
          id: number
          image: string
          name: string
          price: number
          sponsored: boolean
          start: number
          type: string
        }
        Insert: {
          business: number
          city?: string
          colaborator?: number | null
          created_at?: string | null
          description?: string
          end: number
          id?: number
          image?: string
          name?: string
          price: number
          sponsored?: boolean
          start: number
          type: string
        }
        Update: {
          business?: number
          city?: string
          colaborator?: number | null
          created_at?: string | null
          description?: string
          end?: number
          id?: number
          image?: string
          name?: string
          price?: number
          sponsored?: boolean
          start?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_business_fkey"
            columns: ["business"]
            referencedRelation: "business"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_colaborator_fkey"
            columns: ["colaborator"]
            referencedRelation: "business"
            referencedColumns: ["id"]
          }
        ]
      }
      usereventmap: {
        Row: {
          created_at: string | null
          event: number
          id: number
          user: string
        }
        Insert: {
          created_at?: string | null
          event: number
          id?: number
          user: string
        }
        Update: {
          created_at?: string | null
          event?: number
          id?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "usereventmap_event_fkey"
            columns: ["event"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usereventmap_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          age: number
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          age: number
          created_at?: string | null
          id: string
          name: string
        }
        Update: {
          age?: number
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
