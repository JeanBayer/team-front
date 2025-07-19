import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RetroWinnerProps = {
  name: string;
};

export const RetroWinner = ({ name }: RetroWinnerProps) => {
  return (
    <section className="flex gap-8 flex-wrap justify-center mb-8 px-4 md:px-12 min-w-xs max-w-sm md:max-w-2xl mx-auto">
      <Card className="bg-blue-200 w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h3>
              <span>🏆 Elegido del sprint</span>
            </h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-center">{name}</h3>
        </CardContent>
      </Card>
    </section>
  );
};
