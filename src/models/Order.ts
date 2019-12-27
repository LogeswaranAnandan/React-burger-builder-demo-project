import ContactInfo from "./ContactInfo"
import { Ingredients } from "./Interface";

export default class Order {
    contactInfo: ContactInfo;
    ingredients: Ingredients;
    price: number;
    userId: string;
    id: string;
}