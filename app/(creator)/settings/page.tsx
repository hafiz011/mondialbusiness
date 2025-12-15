"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function CreatorSettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account, profile, and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <section className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-lg font-semibold">Profile Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Your full name" />
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@email.com" />
          </div>

          <div>
            <Label>Username</Label>
            <Input placeholder="creator_username" />
          </div>

          <div>
            <Label>Country</Label>
            <Input placeholder="Bangladesh" />
          </div>
        </div>

        <Button className="mt-4">Save Changes</Button>
      </section>

      {/* Password Settings */}
      <section className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Current Password</Label>
            <Input type="password" />
          </div>

          <div>
            <Label>New Password</Label>
            <Input type="password" />
          </div>
        </div>

        <Button variant="outline">Update Password</Button>
      </section>

      {/* Preferences */}
      <section className="bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-lg font-semibold">Preferences</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">
              Receive updates about investors & milestones
            </p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Public Profile</p>
            <p className="text-sm text-gray-500">
              Allow investors to view your profile
            </p>
          </div>
          <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="text-sm text-red-500">
          Deleting your account is permanent and cannot be undone.
        </p>

        <Button variant="destructive">
          Delete Account
        </Button>
      </section>
    </div>
  )
}
