import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, DollarSign, FolderOpen, Plus, Search, Users, Eye, Edit } from "lucide-react";
import { useState } from "react";
import sampleArt from "@assets/generated_images/Sample_artwork_thumbnail_ebf97e2a.png";

export default function ProjectManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //todo: remove mock functionality - this data should come from the backend
  const mockProjects = [
    {
      id: 1,
      title: "Mzansi Heritage Collection",
      description: "Series of 20 African-inspired digital artworks for Johannesburg gallery exhibition",
      status: "In Progress",
      priority: "High",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      budget: 382500,
      spent: 286875,
      team: ["Nomsa Dlamini", "Thabo Motaung"],
      client: "Goodman Gallery",
      category: "Artwork"
    },
    {
      id: 2,
      title: "Ubuntu Corporate Identity",
      description: "Complete corporate rebrand reflecting African values and heritage",
      status: "Review",
      priority: "Medium",
      progress: 90,
      startDate: "2024-02-01",
      endDate: "2024-03-30",
      budget: 229500,
      spent: 201960,
      team: ["Sipho Mahlangu"],
      client: "Standard Bank SA",
      category: "Branding"
    },
    {
      id: 3,
      title: "African Heritage NFT Launch",
      description: "15-piece NFT collection celebrating South African cultural diversity",
      status: "Planning",
      priority: "High",
      progress: 25,
      startDate: "2024-03-01",
      endDate: "2024-05-15",
      budget: 459000,
      spent: 76500,
      team: ["Lerato Mokwena", "Dumisani Ndlovu"],
      client: "SA Cultural Foundation",
      category: "Digital Assets"
    },
    {
      id: 4,
      title: "Afrocentric Design Tutorials",
      description: "Educational video series showcasing traditional African design patterns",
      status: "Completed",
      priority: "Low",
      progress: 100,
      startDate: "2023-12-01",
      endDate: "2024-02-28",
      budget: 122400,
      spent: 120105,
      team: ["Zanele Mthembu"],
      client: "University of Cape Town",
      category: "Content"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "Planning": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status.toLowerCase().replace(" ", "-") === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Project Manager</h1>
          <p className="text-muted-foreground">
            Track and manage your creative projects from concept to completion
          </p>
        </div>
        <Button data-testid="button-create-project">
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-active-projects">12</div>
            <p className="text-xs text-muted-foreground">
              2 starting this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">
              On-time delivery
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R2.85M</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Active collaborators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Project Portfolio</CardTitle>
          <CardDescription>
            Manage all your creative projects and track their progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-projects"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48" data-testid="select-filter-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover-elevate" data-testid={`card-project-${project.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="mb-4">
                    <img 
                      src={sampleArt} 
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="font-medium text-muted-foreground">Client</div>
                      <div>{project.client}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Category</div>
                      <div>{project.category}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Budget</div>
                      <div className="font-semibold">R{project.budget.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Spent</div>
                      <div className="font-semibold text-blue-600">R{project.spent.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Start:</span>
                      <span>{project.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">End:</span>
                      <span>{project.endDate}</span>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Team</div>
                    <div className="flex gap-2">
                      {project.team.map((member, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" data-testid={`button-view-${project.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" data-testid={`button-edit-${project.id}`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}