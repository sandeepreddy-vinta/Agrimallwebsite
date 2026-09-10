import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Makes `/privacy#your-rights` actually land on section 9.
 *
 * This matters beyond tidiness: the app's Data deletion instructions URL in the
 * Meta app dashboard points at /privacy#your-rights, and a reviewer following it
 * would otherwise land at the top of a 7,000px policy and have to hunt.
 *
 * THREE SEPARATE BUGS GOT IN THE WAY. Do not simplify this without re-testing
 * against the deployed site — two of them are invisible locally.
 *
 * 1. On a client-rendered app the browser attempts its fragment jump while the
 *    page is still an empty <div id="root">, finds nothing, and never retries.
 *
 * 2. `index.css` sets `html { scroll-behavior: smooth }`, which overrides
 *    `scrollIntoView({ behavior: "auto" })`. The jump then animates across
 *    thousands of pixels and is cancelled by the next React commit — measured
 *    at 14px of a 5,497px scroll. `behavior: "instant"` is what bypasses it.
 *
 * 3. A single attempt is not enough over a real network. Until the web fonts
 *    and images land, the document is far shorter than its final height, so the
 *    browser clamps the scroll to the current maximum — near zero — and the
 *    page then grows underneath it. This passed on localhost, where everything
 *    loads instantly, and failed on agrimall.io. Hence retrying until the
 *    section is actually at the top, plus the fonts.ready and load signals.
 *
 * It also scrolls to the top on an ordinary route change, which react-router
 * does not do by itself.
 */

const INSTANT = "instant" as ScrollBehavior;

/** How close to the viewport top counts as having arrived. */
const LANDED_PX = 200;

/** Spread across the window in which fonts, images and animations settle. */
const RETRY_DELAYS_MS = [0, 100, 300, 600, 1000, 1600, 2400];

export const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: INSTANT });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let done = false;
    const timers: number[] = [];

    // Never yank the page out from under someone who has started reading.
    const stop = () => {
      done = true;
    };

    const attempt = () => {
      if (done) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: INSTANT, block: "start" });
      // Only stop once we actually got there — an early attempt can be clamped
      // short while the page is still growing.
      if (Math.abs(el.getBoundingClientRect().top) < LANDED_PX) done = true;
    };

    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });
    window.addEventListener("load", attempt);
    document.fonts?.ready.then(attempt).catch(() => {});

    for (const delay of RETRY_DELAYS_MS) {
      timers.push(window.setTimeout(attempt, delay));
    }

    return () => {
      done = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("load", attempt);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname, hash]);

  return null;
};
