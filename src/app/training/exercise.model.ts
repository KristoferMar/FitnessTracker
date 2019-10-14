export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    //State can be one of these three values in string.
    state?: 'completed' | 'cancelled' | null;
}