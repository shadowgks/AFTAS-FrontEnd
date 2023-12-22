import { Competition } from "../../competition/models/competition";
import { Member } from "../../member/models/member";

export interface Ranking {
    score: number,
    rank: number,
    member: Member,
    competition: Competition
}
