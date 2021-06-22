export type TDiscography = {
    title: string,
    genre: string[],
    lineUp: TDiscographyLineUp[]
    tracklist: TTracklist[],
    release: number
    type: string,
    albumImg: string
}

export type TDiscographyLineUp = {
    instrument: string[],
    name: string
}

export type TTracklist = {
    title: string,
    trackNumber: number,
    lyrics: string,
    musicBy: string[],
    writtenBy: string[]
}