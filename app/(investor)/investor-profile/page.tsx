// app/(investor)/profile/page.tsx (Profile Page)
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save } from "lucide-react"
import { useState } from "react"

import { mockInvestor } from "@/lib/mock-data-in"

export default function InvestorProfile() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(mockInvestor)

  const handleSave = () => {
    // Save logic here
    setEditing(false)
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          {editing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.profileImage} alt={profile.fullName} />
              <AvatarFallback className="text-2xl">{profile.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Picture</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={profile.fullName} disabled={!editing} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile.email} disabled />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={profile.phone} disabled={!editing} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={profile.country} disabled={!editing} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea value={profile.bio} disabled={!editing} rows={4} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">KYC Status</p>
              <Badge variant={profile.kycStatus === "Approved" ? "default" : "secondary"}>
                {profile.kycStatus}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Wallet Balance</p>
              <p className="text-xl font-bold">${profile.walletBalance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
              <p className="text-xl font-bold">${profile.totalInvested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Equity Owned</p>
              <p className="text-xl font-bold">{profile.totalEquity}%</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Login</p>
              <p className="font-medium">{profile.lastLogin}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Account Created</p>
              <p className="font-medium">{profile.accountCreated}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}