export type BreadcrumbItemList =
  | {
      label: string;
      to: string;
      type?: "item";
    }
  | {
      type: "dropdown";
      dropdownItems: {
        label: string;
        to: string;
      }[];
    };
