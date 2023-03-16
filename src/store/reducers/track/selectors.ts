import { NameSpace } from "../../../const";
import { State } from "../../../types/state";

export const getTrackUrl = (state: State): string => state[NameSpace.Track].url;
