import { TLongDesc } from './TDescription'
import { TDiscography } from './TDiscography'
import { TMembers } from './TMembers'
import { TMusicianAsociated } from './TMusicianAsociated'

export type TMusicianData = {
    id: string,
    name: string,
    origin: string[],
    genres: string[],
    shortDesc: string,
    yearsActive: string
    imgBanner: string,
    imgMusician: string,
    members: TMembers[],
    discography: TDiscography[],
    longDesc: TLongDesc,
    asociatedActs: TMusicianAsociated[]
}
