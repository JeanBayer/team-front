import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbItemList } from "@/types/breadcrumb";
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
          <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
