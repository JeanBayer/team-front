import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbItemList } from "@/types/breadcrumb";
import { Fallback } from "../loaders/fallback";
import { Skeleton } from "../ui/skeleton";
import { CustomBreadCrumbItem } from "./custom-breadcrumb-item";

type BreadcrumbHeaderProps = {
  breadcrumbList?: BreadcrumbItemList[];
  breadcrumbPage: string;
};

export function BreadcrumbHeader({
  breadcrumbList = [],
  breadcrumbPage,
}: BreadcrumbHeaderProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbList?.map((item, index) => (
          <CustomBreadCrumbItem breadcrumbList={item} key={index} />
        ))}
        <BreadcrumbItem>
          <Fallback
            isLoading={!breadcrumbPage}
            loadingComponent={<Skeleton className="w-30 h-4 rounded-none" />}
          >
            <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
          </Fallback>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
