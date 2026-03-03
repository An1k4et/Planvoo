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
            trips: {
                Row: {
                    id: string;
                    user_id: string;
                    trip_details: Json;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    trip_details: Json;
                };
                Update: {
                    trip_details?: Json;
                };
            };
        };
    };
}
