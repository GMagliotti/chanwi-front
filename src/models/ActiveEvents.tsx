interface ActiveEvent {
    title: string;
    description: string;
    start: Date;
    end: Date;
  }
  
export interface ActivePost extends ActiveEvent {
    stock: number;
    price: number;
    orders?: Consumer[];
}

export interface ActiveDrive extends ActiveEvent {}