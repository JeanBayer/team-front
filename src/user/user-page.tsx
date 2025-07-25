import { Header } from "@/components/header/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";

export const UserPage = () => {
  const { user } = useUser();

  return (
    <div>
      <Header
        title="Usuario"
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            to: "/user",
            label: "Mi Usuario",
          },
        ]}
        breadcrumbPage={user.data?.name || ""}
      />

      <div className="p-8 max-w-3xl mx-auto">
        <section className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <Card className="w-sm md:w-2xs h-52 md:h-44 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="text-xl flex flex-col gap-2">
                <span className="text-xs text-gray-500">Nombre: </span>
                <strong>{user.data?.name}</strong>
              </p>
              <p className="text-xl flex flex-col gap-2">
                <span className="text-xs text-gray-500">Email: </span>
                <strong>{user.data?.email}</strong>
              </p>
            </CardContent>
          </Card>
          <Separator
            orientation="horizontal"
            className="md:w-[1px]! md:h-52!"
          />
          <Card className="w-52 h-52 md:w-44 md:h-44 hover:shadow-lg hover:border-blue-300 transition-all duration-300 gap-4 relative p-0">
            <CardContent className="absolute top-[60px] md:top-[50px] left-[49%] transform -translate-x-1/2 z-10">
              <Badge
                variant="secondary"
                className="bg-blue-400 text-white rounded-3xl"
              >
                {user.data?.sprintWins}
              </Badge>
            </CardContent>
            <CardFooter className="absolute bottom-4 md:bottom-2 w-full z-10">
              <p className="w-full text-center text-xs text-gray-500">
                <strong>Sprint Winner</strong>
              </p>
            </CardFooter>
            <img
              src="/assets/images/trofeo.png"
              alt="sand-clock"
              className="absolute w-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
            />
          </Card>
        </section>
      </div>
    </div>
  );
};
