
export class Vehicle {
    vehicleId: number;
    name: string;
    regNo: string;
    wheelCount: number;
    type: string;
    location: string;
    pincode: string;
    description: string;
    pricePerHr: number;
    vendorId: number;
    imagePath: string;
    reviews:any

    constructor(
        vehicleId: number,
        name: string,
        regNo: string,
        wheelCount: number,
        type: string,
        location: string,
        pincode: string,
        description: string,
        pricePerHr: number,
        vendorId: number,
        imagePath: string
    ) {
        this.vehicleId = vehicleId;
        this.name = name;
        this.regNo = regNo;
        this.wheelCount = wheelCount;
        this.type = type;
        this.location = location;
        this.pincode = pincode;
        this.description = description;
        this.pricePerHr = pricePerHr;
        this.vendorId = vendorId;
        this.imagePath = imagePath;
    }
}
