export function openOrderPanel() {
  window.dispatchEvent(new Event("chez-roger:open-order"));
}
