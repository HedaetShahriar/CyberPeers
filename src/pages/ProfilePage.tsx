import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  User,
  Save,
  Mail,
  Phone,
  MapPin,
  Link2,
  Camera,
  CheckCircle2,
  Award,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const { user: AuthUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", AuthUser?.email],
    enabled: !loading && !!AuthUser?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user?email=${encodeURIComponent(AuthUser?.email || "")}`
      );
      return data;
    },
  });

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [isSaving, setIsSaving] = useState(false);

  const initials = (user?.name ?? "User")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedData = {
        name,
        phone,
        bio,
        location,
        website,
        updatedAt: new Date().toISOString(),
      };
      setIsSaving(true);
      await axiosSecure.patch(
        `/user/profile?email=${encodeURIComponent(AuthUser?.email || "")}`,
        updatedData
      );
      refetch();
      setIsSaving(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Card className="border">
      <CardHeader className="border-b bg-muted/20 pb-3 pt-3">
        <CardTitle className="text-base flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Edit Your Profile
        </CardTitle>
        <CardDescription className="text-xs">
          Update your personal information and bio
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
          {/* Left Side - Profile Info */}
          <div className="flex flex-col items-center gap-3 w-full lg:w-auto">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <Camera className="h-5 w-5 text-white" />
              </button>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="text-center w-full">
              <h2 className="font-bold text-base">
                {isLoading ? (
                  <Skeleton className="h-5 w-36 mx-auto" />
                ) : (
                  user?.name
                )}
              </h2>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
                <Mail className="h-3 w-3" />
                {isLoading ? <Skeleton className="h-3 w-44" /> : user?.email}
              </p>
              <Badge className="bg-primary text-primary-foreground border-0 text-xs px-2 py-0.5 mt-2">
                <Award className="h-2.5 w-2.5 mr-1" />
                {isLoading ? <Skeleton className="h-3 w-12" /> : user?.role}
              </Badge>
            </div>

            <Button
              variant="outline"
              size="sm"
              type="button"
              className="h-8 text-xs w-full"
            >
              <Camera className="h-3 w-3 mr-1.5" />
              Change Photo
            </Button>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:max-w-3xl">
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium flex items-center gap-1.5"
                  >
                    <Mail className="h-3 w-3" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    placeholder="Enter your email"
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-medium flex items-center gap-1.5"
                  >
                    <Phone className="h-3 w-3" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="location"
                    className="text-xs font-medium flex items-center gap-1.5"
                  >
                    <MapPin className="h-3 w-3" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="website"
                  className="text-xs font-medium flex items-center gap-1.5"
                >
                  <Link2 className="h-3 w-3" />
                  Website / Portfolio
                </Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio" className="text-xs font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="resize-none h-20 text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Brief description for your profile (max 500 characters)
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  className="h-8 text-xs"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  size="sm"
                  className="gap-1.5 h-8 text-xs"
                >
                  {isSaving ? (
                    <>
                      <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-3 w-3" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ProfilePage;
