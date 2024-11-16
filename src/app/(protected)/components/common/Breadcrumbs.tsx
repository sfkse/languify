import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/(protected)/components/ui/breadcrumb";

type BreadcrumbItem = {
  label: string;
  href: string;
  isActive: boolean;
};

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem key={breadcrumb.href}>
            {!breadcrumb.isActive ? (
              <>
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

