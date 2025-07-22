import { Card, CardContent } from "@/components/ui/card";

type CounterInfoProps = {
  label: string;
  value: number;
};

export const CounterInfo = ({ label, value }: CounterInfoProps) => {
  return (
    <Card className="flex-1 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
      <CardContent>
        <div className="flex flex-col gap-2 justify-between text-center">
          <p className="text-sm">
            <strong>{value}</strong>
          </p>
          <p>
            <strong className="text-gray-500 text-xs">{label}</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
