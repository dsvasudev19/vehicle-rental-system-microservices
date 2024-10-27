export class Booking {
    bookingId: number;
    bookingDate: Date;
    fromDate: Date;
    toDate: Date;
    durationHours: number;
    price: number;
    userId: number;
    vehicleId: number;
    status: string;

    constructor(
        bookingId: number = 0,
        bookingDate: Date = new Date(),
        fromDate: Date,
        toDate: Date,
        durationHours: number,
        price: number,
        userId: number,
        vehicleId: number,
        status: string
    ) {
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.durationHours = durationHours;
        this.price = price;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.status = status;
    }

    updateBookingDate(): void {
        this.bookingDate = new Date();
    }
}
