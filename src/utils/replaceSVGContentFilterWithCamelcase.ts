/* eslint-disable import/prefer-default-export */
// Code copied from star-history/star-history under MIT license

export const replaceSVGContentFilterWithCamelcase = (
  svgContent: string,
): string =>
  svgContent.replace(
    /<filter (.*?)>(.*?)<\/filter>/g,
    `<filter xmlns="http://www.w3.org/2000/svg" id="xkcdify" filterUnits="userSpaceOnUse" x="-5" y="-5" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.05" result="noise"/><feDisplacementMap scale="5" xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="noise"/></filter>`,
  );
