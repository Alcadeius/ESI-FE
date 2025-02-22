// type event sudah dibuat

export interface IActivity {
  id: number;
  name: string;
  start_at: string;
  end_at: string;
  location: string;
  map_link: string;
  created_at: string;
  updated_at: string;
  status: {
            data: {
                is_open: true,
            }
        },
  type: {
    id: number;
    name: string;
    flow: string;
    created_at: string;
    updated_at: string;
  }
}