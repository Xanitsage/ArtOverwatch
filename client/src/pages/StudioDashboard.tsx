import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Play, Pause, MoreHorizontal, Target, TrendingUp, Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CircularProgress from "@/components/CircularProgress";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Goal, type Streak, type CreativeSession, type Entity } from "@shared/schema";

export default function StudioDashboard() {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const { data: entities } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  const { data: goals, isLoading: goalsLoading } = useQuery<Goal[]>({
    queryKey: ["/api/goals", selectedEntity],
  });

  const { data: streaks } = useQuery<Streak[]>({
    queryKey: ["/api/streaks", selectedEntity],
  });

  const { data: recentSessions } = useQuery<CreativeSession[]>({
    queryKey: ["/api/creative-sessions", selectedEntity],
  });

  const startSessionMutation = useMutation({
    mutationFn: (sessionData: any) => apiRequest("POST", "/api/creative-sessions", sessionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/creative-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/streaks"] });
    },
  });

  if (goalsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const creativeGoals = goals?.filter(g => g.category === "creative" && g.isActive) || [];
  const businessGoals = goals?.filter(g => g.category === "business" && g.isActive) || [];
  const wellnessGoals = goals?.filter(g => g.category === "wellness" && g.isActive) || [];

  const todaysStreaks = streaks?.filter(s => s.isActive) || [];
  const activeSession = recentSessions?.find(s => !s.completedAt);

  const getEntityColor = (entityId: string | null) => {
    if (!entityId || !entities) return "#6366f1";
    return entities.find(e => e.id === entityId)?.color || "#6366f1";
  };

  const calculateGoalProgress = (goal: Goal) => {
    const progress = (goal.current / goal.target) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-studio">Studio</h1>
          <p className="text-muted-foreground">Track your creative journey and wellness</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" data-testid="button-more-options">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Entity Selector */}
      {entities && entities.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Entity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={selectedEntity === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEntity(null)}
                data-testid="button-all-entities"
              >
                All Entities
              </Button>
              {entities.map((entity) => (
                <Button
                  key={entity.id}
                  variant={selectedEntity === entity.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEntity(entity.id)}
                  style={{ 
                    backgroundColor: selectedEntity === entity.id ? entity.color : undefined,
                    borderColor: entity.color 
                  }}
                  data-testid={`button-entity-${entity.name.toLowerCase()}`}
                >
                  {entity.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Rings - Core Studio Feature */}
      <Card className="bg-gradient-to-br from-primary/5 via-chart-1/5 to-chart-2/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Progress</span>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Your daily creative, business, and wellness goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Creative Ring */}
            <div className="text-center space-y-4">
              <div className="relative">
                <CircularProgress
                  percentage={creativeGoals.length > 0 ? calculateGoalProgress(creativeGoals[0]) : 0}
                  size={120}
                  strokeWidth={8}
                  color="#ef4444"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-1">
                      {creativeGoals.length > 0 ? creativeGoals[0].current : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      / {creativeGoals.length > 0 ? creativeGoals[0].target : 1}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-chart-1">Creative</h3>
                <p className="text-sm text-muted-foreground">
                  {creativeGoals.length > 0 ? creativeGoals[0].type : "Art sessions"}
                </p>
              </div>
            </div>

            {/* Business Ring */}
            <div className="text-center space-y-4">
              <div className="relative">
                <CircularProgress
                  percentage={businessGoals.length > 0 ? calculateGoalProgress(businessGoals[0]) : 0}
                  size={120}
                  strokeWidth={8}
                  color="#10b981"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-2">
                      {businessGoals.length > 0 ? businessGoals[0].current : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      / {businessGoals.length > 0 ? businessGoals[0].target : 1}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-chart-2">Business</h3>
                <p className="text-sm text-muted-foreground">
                  {businessGoals.length > 0 ? businessGoals[0].type : "Client tasks"}
                </p>
              </div>
            </div>

            {/* Wellness Ring */}
            <div className="text-center space-y-4">
              <div className="relative">
                <CircularProgress
                  percentage={wellnessGoals.length > 0 ? calculateGoalProgress(wellnessGoals[0]) : 0}
                  size={120}
                  strokeWidth={8}
                  color="#3b82f6"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-chart-3">
                      {wellnessGoals.length > 0 ? wellnessGoals[0].current : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      / {wellnessGoals.length > 0 ? wellnessGoals[0].target : 1}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-chart-3">Wellness</h3>
                <p className="text-sm text-muted-foreground">
                  {wellnessGoals.length > 0 ? wellnessGoals[0].type : "Break time"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start Session */}
          <div className="mt-6 flex justify-center">
            {activeSession ? (
              <div className="text-center space-y-2">
                <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                  Session in progress
                </Badge>
                <Button variant="outline" data-testid="button-view-session">
                  View Active Session
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90"
                data-testid="button-start-session"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Creative Session
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Streaks */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Streaks</span>
              <TrendingUp className="w-5 h-5 text-chart-1" />
            </CardTitle>
            <CardDescription>Keep the momentum going</CardDescription>
          </CardHeader>
          <CardContent>
            {todaysStreaks.length > 0 ? (
              <div className="space-y-3">
                {todaysStreaks.slice(0, 3).map((streak, index) => (
                  <div 
                    key={streak.id} 
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    data-testid={`streak-${index}`}
                  >
                    <div>
                      <h4 className="font-medium">{streak.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {streak.currentStreak} day{streak.currentStreak !== 1 ? 's' : ''} streak
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-chart-1">
                        {streak.currentStreak}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Best: {streak.longestStreak}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No active streaks yet</p>
                <p className="text-sm text-muted-foreground">Start working on your goals to build streaks</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Sessions</span>
              <User className="w-5 h-5 text-chart-2" />
            </CardTitle>
            <CardDescription>Your latest creative work</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSessions && recentSessions.length > 0 ? (
              <div className="space-y-3">
                {recentSessions.slice(0, 3).map((session, index) => (
                  <div 
                    key={session.id} 
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    data-testid={`session-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getEntityColor(session.entityId) }}
                      ></div>
                      <div>
                        <h4 className="font-medium">{session.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {session.duration}min • {session.intensity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {session.completedAt ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Play className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No sessions yet</p>
                <p className="text-sm text-muted-foreground">Start your first creative session</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Goals Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Goals</span>
            <Target className="w-5 h-5 text-chart-3" />
          </CardTitle>
          <CardDescription>Track progress across all your goals</CardDescription>
        </CardHeader>
        <CardContent>
          {goals && goals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {goals.filter(g => g.isActive).map((goal, index) => (
                <div 
                  key={goal.id} 
                  className="p-4 border rounded-lg hover-elevate cursor-pointer"
                  data-testid={`goal-${index}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{goal.type}</h4>
                    <Badge 
                      variant="outline"
                      className={
                        goal.category === "creative" ? "text-chart-1 border-chart-1/20" :
                        goal.category === "business" ? "text-chart-2 border-chart-2/20" :
                        "text-chart-3 border-chart-3/20"
                      }
                    >
                      {goal.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{goal.current} / {goal.target}</span>
                      <span>{calculateGoalProgress(goal).toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={calculateGoalProgress(goal)} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {goal.period} • {goal.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Set your first goal to start tracking progress
              </p>
              <Button data-testid="button-create-goal">
                Create Goal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}