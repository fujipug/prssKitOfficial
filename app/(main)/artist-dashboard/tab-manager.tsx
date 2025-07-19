'use client';
import Share from "./_dashboard-sections/share";
import PrssKit from "./_dashboard-sections/prss-kit";
import { useState } from "react";
import Assets from "./_dashboard-sections/assets";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TabManager({ tabTranslations, prssKitTranslations, shareTranslations, assetTranslations, editProfileModalTranslations }: { tabTranslations: any, prssKitTranslations: any, shareTranslations: any, assetTranslations: any, editProfileModalTranslations: any }) {
  const [selectedTab, setSelectedTab] = useState('share-tab');

  const handleTabSelect = (tab: string) => {
    if (selectedTab === tab) return;

    // add the tab-active class to the selected tab
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tabElement) => {
      if (tabElement.classList.contains('tab-active')) {
        tabElement.classList.remove('tab-active');
      }

      if (tabElement.id === tab) {
        tabElement.classList.add('tab-active');
      }
    });

    setSelectedTab(tab);
  }

  return (
    <div className="mx-4 my-4 sm:mx-12 sm:my-0 min-h-dvh">
      <div role="tablist" className="tabs tabs-xl tabs-border mb-8 font-bold">
        <a role="tab" id="share-tab" onClick={() => handleTabSelect('share-tab')} className="tab tab-active">{tabTranslations['share']}</a>
        <a role="tab" id="prsskit-tab" onClick={() => handleTabSelect('prsskit-tab')} className="tab">Prss Kit</a>
        <a role="tab" id="assets-tab" onClick={() => handleTabSelect('assets-tab')} className="tab">{tabTranslations['assets']}</a>
      </div>

      {selectedTab === 'share-tab' && <Share translations={shareTranslations} />}
      {selectedTab === 'prsskit-tab' && <PrssKit translations={prssKitTranslations} editProfileModalTranslations={editProfileModalTranslations} />}
      {selectedTab === 'assets-tab' && <Assets translations={assetTranslations} />}
    </div>
  );
}