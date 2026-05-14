import { Play, Pause, RotateCcw, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatSeconds } from "@/lib/time";

export function ControlsPanel({ step, engine, t, muted, onToggleMute }) {
  const { isPlaying, timeRemaining, sequenceState, start, pause, reset, completeCurrent } = engine;
  const status = (() => {
    if (!step) return "";
    if (step.type === "time") return `${t.timeRemaining}: ${formatSeconds(timeRemaining)}`;
    if (step.type === "reps") return `${t.repetitions}: ${step.reps}`;
    if (step.type === "sequence") return `${t.round}: ${sequenceState.round}/${step.reps} • ${t.substep}: ${sequenceState.substep + 1}/${step.sequence.length} • ${formatSeconds(sequenceState.substepRemaining)}`;
    return "";
  })();

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{status}</Badge>
        {step?.type === "sequence" && <Badge>{t.sequence}</Badge>}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={start} disabled={isPlaying}><Play className="mr-2 h-4 w-4" />{t.start}</Button>
        <Button onClick={pause} variant="secondary" disabled={!isPlaying}><Pause className="mr-2 h-4 w-4" />{t.pause}</Button>
        <Button onClick={completeCurrent} variant="soft"><CheckCircle2 className="mr-2 h-4 w-4" />{t.next}</Button>
        <Button onClick={reset} variant="secondary"><RotateCcw className="mr-2 h-4 w-4" />{t.reset}</Button>
        <Button onClick={onToggleMute} variant="secondary">{muted ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}{muted ? t.unmute : t.mute}</Button>
      </div>
    </Card>
  );
}
