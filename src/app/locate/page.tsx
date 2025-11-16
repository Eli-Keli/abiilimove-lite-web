import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Car, Wheelchair, User, Phone } from "lucide-react";

const availableVehicles = [
  {
    id: 1,
    driver: "John Mwangi",
    vehicleType: "Accessible Van",
    eta: "5 mins",
    features: ["Wheelchair Ramp", "Low Floor"],
  },
  {
    id: 2,
    driver: "Jane Achieng",
    vehicleType: "Modified Saloon",
    eta: "8 mins",
    features: ["Hand Controls"],
  },
  {
    id: 3,
    driver: "Peter Kimani",
    vehicleType: "Accessible Van",
    eta: "12 mins",
    features: ["Wheelchair Ramp", "Staff Assistance"],
  },
];

export default function LocatePage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'locateMap');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Header
        title="Find a Ride"
        description="Locate verified accessible vehicles near you."
      />

      {mapImage && (
        <Card>
          <CardContent className="p-0 relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             <div className="absolute bottom-4 left-4 text-primary-foreground">
                <h2 className="text-2xl font-bold">Vehicles Near You</h2>
                <p>Showing {availableVehicles.length} available rides.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Available Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver & Vehicle</TableHead>
                <TableHead>Accessibility</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <User className="size-5 text-muted-foreground" />
                        <div className="font-medium">{vehicle.driver}</div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <Car className="size-5" />
                        <div>{vehicle.vehicleType}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                          <Wheelchair className="size-3" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{vehicle.eta}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">
                        <Phone className="mr-2"/>
                        Book Ride
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
