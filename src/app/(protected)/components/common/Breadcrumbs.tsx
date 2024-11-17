import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/(protected)/components/ui/breadcrumb";
import Link from "next/link";

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
                <BreadcrumbLink href={breadcrumb.href} asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
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

