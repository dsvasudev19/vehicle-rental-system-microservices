export class Vendor {
    vendorId: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    updateAt: Date;
    deletedAt?: Date; 

    constructor(
        vendorId: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        createdAt: Date,
        updateAt: Date,
        deletedAt?: Date
    ) {
        this.vendorId = vendorId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.deletedAt = deletedAt;
    }
}
