import Resort from "../models/Resort.js";

const resorts = [
  ["The Ritz-Carlton, Maldives","Maldives","https://travelsort.com/wp-content/uploads/2021/02/Ritz-Carlton-Maldives-Fari-Islands-Opens-July-2021.jpeg","A luxurious resort with overwater villas and crystal-clear lagoons in the Maldives.",1500,1350,1200,5500,112000],
  ["Bora Bora Pearl Beach Resort & Spa","Bora Bora","https://commons.wikimedia.org/wiki/Special:FilePath/Borapearl.jpg?width=1200","A tropical paradise on a private island in Bora Bora, featuring luxury overwater bungalows.",1500,1350,1200,5500,112000],
  ["Fireside Resort, Jackson Hole","Wyoming, USA","https://wallpaperaccess.com/full/3264395.jpg","A rustic luxury retreat located in Jackson Hole, Wyoming, with views of the Teton Mountains.",1200,1080,960,4400,88000],
  ["The Four Seasons Resort, Bali","Bali, Indonesia","https://www.thebaliparadise.com/wp-content/uploads/2019/01/The-Four-Seasons-Resort-Jimbaran-Hotel-Bali-viaje_tico-800x883.jpg","An elegant resort nestled in Bali's lush surroundings, offering tranquility and luxury.",1100,990,880,4100,85000],
  ["Anantara Veli Maldives Resort","Maldives","https://wallup.net/wp-content/uploads/2019/09/632909-anantara-veli-resort-and-spa-maldives-sunset-pier.jpg","A tropical getaway in the Maldives with private overwater villas and exceptional service.",1300,1170,1040,4800,96000],
  ["Lake Louise Resort, Canada","Alberta, Canada","https://www.luxurytravelmagazine.com/files/610/1/121/Fairmont_Chateau_Lake_Louise_1_big_bu.jpg","A stunning resort set amidst the Canadian Rockies with views of the famous Lake Louise.",1400,1260,1120,5000,100000],
  ["Sandals Royal Barbados","Barbados","https://d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/1011233/1011233-1-hotel_carousel_large.jpg?version=2","A luxury beachfront resort in Barbados offering relaxing tropical experiences.",1400,1260,1120,5000,100000],
  ["Banyan Tree Samui","Thailand","https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/78/cf/0e/banyan-tree-samui.jpg?w=700&h=-1&s=1","A luxury island resort in Thailand surrounded by tropical landscapes and beautiful beaches.",1400,1260,1120,5000,100000],
  ["Lizard Island Resort","Queensland, Australia","https://media.leisurecom.com/property/medium-image-2018-04-26-11-29-28.jpg","A secluded island resort in Queensland surrounded by Australia's Great Barrier Reef.",1400,1260,1120,5000,100000]
];

export async function seedResorts() {
  for (const [name, location, imageUrl, description, priceUSD, priceEUR, priceGBP, priceAED, priceINR] of resorts) {
    await Resort.updateOne(
      { name },
      { $set: { name, location, imageUrl, description, priceUSD, priceEUR, priceGBP, priceAED, priceINR } },
      { upsert: true }
    );
  }

  console.log("Default resorts synced");
}
