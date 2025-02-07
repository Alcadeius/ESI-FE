export interface Event {
    id: number;
    name: string;
  }
  
  export interface Activity {
    id: number;
    name: string;
    start_at: string;
    location: string;
    type: {
      id: number;
      name: string;
      flow: string;
    };
  }
  