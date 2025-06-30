"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const collapsibleTriggers = [
  {
    title: "Part I Identification of Applicant",
    urlBase: "/formation/part-1",
    sidebarGroupContent: [
      {
        title: "Organization Identification",
        url: "/formation/part-1/step-1",
        step: "1",
      },
      {
        title: "Employer Identification Number",
        url: "/formation/part-1/step-2",
        step: "2",
      },
      {
        title: "Month Tax Year Ends",
        url: "/formation/part-1/step-3",
        step: "3",
      },
      {
        title: "Person to Contact",
        url: "/formation/part-1/step-4",
        step: "4",
      },
      {
        title: "Contact Telephone Number",
        url: "/formation/part-1/step-5",
        step: "5",
      },
      {
        title: "Fax Number (optional)",
        url: "/formation/part-1/step-6",
        step: "6",
      },
      {
        title: "User Fee Submitted",
        url: "/formation/part-1/step-7",
        step: "7",
      },
      {
        title: "Organization's Website (if available)",
        url: "/formation/part-1/step-8",
        step: "8",
      },
      {
        title: "Officer, Director, and/or Trustee Identification",
        url: "/formation/part-1/step-9",
        step: "9",
      },
    ],
  },
  {
    title: "Part II Organizational Structure",
    urlBase: "/formation/part-2",
    sidebarGroupContent: [
      {
        title: "Organization Type",
        url: "/formation/part-2/step-1",
        step: "1",
      },
      {
        title: "Date you Formed",
        url: "/formation/part-2/step-2",
        step: "2",
      },
      {
        title: "State of Formation",
        url: "/formation/part-2/step-3",
        step: "3",
      },
      {
        title: "Adopted Bylaws",
        url: "/formation/part-2/step-4",
        step: "4",
      },
      {
        title: "Successor to Another Organization",
        url: "/formation/part-2/step-5",
        step: "5",
      },
    ],
  },
  {
    title: "Part III Required Provisions in Your Organizing Document",
    urlBase: "/formation/part-3",
    sidebarGroupContent: [
      {
        title: "Organizing Document Exempt Purposes Provision",
        url: "/formation/part-3/step-1",
        step: "1",
      },
      {
        title: "Organizing Document Dissolution Exempt Purposes Provision",
        url: "/formation/part-3/step-2",
        step: "2",
      },
    ],
  },
  {
    title: "Part IV Your Activities",
    urlBase: "/formation/part-4",
    sidebarGroupContent: [
      {
        title: "Past, Present, and Planned Activites",
        url: "/formation/part-4/step-1",
        step: "1",
      },
      {
        title: "NTEE Code",
        url: "/formation/part-4/step-2",
        step: "2",
      },
      {
        title: "Programs Limiting Provision of Goods, Services, or Funds",
        url: "/formation/part-4/step-3",
        step: "3",
      },
      {
        title: "Related Individuals",
        url: "/formation/part-4/step-4",
        step: "4",
      },
      {
        title: "Political Support",
        url: "/formation/part-4/step-5",
        step: "5",
      },
      {
        title: "Legislation Influence",
        url: "/formation/part-4/step-6",
        step: "6",
      },
      {
        title: "Intellectual Property",
        url: "/formation/part-4/step-7",
        step: "7",
      },
      {
        title: "General Public Educational Information",
        url: "/formation/part-4/step-8",
        step: "8",
      },
      {
        title: "Distributions to Other Organizations",
        url: "/formation/part-4/step-9",
        step: "9",
      },
      {
        title: "Foreign Country Operation",
        url: "/formation/part-4/step-10",
        step: "10",
      },
      {
        title: "Sponsoring Organization",
        url: "/formation/part-4/step-11",
        step: "11",
      },
      {
        title: "School Operation",
        url: "/formation/part-4/step-12",
        step: "12",
      },
      {
        title: "Hospital or Medical Care",
        url: "/formation/part-4/step-13",
        step: "13",
      },
      {
        title: "Low-Income Housing",
        url: "/formation/part-4/step-14",
        step: "14",
      },
      {
        title: "Educational Financial Support",
        url: "/formation/part-4/step-15",
        step: "15",
      },
      {
        title: "Fundraising Activities",
        url: "/formation/part-4/step-16",
        step: "16",
      },
      {
        title: "Fundraising Activities for Other Organizations",
        url: "/formation/part-4/step-17",
        step: "17",
      },
    ],
  },
  {
    title: "Part V Compensation and Other Financial Arrangements",
    urlBase: "/formation/part-5",
    sidebarGroupContent: [
      {
        title: "Compensation",
        url: "/formation/part-5/step-1",
        step: "1",
      },
      {
        title: "Conflict of Interest Policy",
        url: "/formation/part-5/step-2",
        step: "2",
      },
      {
        title: "Non-Fixed Payment Compensation",
        url: "/formation/part-5/step-3",
        step: "3",
      },
      {
        title: "Purchasing or Selling Goods, Services, or Assets",
        url: "/formation/part-5/step-4",
        step: "4",
      },
      {
        title: "Leases, Contracts, Loans, or Other Agreements",
        url: "/formation/part-5/step-5",
        step: "5",
      },
      {
        title: "Contract with Another Organization",
        url: "/formation/part-5/step-6",
        step: "6",
      },
      {
        title: "Activities or Facilities Management",
        url: "/formation/part-5/step-7",
        step: "7",
      },
      {
        title: "Profit and Loss Sharing with Partners",
        url: "/formation/part-5/step-8",
        step: "8",
      },
    ],
  },
  {
    title: "Part VI Financial Data",
    urlBase: "/formation/part-6",
    sidebarGroupContent: [
      {
        title: "Financial Data",
        url: "/formation/part-6/step-1",
        step: "1",
      },
    ],
  },
  {
    title: "Part VII Foundation Classification",
    urlBase: "/formation/part-7",
    sidebarGroupContent: [
      {
        title: "Selection and Explantion",
        url: "/formation/part-7/step-1",
        step: "1",
      },
      {
        title: "Public Support Status",
        url: "/formation/part-7/step-2",
        step: "2",
      },
    ],
  },
  {
    title: "Part VIII Effective Date",
    urlBase: "/formation/part-8",
    sidebarGroupContent: [
      {
        title: "Effective Date",
        url: "/formation/part-8/step-1",
        step: "1",
      },
    ],
  },
  {
    title: "Part IX Annual Filing Requirements",
    urlBase: "/formation/part-9",
    sidebarGroupContent: [
      {
        title: "Annual Filing Requirements",
        url: "/formation/part-9/step-1",
        step: "1",
      },
    ],
  },
  {
    title: "Part X Signature",
    urlBase: "/formation/part-10",
    sidebarGroupContent: [
      {
        title: "Signature",
        url: "/formation/part-10/step-1",
        step: "1",
      },
    ],
  },
  {
    title: "Upload Checklist",
    urlBase: "/formation/upload-checklist",
    sidebarGroupContent: [
      {
        title: "Upload Checklist",
        url: "/formation/upload-checklist",
        step: "1",
      },
    ],
  },
  {
    title: "Schedule A. Churches",
    urlBase: "/formation/schedule-a",
    sidebarGroupContent: [
      {
        title: "Summary of Beliefs",
        url: "/formation/schedule-a/step-1",
        step: "1",
      },
      {
        title: "Literature",
        url: "/formation/schedule-a/step-2",
        step: "2",
      },
      {
        title: "Code of Doctrine and Discipline",
        url: "/formation/schedule-a/step-3",
        step: "3",
      },
      {
        title: "Religious Hierarchy or Ecclesiastical Government",
        url: "/formation/schedule-a/step-4",
        step: "4",
      },
      {
        title: "Group of Churches Participation",
        url: "/formation/schedule-a/step-5",
        step: "5",
      },
      {
        title: "Form of Worship",
        url: "/formation/schedule-a/step-6",
        step: "6",
      },
      {
        title: "Nature of Services",
        url: "/formation/schedule-a/step-7",
        step: "7",
      },
      {
        title: "Place of Worship",
        url: "/formation/schedule-a/step-8",
        step: "8",
      },
      {
        title: "Established Congregation",
        url: "/formation/schedule-a/step-9",
        step: "9",
      },
      {
        title: "Religious Rites",
        url: "/formation/schedule-a/step-10",
        step: "10",
      },
      {
        title: "Religious Education",
        url: "/formation/schedule-a/step-11",
        step: "11",
      },
      {
        title: "Religious Leaders",
        url: "/formation/schedule-a/step-12",
        step: "12",
      },
      {
        title: "Schools for Religious Leaders",
        url: "/formation/schedule-a/step-13",
        step: "13",
      },
      {
        title: "Requirements for Religious Leaders",
        url: "/formation/schedule-a/step-14",
        step: "14",
      },
      {
        title: "Other Information",
        url: "/formation/schedule-a/step-15",
        step: "15",
      },
    ],
  },
  {
    title: "Schedule B. Schools, Colleges, and Universities",
    urlBase: "/formation/schedule-b",
    sidebarGroupContent: [
      {
        title: "Regularity of Educational Activities",
        url: "/formation/schedule-b/step-1",
        step: "1",
      },
      {
        title: "Primary Function",
        url: "/formation/schedule-b/step-2",
        step: "2",
      },
      {
        title: "Public School Classification",
        url: "/formation/schedule-b/step-3",
        step: "3",
      },
      {
        title: "Public School Desegregation",
        url: "/formation/schedule-b/step-4",
        step: "4",
      },
      {
        title: "Judicial Procedings",
        url: "/formation/schedule-b/step-5",
        step: "5",
      },
      {
        title: "Financial Aid Revocation and/or Suspension",
        url: "/formation/schedule-b/step-6",
        step: "6",
      },
      {
        title: "Policies",
        url: "/formation/schedule-b/step-7",
        step: "7",
      },
      {
        title: "Policies in Content",
        url: "/formation/schedule-b/step-8",
        step: "8",
      },
      {
        title: "Policy Awareness",
        url: "/formation/schedule-b/step-9",
        step: "9",
      },
      {
        title: "Selection Process",
        url: "/formation/schedule-b/step-10",
        step: "10",
      },
      {
        title: "Demographics",
        url: "/formation/schedule-b/step-11",
        step: "11",
      },
      {
        title: "Financial Aid by Demographics",
        url: "/formation/schedule-b/step-12",
        step: "12",
      },
      {
        title: "Incorporators, Founders, Board Members, and Donors",
        url: "/formation/schedule-b/step-13",
        step: "13",
      },
      {
        title: "Incorporators, Founders, Board Members, and Donors Objectives",
        url: "/formation/schedule-b/step-14",
        step: "14",
      },
      {
        title: "Records",
        url: "/formation/schedule-b/step-15",
        step: "15",
      },
    ],
  },
  {
    title: "Schedule C. Hospitals and Medical Research Organizations",
    urlBase: "/formation/schedule-c",
    sidebarGroupContent: [
      {
        title: "Medical Research Organization Status",
        url: "/formation/schedule-c/step-1",
        step: "1",
      },
      {
        title: "Cooperative Hospital Service Organization Exemption",
        url: "/formation/schedule-c/step-2",
        step: "2",
      },
      {
        title: "Doctor Staff Privilege Eligibility",
        url: "/formation/schedule-c/step-3",
        step: "3",
      },
      {
        title: "Medical Services",
        url: "/formation/schedule-c/step-4",
        step: "4",
      },
      {
        title: "Full-time Emergency Room",
        url: "/formation/schedule-c/step-5",
        step: "5",
      },
      {
        title: "Free or Below Cost Services",
        url: "/formation/schedule-c/step-6",
        step: "6",
      },
      {
        title: "Medical Training or Research Programs",
        url: "/formation/schedule-c/step-7",
        step: "7",
      },
      {
        title: "Community Education Programs",
        url: "/formation/schedule-c/step-8",
        step: "8",
      },
      {
        title: "Board of Directors",
        url: "/formation/schedule-c/step-9",
        step: "9",
      },
      {
        title: "Facility Requirements",
        url: "/formation/schedule-c/step-10",
        step: "10",
      },
    ],
  },
  {
    title: "Schedule D. Section 509(a)(3) Supporting Organizations",
    urlBase: "/formation/schedule-d",
    sidebarGroupContent: [
      {
        title: "Names, Addresses, and EINs of Supported Organizations",
        url: "/formation/schedule-d/step-1",
        step: "1",
      },
      {
        title: "Supported Organizations Public Charity Statuses",
        url: "/formation/schedule-d/step-2",
        step: "2",
      },
      {
        title: "Relationship with Supported Organizations",
        url: "/formation/schedule-d/step-3",
        step: "3",
      },
      {
        title: "Governing Board and Officers",
        url: "/formation/schedule-d/step-4",
        step: "4",
      },
      {
        title: "Disqualified Persons",
        url: "/formation/schedule-d/step-5",
        step: "5",
      },
      {
        title: "Disqualified Persons Influence",
        url: "/formation/schedule-d/step-6",
        step: "6",
      },
      {
        title: "Supported Organizations in Organizing Document",
        url: "/formation/schedule-d/step-7",
        step: "7",
      },
      {
        title: "Contributions",
        url: "/formation/schedule-d/step-8",
        step: "8",
      },
      {
        title: "Officers, Directors, or Trustees of Supported Organizations",
        url: "/formation/schedule-d/step-9",
        step: "9",
      },
      {
        title: "Supported Organizations Taxes",
        url: "/formation/schedule-d/step-10",
        step: "10",
      },
      {
        title: "Direction of Supported Organizations",
        url: "/formation/schedule-d/step-11",
        step: "11",
      },
      {
        title: "Exempt Purposes of Supported Organizations",
        url: "/formation/schedule-d/step-12",
        step: "12",
      },
      {
        title: "Distribution of Assets",
        url: "/formation/schedule-d/step-13",
        step: "13",
      },
    ],
  },
  {
    title: "Schedule E. Effective Date",
    urlBase: "/formation/schedule-e",
    sidebarGroupContent: [
      {
        title: "Reinstatement of Exemption",
        url: "/formation/schedule-e/step-1",
        step: "1",
      },
      {
        title: "Effective Date of Submission Date",
        url: "/formation/schedule-e/step-2",
        step: "2",
      },
    ],
  },
  {
    title: "Schedule F. Low-Income Housing",
    urlBase: "/formation/schedule-f",
    sidebarGroupContent: [
      {
        title: "Facilities",
        url: "/formation/schedule-f/step-1",
        step: "1",
      },
      {
        title: "Resident Qualifications",
        url: "/formation/schedule-f/step-2",
        step: "2",
      },
      {
        title: "Safe Harbor Requirements",
        url: "/formation/schedule-f/step-3",
        step: "3",
      },
      {
        title: "Affordability for Low-income Residents",
        url: "/formation/schedule-f/step-4",
        step: "4",
      },
      {
        title: "Affordability Restrictions",
        url: "/formation/schedule-f/step-5",
        step: "5",
      },
      {
        title: "Periodic Fees or Maintenance Charges",
        url: "/formation/schedule-f/step-6",
        step: "6",
      },
      {
        title: "Social Services",
        url: "/formation/schedule-f/step-7",
        step: "7",
      },
      {
        title: "Government Housing Programs",
        url: "/formation/schedule-f/step-8",
        step: "8",
      },
    ],
  },
  {
    title: "Schedule G. Successors to Other Organizations",
    urlBase: "/formation/schedule-g",
    sidebarGroupContent: [
      {
        title: "404",
        url: "/formation/schedule-g/step-1",
        step: "1",
      },
    ],
  },
  {
    title: "Schedule H.",
    urlBase: "/formation/schedule-h",
    sidebarGroupContent: [
      {
        title: "404",
        url: "/formation/schedule-h/step-1",
        step: "1",
      },
    ],
  },
];

