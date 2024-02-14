import { Competition } from "./competition/competition";
import { Member } from "./member";
import { Fish } from "./fish";

export interface Hunting {
    //Req
    memberIdentity: string,
    competitionCode: string,
    fishName: string,
    weight: number

    //Res
    number_of_fish?: number,
    fish?: Fish,
    member?: Member,
    competition?: Competition
}
