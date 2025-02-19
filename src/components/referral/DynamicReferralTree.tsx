// clientReferralTree.tsx (Create a separate client-side wrapper)

"use client";
import dynamic from "next/dynamic";

const DynamicReferralTree = dynamic(
  () => import("@/components/referral/ReferralTree"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export default DynamicReferralTree;
