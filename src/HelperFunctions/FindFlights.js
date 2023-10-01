

export const flightSearch = (from, to, passengers, bags) => {
  const head = document.querySelector("head");
  const script = document.createElement("script");

  script.setAttribute("src", "https://widgets.kiwi.com/scripts/widget-search-iframe.js");
  script.setAttribute("data-affilid", "felixtoftkiwiwidget" );
  script.setAttribute("data-from", from );
  script.setAttribute("data-to", to );
  script.setAttribute("data-passengers", passengers);
  script.setAttribute("data-results-only", "true");
  script.setAttribute("data-bags", bags);
  head.appendChild(script);
  head.removeChild(script);

}