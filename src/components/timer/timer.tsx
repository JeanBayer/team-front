import { useTimer } from "@/hooks/use-timer";
import { useState } from "react";
import { useParams } from "react-router";
import useSound from "use-sound";
import { TIMER_SOUND } from "../sounds/timer-sounds";
import { TimerCountdown } from "./timer-countdown";
import { TimerInitial } from "./timer-initial";

export const Timer = () => {
  const [initialState, setInitialState] = useState(true);
  const { teamId } = useParams();
  const { timer, timerCancel } = useTimer(teamId);
  const [play] = useSound(TIMER_SOUND.BOB_ESPONJA_ESTAN_LISTOS);

  if (timer.isLoading || !teamId) return null;

  if (!timer.data && initialState) return <TimerInitial />;

  if (timer.data)
    return (
      <TimerCountdown
        date={timer.data?.endsAt?.toString()}
        onComplete={() => {
          play();
          timer.refetch();
          setInitialState(true);
        }}
        onCancel={() => {
          setInitialState(true);
          timerCancel.mutate();
        }}
      />
    );
};
