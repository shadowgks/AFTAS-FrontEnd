import { Role } from "../role"

export interface Member {
    id: number,
    fullName: string,
    userName: string,
    email: string,
    accessionDate: string
    nationality: string,
    identityDocumentType: string,
    identityNumber: string,
    role: Role[]
}
