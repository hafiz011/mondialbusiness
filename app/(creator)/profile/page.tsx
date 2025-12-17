
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockCreator, mockIdeas } from "@/lib/mock-data"
import { Edit, CheckCircle2, XCircle, Clock, Calendar } from "lucide-react"

export default function ProfilePage() {
  const approvedIdeas = mockIdeas.filter((i) => i.status === "Approved").length
  const totalRaised = mockIdeas.reduce((acc, idea) => acc + idea.totalRaised, 0)
  const accountAge = Math.floor(
    (new Date().getTime() - new Date(mockCreator.accountCreated).getTime()) / (1000 * 60 * 60 * 24),
  )

  const kycStatusIcon = {
    Approved: CheckCircle2,
    Pending: Clock,
    Rejected: XCircle,
  }[mockCreator.kycStatus]

  const kycStatusColor = {
    Approved: "text-accent",
    Pending: "text-muted-foreground",
    Rejected: "text-destructive",
  }[mockCreator.kycStatus]

  const KycIcon = kycStatusIcon

  return (
    <div className="flex-1 overflow-y-auto">

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockCreator.profileImage || "/placeholder.svg"} alt={mockCreator.name} />
                <AvatarFallback className="text-2xl">
                  {mockCreator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{mockCreator.name}</h2>
                    <p className="text-muted-foreground mt-1">{mockCreator.email}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={mockCreator.kycStatus === "Approved" ? "default" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    <KycIcon className={`h-3 w-3 ${kycStatusColor}`} />
                    KYC {mockCreator.kycStatus}
                  </Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed">{mockCreator.bio}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Ideas</p>
                <p className="text-2xl font-bold text-foreground">{approvedIdeas}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Raised</p>
                <p className="text-2xl font-bold text-emerald-500">${(totalRaised / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(mockCreator.accountCreated).toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">{accountAge} days ago</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Full Name</p>
              <p className="text-foreground font-medium">{mockCreator.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email Address</p>
              <p className="text-foreground font-medium">{mockCreator.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="text-foreground font-medium">{mockCreator.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="text-foreground font-medium">
                {mockCreator.city}, {mockCreator.country}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Account Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Last Login</p>
                  <p className="text-sm text-muted-foreground">{new Date(mockCreator.lastLogin).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Account Created</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(mockCreator.accountCreated).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
