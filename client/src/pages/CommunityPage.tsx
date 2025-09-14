import { Users, MessageSquare, Share2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CommunityPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Community Hub</h1>
      </div>
      
      <p className="text-muted-foreground">
        Connect with members, share resources, and collaborate on projects.
      </p>
      
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Members</CardTitle>
              <CardDescription>Members of your Artist Corporation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["René", "Yuki", "James", "Treasury"].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="font-medium">{member[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member}</p>
                        <p className="text-sm text-muted-foreground">Active Member</p>
                      </div>
                    </div>
                    <button className="text-sm text-primary hover:underline">View Profile</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discussions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Join conversations with other members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Upcoming Exhibition Planning", author: "René", replies: 12 },
                  { title: "New Grant Opportunities", author: "Treasury", replies: 8 },
                  { title: "Collaborative Project Ideas", author: "Yuki", replies: 15 },
                  { title: "Community Guidelines Update", author: "James", replies: 5 }
                ].map((discussion, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{discussion.title}</h3>
                      <span className="text-sm text-muted-foreground">Started by {discussion.author}</span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>{discussion.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shared Resources</CardTitle>
              <CardDescription>Access shared documents and materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Brand Guidelines", type: "PDF", shared: "2 days ago" },
                  { name: "Project Templates", type: "Folder", shared: "1 week ago" },
                  { name: "Legal Documents", type: "Folder", shared: "2 weeks ago" },
                  { name: "Marketing Assets", type: "Folder", shared: "1 month ago" }
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">{resource.type}</span>
                      </div>
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-muted-foreground">Shared {resource.shared}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-muted">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="text-sm text-primary hover:underline">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Community events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Monthly Member Meeting", date: "June 15, 2023", time: "3:00 PM" },
                  { name: "Art Exhibition Opening", date: "June 22, 2023", time: "6:00 PM" },
                  { name: "Grant Writing Workshop", date: "July 5, 2023", time: "2:00 PM" },
                  { name: "Community Showcase", date: "July 18, 2023", time: "5:00 PM" }
                ].map((event, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{event.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Time: {event.time}</p>
                    <div className="mt-2 flex justify-end">
                      <button className="text-sm text-primary hover:underline">RSVP</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}