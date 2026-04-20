import { useMemo, useState } from "react";

import { COMPONENT_CATALOG_SECTIONS } from "../constants/componentCatalog";

type ConfirmationMap = Record<string, boolean>;

const buildInitialConfirmationMap = (): ConfirmationMap => {
  return COMPONENT_CATALOG_SECTIONS.flatMap((section) => section.items).reduce<ConfirmationMap>(
    (accumulator, item) => {
      accumulator[item.id] = false;
      return accumulator;
    },
    {},
  );
};

export const useComponentCatalogReview = () => {
  const [confirmationMap, setConfirmationMap] = useState<ConfirmationMap>(
    buildInitialConfirmationMap,
  );

  const allItems = useMemo(() => {
    return COMPONENT_CATALOG_SECTIONS.flatMap((section) => section.items);
  }, []);

  const confirmedCount = useMemo(() => {
    return allItems.filter((item) => confirmationMap[item.id]).length;
  }, [allItems, confirmationMap]);

  const highConfidenceCount = useMemo(() => {
    return allItems.filter((item) => item.confidence === "high").length;
  }, [allItems]);

  const confirmedHighConfidenceCount = useMemo(() => {
    return allItems.filter((item) => item.confidence === "high" && confirmationMap[item.id]).length;
  }, [allItems, confirmationMap]);

  const toggleItem = (itemId: string) => {
    setConfirmationMap((previous) => ({
      ...previous,
      [itemId]: !previous[itemId],
    }));
  };

  const markHighConfidence = () => {
    setConfirmationMap((previous) => {
      const next = { ...previous };

      allItems.forEach((item) => {
        if (item.confidence === "high") {
          next[item.id] = true;
        }
      });

      return next;
    });
  };

  const resetConfirmation = () => {
    setConfirmationMap(buildInitialConfirmationMap());
  };

  return {
    sections: COMPONENT_CATALOG_SECTIONS,
    confirmationMap,
    confirmedCount,
    confirmedHighConfidenceCount,
    highConfidenceCount,
    totalCount: allItems.length,
    toggleItem,
    markHighConfidence,
    resetConfirmation,
  };
};
