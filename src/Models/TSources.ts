export type TSources = {
    id: string,
    refs: TReference[],
}

export type TReference = {
    title: string,
    source: string,
    articleWritten: Date,
    recieved: Date,
    rating: number[],
    referenceNumber: number
}