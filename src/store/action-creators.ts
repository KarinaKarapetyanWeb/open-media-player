import Step from "./reducers/step";
import Track from "./reducers/track";

const allActionCreators = {
  ...Step.actions,
  ...Track.actions,
};

export default allActionCreators;
