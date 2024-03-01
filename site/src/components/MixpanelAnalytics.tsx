"use client"

import Script from "next/script";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import mixpanel from "mixpanel-browser";

import { usePathname } from 'next/navigation';

export default function MixpanelAnalytics() {

  useEffect(() => {

    mixpanel.init("4cdb598625c8c333948eade784752a5c", {
      // debug: true,
      // track_pageview: true,
      persistence: 'localStorage',
      api_host: "/mp",
    })

    // mixpanel.track_links("a", "click link", {
    //   "referrer": document.referrer
    // });

  }, [])

  const pathname = usePathname();

  useEffect(() => {
    mixpanel.track_pageview();
  }, [pathname]);

  return (
    <>
    </>
  )
}