import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { BreadcrumbItemList } from "@/types/breadcrumb";
import React from "react";
import { Link } from "react-router";

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
        {breadcrumbList?.map(({ to, label }) => (
          <React.Fragment>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={to}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
