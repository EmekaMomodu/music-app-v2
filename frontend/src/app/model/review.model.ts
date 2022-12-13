import {Creator} from "./creator.model";

export interface Review {
    id?: string;
    comment?: string;
    rating?: number;
    creator?: Creator;
    createdAt?: Date;
    hiddenFlag?: string;
}
