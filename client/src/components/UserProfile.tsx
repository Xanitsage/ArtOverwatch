import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Calendar, Edit, Globe, Instagram, MapPin, Twitter, Users } from "lucide-react";
import artistPhoto from "@assets/generated_images/Artist_profile_photo_25c5d1e0.png";

export default function UserProfile() {
  //todo: remove mock functionality - this data should come from the backend
  const mockProfile = {
    name: "Nomsa Dlamini",
    username: "@nomsacreates",
    title: "Creative Director & Corporate Artist",
    bio: "Passionate about celebrating African heritage through contemporary digital art and corporate design. Specializing in cultural fusion and brand identity that reflects ubuntu values.",
    location: "Cape Town, Western Cape",
    website: "nomsacreates.co.za",
    joinDate: "January 2022",
    followers: 1284,
    following: 892,
    stats: {
      totalProjects: 47,
      totalRevenue: 4347600,
      ipAssets: 67,
      avgProjectValue: 92501
    }
  };

  const mockSocialLinks = [
    { platform: "Twitter", handle: "@alexartwork", icon: Twitter, followers: "12.4K" },
    { platform: "Instagram", handle: "@alexandra.creates", icon: Instagram, followers: "8.7K" },
    { platform: "Website", handle: "alexchen.art", icon: Globe, followers: "N/A" },
  ];

  const mockAchievements = [
    { title: "Top Creator", description: "Ranked in top 5% of creators this quarter", date: "March 2024" },
    { title: "IP Milestone", description: "Registered 50+ intellectual property assets", date: "February 2024" },
    { title: "Revenue Goal", description: "Exceeded $200K annual revenue target", date: "December 2023" },
    { title: "Community Builder", description: "Reached 1,000+ community members", date: "November 2023" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Profile</h1>
          <p className="text-muted-foreground">
            Manage your public profile and creative portfolio
          </p>
        </div>
        <Button data-testid="button-edit-profile">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={artistPhoto} alt={mockProfile.name} />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold" data-testid="text-profile-name">{mockProfile.name}</h2>
                <p className="text-muted-foreground mb-2">{mockProfile.username}</p>
                <Badge variant="secondary" className="mb-4">{mockProfile.title}</Badge>
                
                <p className="text-sm text-muted-foreground mb-4">{mockProfile.bio}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {mockProfile.location}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    {mockProfile.website}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {mockProfile.joinDate}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold">{mockProfile.followers.toLocaleString()}</div>
                    <div className="text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{mockProfile.following.toLocaleString()}</div>
                    <div className="text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Social Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSocialLinks.map((social, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover-elevate" data-testid={`card-social-${index}`}>
                    <div className="flex items-center gap-3">
                      <social.icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{social.platform}</div>
                        <div className="text-sm text-muted-foreground">{social.handle}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{social.followers}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-projects">{mockProfile.stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  Avg. value: R{mockProfile.stats.avgProjectValue.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R{mockProfile.stats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Lifetime earnings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">IP Assets</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockProfile.stats.ipAssets}</div>
                <p className="text-xs text-muted-foreground">
                  Registered works
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockProfile.followers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Total followers
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your public profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input 
                    id="display-name" 
                    defaultValue={mockProfile.name}
                    data-testid="input-display-name"
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    defaultValue={mockProfile.username}
                    data-testid="input-username"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Professional Title</Label>
                <Input 
                  id="title" 
                  defaultValue={mockProfile.title}
                  data-testid="input-title"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  defaultValue={mockProfile.bio}
                  rows={3}
                  data-testid="textarea-bio"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    defaultValue={mockProfile.location}
                    data-testid="input-location"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    defaultValue={mockProfile.website}
                    data-testid="input-website"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button data-testid="button-save-profile">Save Changes</Button>
                <Button variant="outline" data-testid="button-cancel-profile">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your creative milestones and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover-elevate" data-testid={`card-achievement-${index}`}>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                    <Badge variant="secondary">Earned</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}