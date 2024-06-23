"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "./_components/profile-form";
import { api } from "@/trpc/react";

export default function SettingsPage() {
  const query = api.user.getUser.useQuery();
  return (
    <div className="grid gap-6">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Make changes and save to update your user information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {query.isPending ? (
            <p>Loading...</p>
          ) : (
            <ProfileForm data={query.data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
