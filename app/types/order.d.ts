type TOrder = {
    _id?: string

    dogId: string

    customerName: string
    email: string
    contactNumber: string

    deliveryMethod: "Pickup" | "Delivery"
    address?: string

     status:
        | "Pending Verification"
        | "Approved"
        | "Rejected"
        | "Reserved"
        | "Ready for Pickup"
        | "Out for Delivery"
        | "Completed"
    createdAt?: Date
    updatedAt?: Date
}