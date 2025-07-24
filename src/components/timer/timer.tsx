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
  const { timer } = useTimer(teamId);
  const [play, { stop }] = useSound(TIMER_SOUND.BOB_ESPONJA_ESTAN_LISTOS);

  console.log({ timer });

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
      />
    );
};
