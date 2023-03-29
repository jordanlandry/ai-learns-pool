// My math and sizing is based on the following links:

// All of these are based in cm
export const actualSizing = {
  // https://canadianhomeleisure.ca/wp-content/uploads/2020/10/8-foot-regulation-table-dimensions.png
  tableWidth: 112,
  tableHeight: 224,
  borderThickness: 150 - 112,

  // https://global-uploads.webflow.com/5b44edefca321a1e2d0c2aa6/612cd6c788fbe35f9732895f_Dimensions-Sports-Billiards-Billiards-Balls-Dimensions.svg
  ballRadius: 5.715 / 2,

  // https://www.designerbilliards.co.uk/news/news/American-Pool-vs-English-Pool#:~:text=ball%20should%20drop.-,American%20pocket%20openings%20should%20be%20between%204.5%20and%204.625%20inches,%2C%20between%2012%20%26%2014%20degrees.
  // The above site gives in inches, so this is convreted to cm
  cornerPocketRadius: 11.43 / 2,
  sidePocketRadius: 12.7 / 2,

  // https://billiards.colostate.edu/faq/physics/physical-properties/
  // Given in ounces, so this is converted to grams
  ballMass: 170,
  cueMass: 540,
};

// I don't want to use such large sizes, so I will scale them down,
// while maintaining the aspect ratio
export const properties = {
  scale: 0.1,
};

export const sizes = {
  tableWidth: scale(actualSizing.tableWidth),
  tableHeight: scale(actualSizing.tableHeight),
  borderThickness: scale(actualSizing.borderThickness),
  ballRadius: scale(actualSizing.ballRadius),
  cornerPocketRadius: scale(actualSizing.cornerPocketRadius),
  sidePocketRadius: scale(actualSizing.sidePocketRadius),
  ballMass: scale(actualSizing.ballMass),
  cueMass: scale(actualSizing.cueMass),
};

export function scale(value: number) {
  return value * properties.scale;
}
