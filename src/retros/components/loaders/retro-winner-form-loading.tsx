import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MEMBERS = new Array(12).fill(null);

export const RetroWinnerFormLoading = () => {
  return (
    <section className="flex gap-8 flex-wrap justify-center py-8 px-4 md:px-12 min-w-xs max-w-sm md:max-w-2xl mx-auto">
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h3>
              <span>Votación del elegido</span>
            </h3>
            <Skeleton className="w-20 h-8" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="w-full flex flex-col flex-wrap gap-8">
            <div className="md:max-h-40 flex flex-col flex-wrap gap-6">
              {MEMBERS.map((_, i) => (
                <Skeleton key={i} className="w-28 h-5" />
              ))}
            </div>
            <Skeleton className="w-40 h-10 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
