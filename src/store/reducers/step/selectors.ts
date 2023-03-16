import { NameSpace } from "../../../const";
import { State } from "../../../types/state";
import { IStep } from "./types";

export const getStep = (state: State): IStep => state[NameSpace.Step].step;
