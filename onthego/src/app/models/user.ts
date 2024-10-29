export class User {
    userId: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    isAuthenticated:boolean;

    constructor(
        userId: number,
        name: string,
        email: string,
        phone: string,
        createdAt: Date,
        isAuthenticated:boolean
    ) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt;
        this.isAuthenticated=isAuthenticated
    }
}
