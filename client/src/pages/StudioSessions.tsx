import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Play, Pause, Square, Timer, Coffee, Palette, Briefcase, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import CircularProgress from "@/components/CircularProgress";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type CreativeSession, type Entity, type InsertCreativeSession } from "@shared/schema";

export default function StudioSessions() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selectedSessionType, setSelectedSessionType] = useState<string>("painting");
  const [selectedEntity, setSelectedEntity] = useState<string>("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionMood, setSessionMood] = useState<string>("focused");
  const [sessionIntensity, setSessionIntensity] = useState<string>("medium");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const { data: entities } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  const { data: sessions, isLoading: sessionsLoading } = useQuery<CreativeSession[]>({
    queryKey: ["/api/creative-sessions"],
  });

  const startSessionMutation = useMutation({
    mutationFn: (sessionData: InsertCreativeSession) => apiRequest("POST", "/api/creative-sessions", sessionData),
    onSuccess: (response: Response) => {
      // Generate temporary session ID for tracking
      const sessionId = Date.now().toString();
      setCurrentSessionId(sessionId);
      setIsTimerRunning(true);
      queryClient.invalidateQueries({ queryKey: ["/api/creative-sessions"] });
    },
  });

  const completeSessionMutation = useMutation({
    mutationFn: (data: { id: string; updates: any }) => 
      apiRequest("PATCH", `/api/creative-sessions/${data.id}`, data.updates),
    onSuccess: () => {
      setCurrentSessionId(null);
      setIsTimerRunning(false);
      setTimerSeconds(0);
      setSessionNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/creative-sessions"] });
    },
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    if (!selectedEntity || !selectedSessionType) return;
    
    startSessionMutation.mutate({
      type: selectedSessionType,
      entityId: selectedEntity,
      mood: sessionMood,
      intensity: sessionIntensity,
      duration: 0,
    });
  };

  const pauseSession = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const stopSession = () => {
    if (!currentSessionId) return;
    
    completeSessionMutation.mutate({
      id: currentSessionId,
      updates: {
        duration: Math.floor(timerSeconds / 60),
        completedAt: new Date().toISOString(),
        output: sessionNotes || null,
      }
    });
  };

  const sessionTypes = [
    { value: "painting", label: "Painting", icon: Palette, color: "text-chart-1" },
    { value: "digital_art", label: "Digital Art", icon: Palette, color: "text-chart-2" },
    { value: "sketching", label: "Sketching", icon: Palette, color: "text-chart-3" },
    { value: "client_work", label: "Client Work", icon: Briefcase, color: "text-chart-4" },
    { value: "planning", label: "Planning", icon: Briefcase, color: "text-chart-5" },
    { value: "break", label: "Creative Break", icon: Coffee, color: "text-muted-foreground" },
  ];

  const activeSession = sessions?.find(s => !s.completedAt);
  const recentSessions = sessions?.filter(s => s.completedAt).slice(0, 10) || [];

  if (sessionsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-sessions">Creative Sessions</h1>
          <p className="text-muted-foreground">Focus time tracking and session management</p>
        </div>
        <Button variant="outline" size="icon" data-testid="button-session-options">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Session Timer */}
      <Card className="bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Session Timer</span>
            <Timer className="w-5 h-5" />
          </CardTitle>
          <CardDescription>
            {currentSessionId ? 'Session in progress' : 'Start a new creative session'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timer Display */}
            <div className="text-center space-y-4">
              <div className="relative">
                <CircularProgress
                  percentage={currentSessionId ? (timerSeconds % 3600) / 36 : 0}
                  size={180}
                  strokeWidth={10}
                  color={currentSessionId ? "#ef4444" : "#6b7280"}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {formatTime(timerSeconds)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentSessionId ? selectedSessionType : 'Ready to start'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-3">
                {!currentSessionId ? (
                  <Button 
                    onClick={startSession} 
                    disabled={!selectedEntity || !selectedSessionType}
                    className="bg-chart-1 hover:bg-chart-1/90"
                    data-testid="button-start-timer"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={pauseSession}
                      variant={isTimerRunning ? "outline" : "default"}
                      data-testid="button-pause-timer"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isTimerRunning ? 'Pause' : 'Resume'}
                    </Button>
                    <Button 
                      onClick={stopSession}
                      variant="destructive"
                      data-testid="button-stop-timer"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Session Configuration */}
            {!currentSessionId && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Entity</label>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger data-testid="select-entity">
                      <SelectValue placeholder="Choose entity" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities?.map((entity) => (
                        <SelectItem key={entity.id} value={entity.id}>
                          {entity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Type</label>
                  <Select value={selectedSessionType} onValueChange={setSelectedSessionType}>
                    <SelectTrigger data-testid="select-session-type">
                      <SelectValue placeholder="Choose activity" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mood</label>
                  <Select value={sessionMood} onValueChange={setSessionMood}>
                    <SelectTrigger data-testid="select-mood">
                      <SelectValue placeholder="How are you feeling?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excited">Excited</SelectItem>
                      <SelectItem value="focused">Focused</SelectItem>
                      <SelectItem value="calm">Calm</SelectItem>
                      <SelectItem value="stressed">Stressed</SelectItem>
                      <SelectItem value="tired">Tired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Intensity</label>
                  <Select value={sessionIntensity} onValueChange={setSessionIntensity}>
                    <SelectTrigger data-testid="select-intensity">
                      <SelectValue placeholder="Session intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="intense">Intense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Session Notes */}
            {currentSessionId && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Notes</label>
                <Textarea
                  placeholder="What are you working on? Any thoughts or ideas..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="min-h-[100px]"
                  data-testid="textarea-session-notes"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your creative work history</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSessions.length > 0 ? (
            <div className="space-y-3">
              {recentSessions.map((session, index) => {
                const sessionType = sessionTypes.find(t => t.value === session.type);
                const Icon = sessionType?.icon || Palette;
                
                return (
                  <div 
                    key={session.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`recent-session-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${sessionType?.color || 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{sessionType?.label || session.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {session.duration}min • {session.mood} • {session.intensity}
                        </p>
                        {session.output && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {session.output.length > 50 
                              ? `${session.output.substring(0, 50)}...` 
                              : session.output}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {new Date(session.completedAt!).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        Completed
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Timer className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No sessions yet</h3>
              <p className="text-muted-foreground">
                Start your first creative session to track your work
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Types Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Session Types</CardTitle>
          <CardDescription>Quick start options for different activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {sessionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  variant={selectedSessionType === type.value ? "default" : "outline"}
                  className="h-20 flex-col gap-2 hover-elevate"
                  onClick={() => setSelectedSessionType(type.value)}
                  data-testid={`session-type-${type.value}`}
                >
                  <Icon className={`w-6 h-6 ${type.color}`} />
                  <span className="text-xs">{type.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}