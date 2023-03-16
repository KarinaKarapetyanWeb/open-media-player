import React, { useState } from "react";
import { Step } from "../../const";
import useAppSelector from "../../hooks/useAppSelector";
import { getStep } from "../../store/reducers/step/selectors";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Form from "../Form/Form";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import styles from "./App.module.scss";

function App() {
  const step = useAppSelector(getStep);

  switch (step) {
    case Step.Check:
      return <Form />;
    case Step.Audio:
      return <AudioPlayer />;
    case Step.Video:
      return <VideoPlayer />;
    default:
      return <Form />;
  }
}

export default App;
