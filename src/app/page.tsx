import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LocateFixed, Waypoints, Star, Smartphone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    title: "Plan an Accessible Route",
    description: "Use our AI-powered tool to find the best route based on your mobility needs.",
    href: "/recommendations",
    icon: Waypoints,
    image: "dashboardRoutePlanner",
  },
  {
    title: "Find a Ride Now",
    description: "Locate and book verified accessible vehicles near you in real-time.",
    href: "/locate",
    icon: LocateFixed,
    image: "dashboardFindRide",
  },
  {
    title: "Rate a Public Stop",
    description: "Help the community by rating the accessibility of matatu stops and staff.",
    href: "/rate",
    icon: Star,
    image: "dashboardRateStop",
  },
  {
    title: "Use USSD Service",
    description: "Access core features without a smartphone or internet connection.",
    href: "/ussd",
    icon: Smartphone,
    image: "dashboardUssd",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Header title="Dashboard" description="Welcome to AbiliMove. Your journey to accessible transport starts here." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => {
          const placeholder = PlaceHolderImages.find(p => p.id === feature.image);
          return (
            <Card key={feature.title} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              {placeholder && (
                <div className="relative h-48 w-full">
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    data-ai-hint={placeholder.imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-3">
                  <feature.icon className="size-6 text-primary" />
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex justify-end">
                <Link href={feature.href} passHref>
                  <Button>
                    Go <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
