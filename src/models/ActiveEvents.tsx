interface ActiveEvent {
    title: string;
    description?: string;
    start_time: Date;
    end_time: Date;
  }
  
export interface ActivePost extends ActiveEvent {
    stock: number;
    price: number;
    orders?: Consumer[];
}

export interface ActiveDrive extends ActiveEvent {
  desc?: string;
  receiver_id: number;
}