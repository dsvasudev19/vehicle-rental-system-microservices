export class User {
    userId: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;

    constructor(
        userId: number,
        name: string,
        email: string,
        phone: string,
        createdAt: Date
    ) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt;
    }
}
