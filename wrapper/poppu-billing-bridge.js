/* poppu-billing-bridge.js — DIRECT Google Play Billing (NO RevenueCat)
 * ---------------------------------------------------------------------------
 * Implements the exact contract the game already calls (see MONETIZATION.md §5):
 *     window.PoppuBilling.buy('poppu_full_unlock', cb)   // cb(true) on a verified purchase, cb(false) on cancel/fail
 *     window.PoppuBilling.restore(cb)                     // cb(true) if the unlock is already owned
 * The game flips SAVE.purchased=true ONLY when cb(true). No third party, no revenue cut.
 *
 * Backed by cordova-plugin-purchase (Fovea) v13 — talks straight to Google Play
 * Billing (and Apple StoreKit if you add iOS later, same product id). Play returns a
 * signed/acknowledged purchase, so no billing server is required for a one-time unlock.
 *
 * SETUP (once, in the wrapper — see WRAPPER_SETUP.md §3-4):
 *   cd wrapper && npm i cordova-plugin-purchase
 *   npx cap sync android
 *   Load this file before </body> in www/index.html:  <script src="poppu-billing-bridge.js"></script>
 *   Create the in-app product `poppu_full_unlock` (non-consumable, $1.99) in Play Console.
 */
(function () {
  var CdvPurchase = window.CdvPurchase;
  if (!CdvPurchase) { console.warn('[PoppuBilling] cordova-plugin-purchase not loaded'); return; }

  var store      = CdvPurchase.store;
  var ProductType = CdvPurchase.ProductType;
  var Platform   = CdvPurchase.Platform;
  var LogLevel   = CdvPurchase.LogLevel;

  var PRODUCT_ID = 'poppu_full_unlock';
  var PLATFORM   = Platform.GOOGLE_PLAY;        // iOS later: Platform.APPLE_APPSTORE (same id)

  var pendingBuy = null;                         // callback awaiting the current purchase result

  function owned() {
    var p = store.get(PRODUCT_ID, PLATFORM);
    return !!(p && p.owned);
  }
  function resolveBuy(ok) {
    if (!pendingBuy) return;
    var cb = pendingBuy; pendingBuy = null;
    try { cb(!!ok); } catch (e) {}
  }

  store.verbosity = LogLevel.WARNING;
  store.register([{ id: PRODUCT_ID, type: ProductType.NON_CONSUMABLE, platform: PLATFORM }]);

  store.when()
    // Play already hands back a signed + auto-acknowledged purchase for a non-consumable,
    // so we finish() directly (no billing server). For stronger anti-piracy you can add
    // local signature verification with the app's Play license key, or Fovea's validator.
    .approved(function (tx) { tx.finish(); })
    .finished(function () { resolveBuy(true); });

  store.error(function () { resolveBuy(false); });

  store.initialize([PLATFORM]);

  window.PoppuBilling = {
    buy: function (sku, cb) {
      if (owned()) { cb(true); return; }                  // already owns the unlock
      var p = store.get(PRODUCT_ID, PLATFORM);
      var offer = p && p.getOffer();
      if (!offer) { cb(false); return; }                  // product not loaded / unavailable
      pendingBuy = cb;
      store.order(offer).catch(function () { resolveBuy(false); });   // user cancel = error path = cb(false)
    },
    restore: function (cb) {
      store.restorePurchases()
        .then(function () { cb(owned()); })
        .catch(function () { cb(false); });
    }
  };
})();
