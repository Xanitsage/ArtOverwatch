import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Target, TrendingUp, Calendar, Edit, Archive, Trophy, Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Goal, type Streak, type Entity, type InsertGoal, type InsertStreak } from "@shared/schema";

export default function StudioGoals() {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newGoal, setNewGoal] = useState({
    type: "",
    category: "creative",
    target: 1,
    period: "daily",
    entityId: "",
  });

  const { data: entities } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  const { data: goals, isLoading: goalsLoading } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  const { data: streaks, isLoading: streaksLoading } = useQuery<Streak[]>({
    queryKey: ["/api/streaks"],
  });

  const createGoalMutation = useMutation({
    mutationFn: (goalData: InsertGoal) => apiRequest("POST", "/api/goals", goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
      setShowCreateGoal(false);
      setNewGoal({ type: "", category: "creative", target: 1, period: "daily", entityId: "" });
    },
  });

  const updateGoalMutation = useMutation({
    mutationFn: (data: { id: string; updates: any }) => 
      apiRequest("PATCH", `/api/goals/${data.id}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/goals"] });
    },
  });

  if (goalsLoading || streaksLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredGoals = selectedCategory === "all" 
    ? goals || [] 
    : goals?.filter(g => g.category === selectedCategory) || [];

  const activeGoals = filteredGoals.filter(g => g.isActive);
  const activeStreaks = streaks?.filter(s => s.isActive) || [];

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "text-chart-1";
    if (progress >= 75) return "text-chart-2";
    if (progress >= 50) return "text-chart-3";
    return "text-muted-foreground";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "creative": return "text-chart-1 bg-chart-1/10 border-chart-1/20";
      case "business": return "text-chart-2 bg-chart-2/10 border-chart-2/20";
      case "wellness": return "text-chart-3 bg-chart-3/10 border-chart-3/20";
      default: return "text-muted-foreground bg-muted/10 border-muted/20";
    }
  };

  const createGoal = () => {
    if (!newGoal.type || !newGoal.entityId) return;
    
    createGoalMutation.mutate({
      ...newGoal,
      current: 0,
      isActive: true,
    });
  };

  const incrementGoal = (goalId: string, currentValue: number) => {
    updateGoalMutation.mutate({
      id: goalId,
      updates: { current: currentValue + 1 }
    });
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-goals">Goals & Streaks</h1>
          <p className="text-muted-foreground">Set targets and track your creative progress</p>
        </div>
        <Dialog open={showCreateGoal} onOpenChange={setShowCreateGoal}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-goal">
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new target to track your creative progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Goal Description</label>
                <Input
                  placeholder="e.g., Daily painting sessions"
                  value={newGoal.type}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value }))}
                  data-testid="input-goal-type"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={newGoal.category} 
                    onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger data-testid="select-goal-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Entity</label>
                  <Select 
                    value={newGoal.entityId} 
                    onValueChange={(value) => setNewGoal(prev => ({ ...prev, entityId: value }))}
                  >
                    <SelectTrigger data-testid="select-goal-entity">
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
                  <label className="text-sm font-medium">Target</label>
                  <Input
                    type="number"
                    min="1"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 1 }))}
                    data-testid="input-goal-target"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Period</label>
                  <Select 
                    value={newGoal.period} 
                    onValueChange={(value) => setNewGoal(prev => ({ ...prev, period: value }))}
                  >
                    <SelectTrigger data-testid="select-goal-period">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={createGoal} disabled={!newGoal.type || !newGoal.entityId} data-testid="button-save-goal">
                  Create Goal
                </Button>
                <Button variant="outline" onClick={() => setShowCreateGoal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "creative", "business", "wellness"].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            data-testid={`filter-${category}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                <p className="text-2xl font-bold">{activeGoals.length}</p>
              </div>
              <Target className="w-8 h-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Streaks</p>
                <p className="text-2xl font-bold">{activeStreaks.length}</p>
              </div>
              <Flame className="w-8 h-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {activeGoals.filter(g => calculateProgress(g) >= 100).length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">
                  {activeGoals.length > 0 
                    ? Math.round(activeGoals.reduce((sum, g) => sum + calculateProgress(g), 0) / activeGoals.length)
                    : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Active Goals</CardTitle>
          <CardDescription>Track your current targets and progress</CardDescription>
        </CardHeader>
        <CardContent>
          {activeGoals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {activeGoals.map((goal, index) => {
                const progress = calculateProgress(goal);
                
                return (
                  <div 
                    key={goal.id} 
                    className="p-4 border rounded-lg space-y-4 hover-elevate"
                    data-testid={`goal-card-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{goal.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {goal.period} target
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getCategoryColor(goal.category)}>
                          {goal.category}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress</span>
                        <span className={`text-sm font-medium ${getProgressColor(progress)}`}>
                          {goal.current} / {goal.target}
                        </span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {progress.toFixed(0)}% complete
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => incrementGoal(goal.id, goal.current)}
                          data-testid={`button-increment-${index}`}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add 1
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first goal to start tracking progress
              </p>
              <Button onClick={() => setShowCreateGoal(true)} data-testid="button-create-first-goal">
                Create Goal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Streaks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-chart-2" />
            Current Streaks
          </CardTitle>
          <CardDescription>Keep your momentum going</CardDescription>
        </CardHeader>
        <CardContent>
          {activeStreaks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {activeStreaks.map((streak, index) => (
                <div 
                  key={streak.id} 
                  className="p-4 border rounded-lg text-center space-y-2 hover-elevate"
                  data-testid={`streak-card-${index}`}
                >
                  <div className="flex justify-center">
                    <Flame className="w-8 h-8 text-chart-2" />
                  </div>
                  <h4 className="font-medium">{streak.type}</h4>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-chart-2">
                      {streak.currentStreak}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      day{streak.currentStreak !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Best: {streak.longestStreak} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Flame className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No active streaks</h3>
              <p className="text-muted-foreground">
                Complete goals consistently to build streaks
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}