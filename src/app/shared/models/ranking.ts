import { Competition } from "./competition/competition";
import { Member } from "./member/member";

export interface Ranking {
    score: number,
    rank: number,
    member: Member,
    competition: Competition
}
