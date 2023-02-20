import puppeteer from 'puppeteer';
// import fs  from 'fs';

let reviews = [];
// let coffee_shop_name = "Caffe Del Doge";




async function getReviews(url, coffee_shop_name) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // CHECK REVIEW METHOD
  async function checkReview(element) {
    if (element.innerHTML.includes("span")) {
      console.log("THERE IS MORE TO THIS");
    }

    return element.textContent;
  }

  console.log('HELLO THIS IS ME', url);

  url = "https://www.tripadvisor.com/Restaurant_Review-g187870-d3157860-Reviews-or30-Torrefazione_Cannaregio-Venice_Veneto.html";

  // url = "https://www.tripadvisor.com/Restaurant_Review-g187870-d3157860-Reviews-or45-Torrefazione_Cannaregio-Venice_Veneto.html";

  // url = "https://www.tripadvisor.com/Restaurant_Review-g187870-d3157860-Reviews-or60-Torrefazione_Cannaregio-Venice_Veneto.html";

  // url = "https://www.tripadvisor.com/Restaurant_Review-g187870-d1088064-Reviews-Caffe_Del_Doge-Venice_Veneto.html";

  // url = "https://www.tripadvisor.com/Restaurant_Review-g187870-d1088064-Reviews-Caffe_Del_Doge-Venice_Veneto.html";

  // url = "https://www.tripadvisor.com/Restaurant_Review-g187870-d1088064-Reviews-or15-Caffe_Del_Doge-Venice_Veneto.html";

  // url = process.argv[2];
  // url = url_link;

  try {
    // Go to the page and setup
    await page.goto(url, { waitUntil: 'load' });
    await page.setViewport({ width: 1080, height: 1024 });


    let review_container = '.review-container .noQuotes';
    let review_container_2 = '.review-container .partial_entry';

    const elems = await page.$$(review_container);
    const container_reviews = await page.$$(review_container_2);

    // console.log(await container_reviews[0].evaluate((async el => {
    //   if (el.innerHTML.includes("span")) {
    //     el.querySelector(".taLnk.ulBlueLinks").click();
    //     // await new Promise(function (resolve) {
    //     //   setTimeout(resolve, 1000)
    //     // });
    //     function delay(time) {
    //       return new Promise(function (resolve) {
    //         setTimeout(resolve, time)
    //       });
    //     }
    //     await delay(1000);
    //     return page.$(review_container_2).then(async el => el.innerHTML)
    //   }
    // })));

    (await page.$$(".partial_entry .taLnk.ulBlueLinks")).forEach(async btn => {
      // console.log(await btn.evaluate(el => el.click()))
      // await btn.evaluate(el => el.click());
      await btn.evaluate(el => el.click())
      await new Promise(function(resolve) { 
        setTimeout(resolve, 4000);
      });
    })

    await elems.forEach(async (elem, index) => {
      
      let title = await elem.evaluate((el) => el.textContent);
      let text = await container_reviews[index].evaluate(
        (el) => {
          // console.log(el.textContent);
          // if(el.innerHTML.includes("span")) {
          //   console.log("something happening")
          //   el.querySelector("span").click()
          // } else {
          //   console.log("NOTHING");
          // }
          return el.textContent;
        }
      );
      await reviews.push({
        coffee_shop_name: coffee_shop_name,
        title: title,
        text: text
      });
    });

    await browser.close();
    await console.log(reviews);

    // return reviews;
  } catch (err) {
    console.log(err.message);
  }
}



// async function writeFile(reviews) {
//     console.log(reviews);

//     let existing_data = fs.readFileSync("reviews.json", {encoding: 'utf-8'});
//     if(existing_data.length > 1) {
//         let existing_json = JSON.parse(existing_data);
//         existing_json.push(reviews);

//         let new_json = JSON.stringify(existing_json);

//         await fs.writeFileSync("reviews.json", new_json, "utf-8");
//     } else {
//         let json_reviews = await JSON.stringify(reviews);
//         await fs.writeFileSync("reviews.json", json_reviews, "utf-8");
//     }

// }

getReviews("", "Promise Coffee");