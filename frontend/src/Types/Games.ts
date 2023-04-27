export interface Game {
    _id?: string,
    name: string,
    address: string,
    numberOfPeople: number,
    date: Date | string,
    time: string,
    fieldNumber: number,
}