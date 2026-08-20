"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Kt2ProductStage } from "@/components/kt2-product-stage";
import { WyrdLanding } from "@/components/wyrd-landing";

import styles from "./storefront-experience.module.css";

const landingDurationMs = 10_000;
const coverDurationMs = 500;
const revealDurationMs = 1_200;

type TransitionPhase = "idle" | "covering" | "revealing";

export function StorefrontExperience() {
  const [isProductStageVisible, setIsProductStageVisible] = useState(false);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");
  const transitionStartedRef = useRef(false);
  const transitionTimersRef = useRef<number[]>([]);

  const showProductStage = useCallback(() => {
    if (transitionStartedRef.current) {
      return;
    }

    transitionStartedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsProductStageVisible(true);
      return;
    }

    setTransitionPhase("covering");

    const coverTimer = window.setTimeout(() => {
      setIsProductStageVisible(true);
      setTransitionPhase("revealing");

      const revealTimer = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, revealDurationMs);

      transitionTimersRef.current.push(revealTimer);
    }, coverDurationMs);

    transitionTimersRef.current.push(coverTimer);
  }, []);

  useEffect(() => {
    const transitionTimers = transitionTimersRef.current;
    const timer = window.setTimeout(showProductStage, landingDurationMs);

    return () => {
      window.clearTimeout(timer);
      transitionTimers.forEach(window.clearTimeout);
    };
  }, [showProductStage]);

  return (
    <div className={styles.experience}>
      {isProductStageVisible ? (
        <Kt2ProductStage />
      ) : (
        <WyrdLanding onEnter={showProductStage} />
      )}

      <div
        className={`${styles.blackout} ${styles[transitionPhase]}`}
        aria-hidden="true"
      />
    </div>
  );
}
