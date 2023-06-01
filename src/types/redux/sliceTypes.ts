export interface initialStateUserSlice {
    user: userSliceType | null;
}

export type userSliceType =  {
    uniqueId: string,
    phoneNumber: string,
    countryCode: string,
    country: string,
    status: string,
    imageURL: string
    contacts: string[],
    fullName: string;

}