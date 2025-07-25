import { Fallback } from "@/components/loaders/fallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useThankYouRetrospective } from "@/thank-you/hooks/use-thank-you-retrospective";
import { useParams } from "react-router";
import { ThankYouListLoading } from "./loaders/thank-you-list-loading";

export const ThankYouList = () => {
  const { teamId, retroId } = useParams();
  const { thankYou } = useThankYouRetrospective(teamId, retroId);
  return (
    <>
      <h2 className="text-center text-2xl font-bold mt-10 mb-4">
        Agradecimientos
      </h2>

      <section className="flex gap-10 flex-wrap justify-center md:justify-between py-8 px-4 md:px-12 min-h-[400px] min-w-xs max-w-sm md:max-w-2xl mx-auto">
        <Fallback
          isLoading={thankYou.isLoading}
          loadingComponent={<ThankYouListLoading />}
        >
          {thankYou.data?.map(({ receiver, message, giver, id }) => (
            <Card className="w-66 h-66" key={id}>
              <CardHeader>
                <CardTitle className="text-center">{receiver.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4 justify-between">
                <ScrollArea className="h-34">
                  <h4 className="text-sm">{message}</h4>
                </ScrollArea>
                <p className="text-xs text-gray-500 text-right">
                  ~ {giver.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </Fallback>
      </section>
    </>
  );
};