export function FormationSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <>
      {!isMobile && (
        <Sidebar className="static h-full">
          <SidebarContent>
            {collapsibleTriggers.map((collapsibleTrigger) => (
              <Collapsible
                key={collapsibleTrigger.title}
                defaultOpen={pathname.startsWith(collapsibleTrigger.urlBase)}
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    className="justify-between text-left sm:text-sm"
                    asChild
                  >
                    <CollapsibleTrigger>
                      {collapsibleTrigger.title}
                      <ChevronDown className="ml-4 transition-transform group-data-[state=open]/collapsible:rotate-180 sm:text-sm" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {collapsibleTrigger.sidebarGroupContent.map((item) => (
                          <SidebarMenuItem key={item.step}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.url === pathname}
                              className="data-[active=true]:bg-sidebar-primary/80 dark:data-[active=true]:bg-sidebar-primary/40"
                            >
                              <Link
                                className="my-1"
                                href={{
                                  pathname: item.url,
                                }}
                              >
                                <div
                                  className={`w-[1.25rem] rounded-full ${item.url === pathname ? "text-primary-foreground" : "bg-sidebar-accent"} text-center`}
                                >
                                  {item.step}
                                </div>
                                <span
                                  className={`${item.url === pathname ? "text-primary-foreground" : "text-foreground"}`}
                                >
                                  {item.title}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
}
